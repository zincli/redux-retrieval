import { takeLatest, put, call, select } from 'redux-saga/effects';

import watchRetrievalActions, {
  defaultOptions,
  handleRetrieve,
  handleReRetrieve,
  handleTurnPage,
  handleSwitchPageSize,
  handleSwitchTab,
} from '../src/sagas';

import {
  TYPES,
  retrieve,
  reRetrieve,
  turnPage,
  retrieveSuccess,
  recordConditions,
  retrieveError,
  switchPageSize,
  switchTab,
} from '../src/actions';

import * as helper from '../src/conditions-helper';

describe('sagas', () => {
  describe('.defaultOptions.retrievedConditionsSelector(state)', () => {
    it('should return the state.retrievedConditions', () => {
      const retrievedConditions = { foo: 'bar' };
      defaultOptions.
        retrievedConditionsSelector({ retrievedConditions }).
        should.equal(retrievedConditions);
    });
  });
  describe('.watchRetrievalActions(options)', () => {
    it('should register the right handler to all actions need to be handled', () => {
      const options = { foo: 'bar' };
      const mergedOptions = { ...defaultOptions, ...options };

      watchRetrievalActions(options).next().value.should.eql([
        takeLatest(TYPES.RETRIEVE, handleRetrieve, mergedOptions),
        takeLatest(TYPES.RE_RETRIEVE, handleReRetrieve),
        takeLatest(TYPES.TURN_PAGE, handleTurnPage),
        takeLatest(TYPES.SWITCH_PAGE_SIZE, handleSwitchPageSize),
        takeLatest(TYPES.SWITCH_TAB, handleSwitchTab),
      ]);
    });
    it('should use default options while options argument not given', () => {
      watchRetrievalActions().next().value[0].should.eql(
        takeLatest(TYPES.RETRIEVE, handleRetrieve, defaultOptions),
      );
    });
  });
  describe('.handleRetrieve(options, action)', () => {
    const service = { retrieve: () => {} };
    const options = { ...defaultOptions, service };
    const conditions = { foo: 'bar' };
    const meta = { bar: 'baz' };
    const retrievedConditions = {};
    const calculatedConditions = {
      explicit: { foo: 'foo' },
      implicit: { bar: 'bar' },
      page: undefined,
    };
    let gen;

    before(() => {
      gen = handleRetrieve(options, retrieve(conditions, meta));
    });

    describe('normal processing', () => {
      it('should select the retrievedConditions from state', () => {
        gen.next().value.should.eql(select(defaultOptions.retrievedConditionsSelector));
      });
      it('should call the calculateConditions() to get the explicit and implicit conditions', () => {
        gen.next(retrievedConditions).value.should.eql(
          call(helper.calculateConditions, meta, conditions, retrievedConditions)
        );
      });
      it('should call the service.retrieve to do the retrieving', () => {
        gen.next(calculatedConditions).value.should.eql(
          call([service, service.retrieve], {
            foo: 'foo',
            bar: 'bar',
          }, {
            page: undefined
          })
        );
      });
      it('should put the retrieveSuccess action while api return success', () => {
        const retrievedResult = { bar: 'baz' };

        gen.next(retrievedResult).value.should.eql(put(retrieveSuccess(retrievedResult)));
      });
      it('should put a recordConditions action then to record the retrieval conditions', () => {
        gen.next().value.should.eql(put(recordConditions(calculatedConditions)));
      });
    });
    describe('error handling', () => {
      it('should put a retrieveError action while having a failed api call', () => {
        gen = handleRetrieve(options, retrieve(conditions, meta));
        const e = new Error('an error from service.retrieve()');

        // select the retrievedConditions
        gen.next();
        // call the calculateConditions()
        gen.next(retrievedConditions);
        // call the service.retrieve()
        gen.next(calculatedConditions);
        // get an error from last call
        gen.throw(e).value.should.eql(put(retrieveError(e)));
      });
    });
  });
  describe('.handleReRetrieve(options, action)', () => {
    it('should put the retrieve action with specific meta options', () => {
      const gen = handleReRetrieve(reRetrieve());
      gen.next().value.should.eql(put(retrieve({}, { implicitly: true, keepExplicit: true })));
    });
  });
  describe('.handleTurnPage(action)', () => {
    it('should put the retrieve action with specific meta options', () => {
      const gen = handleTurnPage(turnPage(3));
      gen.next().value.should.eql(put(retrieve({}, { implicitly: true, keepExplicit: true, page: 3 })));
    });
  });
  describe('.handleSwitchPageSize(action)', () => {
    it('should put the retrieve action with specific meta options', () => {
      const gen = handleSwitchPageSize(switchPageSize(10));
      gen.next().value.should.eql(put(retrieve({ pageSize: 10 }, { implicitly: true, keepExplicit: true, page: 1 })));
    });
    it('should put the retrieve action with specific meta.name', () => {
      const gen = handleSwitchPageSize(switchPageSize(10, { name: 'customPageSize' }));
      gen.next().value.should.eql(put(retrieve({ customPageSize: 10 }, { implicitly: true, keepExplicit: true, page: 1 })));
    });
  });
  describe('.handleSwitchTab(action)', () => {
    it('should put the retrieve action with specific meta options', () => {
      const gen = handleSwitchTab(switchTab('foo'));
      gen.next().value.should.eql(put(retrieve({ tab: 'foo' }, { implicitly: true, page: 1 })));
    });
    it('should put the retrieve action with specific meta.name', () => {
      const gen = handleSwitchTab(switchTab('foo', { name: 'customTab' }));
      gen.next().value.should.eql(put(retrieve({ customTab: 'foo' }, { implicitly: true, page: 1 })));
    });
  });
});
