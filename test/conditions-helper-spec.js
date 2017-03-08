import { calculateConditions, attach, update, drop } from '../src/conditions-helper';

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
  describe('.calculateConditions(options, payload, retrievedConditions)', () => {
    const retrievedConditions = {
      implicit: { bar: 'bar', baz: 'baz' },
      explicit: { alpha: 'a', beta: 'b' },
      page: 3,
    }

    describe('.calculateConditions({ implicitly: true }, ...)', () => {
      const result = calculateConditions(
        { implicitly: true },
        { foo: 'foo' },
        retrievedConditions
      );

      it('should merge the payload and retrievedConditions.implicit', () => {
        result.implicit.should.eql({ bar: 'bar', baz: 'baz', foo: 'foo' });
      });
      it('should drop all retrievedConditions.explicit', () => {
        result.should.have.property('explicit', undefined);
      });
      it('should keep retrievedConditions.page', () => {
        result.page.should.equal(3);
      });
    });
    describe('.calculateConditions({ implicitly: true, keepExplicit: true }, ...)', () => {
      const result = calculateConditions(
        { implicitly: true, keepExplicit: true },
        { foo: 'foo' },
        retrievedConditions
      );

      it('should keep all retrievedConditions.explicit', () => {
        result.explicit.should.eql(retrievedConditions.explicit);
      });
    });
    describe('.calculateConditions({ implicitly: true, page: 1 }, ...)', () => {
      const result = calculateConditions(
        { implicitly: true, page: 1 },
        { foo: 'foo' },
        retrievedConditions
      );

      it('should reset the page with given options.page', () => {
        result.page.should.equal(1);
      });
    });
    describe('.calculateConditions({ page: 1 }, ...)', () => {
      const result = calculateConditions(
        { page: 1 },
        { foo: 'foo' },
        retrievedConditions
      );

      it('should reset the page to be undefined', () => {
        result.should.have.property('page', undefined);
      });
    });
    describe('.calculateConditions({ attach: true }, ...', () => {
      const result = calculateConditions(
        { attach: true },
        { alpha: 'foo' },
        retrievedConditions
      );

      it('should attach the properties of retrievedConditions.explicit with given payload', () => {
        result.explicit.alpha.should.eql(['a', 'foo']);
      });
    });
    describe('.calculateConditions({ update: true }, ...', () => {
      const result = calculateConditions(
        { update: true },
        { alpha: 'foo' },
        retrievedConditions
      );

      it('should update the retrievedConditions.explicit with given payload', () => {
        result.explicit.should.have.property('alpha', 'foo');
      });
    });
    describe('.calculateConditions({ drop: true }, ...', () => {
      const result = calculateConditions(
        { drop: true },
        { alpha: 'a' },
        retrievedConditions
      );

      it('should drop some properties of retrievedConditions.explicit with given payload', () => {
        result.explicit.should.not.have.property('alpha');
      });
    });
    describe('.calculateConditions(undefined, ...', () => {
      const result = calculateConditions(
        undefined,
        undefined,
        retrievedConditions
      );

      it('should return { explicit: {}, implicit: { ... }, page: undefined }', () => {
        result.explicit.should.eql({});
      });
    });
  });
});
