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
    it('should return {} by default', () => {
      reducers.retrievedConditions().should.eql({});
    });
    it('should handle the recordConditions action', () => {
      const newConditions = { bar: 'bar' };
      reducers.
        retrievedConditions({ foo: 'foo' }, recordConditions(newConditions)).
        should.equal(newConditions);
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
    it('should return true while having a turnPage action', () => {
      reducers.retrieving(false, turnPage()).should.equal(true);
    });
  });
});
