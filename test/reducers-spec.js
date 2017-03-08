import reducers from '../src/reducers';
import {
  recordConditions,
  retrieve,
  turnPage,
  retrieveSuccess,
  retrieveError,
} from '../src/actions';

describe('reducers', () => {
  describe('.retrievedConditions(state, action)', () => {
    it('should return { explicit: {}, implicit: {}, page: undefined } by default', () => {
      reducers.retrievedConditions(undefined, recordConditions()).should.eql({
        explicit: {},
        implicit: {},
        page: undefined,
      });
    });
    it('should handle the recordConditions action', () => {
      const newConditions = {
        explicit: { bar: 'bar' },
        implicit: { foo: 'foo' },
        page: 1
      };
      reducers.
        retrievedConditions({ foo: 'foo' }, recordConditions(newConditions)).
        should.eql(newConditions);
    });
  });
  describe('.retrievedResult(state, action)', () => {
    it('should return {} by default', () => {
      reducers.retrievedResult().should.eql({});
    });
    it('should handle the retrieveSuccess action', () => {
      const retrievedResult = { bar: 'bar' };

      reducers.
        retrievedResult({ foo: 'foo' }, retrieveSuccess(retrievedResult)).
        should.equal(retrievedResult);
    });
    it('should return {} while given retrieveSuccess(undefined)', () => {
      reducers.
        retrievedResult({ foo: 'foo' }, retrieveSuccess()).
        should.eql({});
    });
  });
  describe('.retrieving(state, action)', () => {
    it('should return false by default', () => {
      reducers.retrieving().should.equal(false);
    });
    it('should return false while having a retrieveSuccess action', () => {
      reducers.retrieving(true, retrieveSuccess()).should.equal(false);
    });
    it('should return false while having a retrieveError action', () => {
      reducers.retrieving(true, retrieveError()).should.equal(false);
    });
    it('should return true while having a retrieve action', () => {
      reducers.retrieving(false, retrieve()).should.equal(true);
    });
  });
});
