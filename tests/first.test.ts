import assert from 'assert';
import { describe, it } from 'mocha';
const Array = [1,2,3];

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

  });
});
