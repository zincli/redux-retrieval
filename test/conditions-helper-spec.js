import { attach, update, drop } from '../src/conditions-helper';

describe('conditions-helper', () => {
  describe('.attach(src, target)', () => {
    it('should attach the target to src', () => {
      const src = {
        foo: 'foo',
        bar: ['bar'],
        baz: 'baz',
      };
      const target = {
        foo: 'bar',
        bar: 'baz',
        foobar: 'foobar',
      };

      attach(src, target).should.eql({
        foo: ['foo', 'bar'],
        bar: ['bar', 'baz'],
        baz: 'baz',
        foobar: 'foobar',
      });
    });
  });
  describe('.update(src, target)', () => {
    it('should update or insert conditions', () => {
      const src = {
        foo: 'foo',
        bar: ['bar'],
      };
      const target = {
        foo: 'bar',
        bar: 'baz',
        baz: 'baz',
      };

      update(src, target).should.eql({
        foo: 'bar',
        bar: 'baz',
        baz: 'baz',
      });
    });
  });
  describe('.drop(src, target)', () => {
    it('should drop every target\'s property matched in src', () => {
      const src = {
        foo: 'foo',
        bar: ['bar', 'baz'],
        baz: ['bar'],
      };
      const target = {
        foo: 'foo',
        bar: 'baz',
        baz: 'baz',
        foobar: 'foobar',
      };

      drop(src, target).should.eql({
        bar: ['bar'],
        baz: ['bar'],
      });
    });
  });
});
