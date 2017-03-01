import { makeArray } from '../src/selectors';

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
});
