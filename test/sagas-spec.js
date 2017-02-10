import { takeLatest, put, call, select } from 'redux-saga/effects';

import watchRetrievalActions, {
  defaultOptions,
  retrieve,
  handleRetrieve,
  handleReRetrieve,
  handleTurnPage,
} from '../src/sagas';

import {
  TYPES,
  asyncProcessStart,
  asyncProcessEnd,
  retrieve as retrieveAction,
  reRetrieve,
  turnPage,
  retrieveSuccess,
  recordConditions,
  retrieveError,
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
        takeLatest(TYPES.RE_RETRIEVE, handleReRetrieve, mergedOptions),
        takeLatest(TYPES.TURN_PAGE, handleTurnPage, mergedOptions),
      ]);
    });
    it('should use default options while options argument not given', () => {
      watchRetrievalActions().next().value[0].should.eql(
        takeLatest(TYPES.RETRIEVE, handleRetrieve, defaultOptions),
      );
    });
  });
  describe('.retrieve(options, conditions)', () => {
    const apiClient = { find: () => {} };
    const conditions = { foo: 'bar' };
    let gen;

    before(() => {
      gen = retrieve({ apiClient }, conditions);
    });

    it('should put a asyncProcessStart action first', () => {
      gen.next().value.should.eql(put(asyncProcessStart()));
    });
    it('should call the apiClient to do the retrieving', () => {
      gen.next().value.should.eql(call([apiClient, apiClient.find], conditions));
    });
    it('should put the retrieveSuccess action while api return success', () => {
      const retrievedResult = { bar: 'baz' };

      gen.next(retrievedResult).value.should.eql(put(retrieveSuccess(retrievedResult)));
    });
    it('should put a recordConditions action then to record the retrieval conditions', () => {
      gen.next().value.should.eql(put(recordConditions(conditions)));
    });
    it('should put a asyncProcessEnd action at last', () => {
      gen.next().value.should.eql(put(asyncProcessEnd()));
    });
    it('should put a retrieveError action while having a failed api call', () => {
      const generator = retrieve({ apiClient }, conditions);
      const e = new Error('an error from apiClient.find');

      // put asyncProcessStart
      generator.next();
      // call apiClient.find
      generator.next();
      // get an error from apiClient.find
      generator.throw(e).value.should.eql(put(retrieveError(e)));
      // and then still get to put a asyncProcessEnd
      generator.next().value.should.eql(put(asyncProcessEnd()));
    });
  });
  describe('.handleRetrieve(options, action)', () => {
    describe('handle simple retrieve action', () => {
      it('should call the .retrieve(options, conditions)', () => {
        const conditions = { foo: 'bar' };
        const gen = handleRetrieve(defaultOptions, retrieveAction(conditions));

        gen.next().value.should.eql(
          call(retrieve, defaultOptions, {
            ...conditions,
            pageNumber: 1,
          })
        );
      });
    });
    describe('handle retrieve action with meta info', () => {
      const conditions = { foo: 'bar' };
      const retrievedConditions = { foo: 'foo' };

      it('should get the retrievedConditions first', () => {
        const gen = handleRetrieve(defaultOptions, retrieveAction(conditions, { attach: true }));

        gen.next().value.should.eql(select(defaultOptions.retrievedConditionsSelector));
      });

      ['attach', 'update', 'drop'].forEach((op) => {
        it(`should get .retrieve() called right with meta.${op}`, () => {
          const gen = handleRetrieve(defaultOptions, retrieveAction(conditions, { [op]: true }));

          gen.next();
          gen.next(retrievedConditions).value.should.eql(call(
            retrieve,
            defaultOptions,
            {
              ...helper[op](retrievedConditions, conditions),
              pageNumber: 1
            }
          ));
        });
      });

      it('should throw error if given unavailable meta options', () => {
        function callHandleRetrieveWithUnavailableMeta() {
          const gen = handleRetrieve(defaultOptions, retrieveAction(conditions, { unavailableProp: true }));

          gen.next();
          gen.next(retrievedConditions);
        }
        expect(callHandleRetrieveWithUnavailableMeta).to.throw();
      });
    });
  });
  describe('.handleReRetrieve(options, action)', () => {
    const conditions = { foo: 'bar' };
    const gen = handleReRetrieve(defaultOptions, reRetrieve());

    it('should get the retrievedConditions first', () => {
      gen.next().value.should.eql(select(defaultOptions.retrievedConditionsSelector));
    });
    it('should call .retrieve() then', () => {
      gen.next(conditions).value.should.eql(call(
        retrieve,
        defaultOptions,
        conditions
      ))
    });
  });
  describe('.handleTurnPage(options, action)', () => {
    const conditions = { foo: 'bar' };
    const gen = handleTurnPage(defaultOptions, turnPage(3));

    it('should get the retrievedConditions first', () => {
      gen.next().value.should.eql(select(defaultOptions.retrievedConditionsSelector));
    });
    it('should call .retrieve() then', () => {
      gen.next(conditions).value.should.eql(call(
        retrieve,
        defaultOptions,
        {
          foo: 'bar',
          pageNumber: 3,
        }
      ))
    });
  });
});
