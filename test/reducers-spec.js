import reducers from '../src/reducers';
import {
  recordConditions,
  retrieveSuccess,
  asyncProcessStart,
  asyncProcessEnd,
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
  describe('.asyncProcessing(state, action)', () => {
    it('should return false by default', () => {
      reducers.asyncProcessing().should.equal(false);
    });
    it('should return false while having a asyncProcessEnd action', () => {
      reducers.asyncProcessing(true, asyncProcessEnd()).should.equal(false);
    });
    it('should return true while having a asyncProcessStart action', () => {
      reducers.asyncProcessing(false, asyncProcessStart()).should.equal(true);
    });
  });
});
