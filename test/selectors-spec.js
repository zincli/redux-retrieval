import { makeArray, conditions, page } from '../src/selectors';

describe('selectors', () => {
  describe('.makeArray(conditions)', () => {
    it('one name one value', () => {
      makeArray({
        foo: 'foo',
        bar: 'bar',
      }).should.eql([
        { name: 'foo', value: 'foo' },
        { name: 'bar', value: 'bar' },
      ]);
    });
    it('one name many values', () => {
      makeArray({
        foo: 'foo',
        bar: ['bar', 'baz'],
      }).should.eql([
        { name: 'foo', value: 'foo' },
        { name: 'bar', value: 'bar' },
        { name: 'bar', value: 'baz' },
      ]);
    });
    it('conditions are required', () => {
      expect(makeArray).to.throw();
    });
  });

  describe('.conditions(state)', () => {
    it('should return the state.retrievedConditions.explicit proccessed by makeArray', () => {
      const state = { retrievedConditions: { explicit: {} }};
      conditions(state).should.eql(makeArray(state.retrievedConditions.explicit));
    });
  });
  describe('.page(state)', () => {
    it('should return the state.retrievedConditions.page', () => {
      const state = { retrievedConditions: { page: 1 }};
      page(state).should.eql(state.retrievedConditions.page);
    });
  });
});
