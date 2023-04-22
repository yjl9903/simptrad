import { describe, expect, it } from 'vitest';

import { simpleToTrad, tradToSimple } from '../src';

describe('simptrad', () => {
  it('should work', () => {
    const t1 = `子曰：「学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知，而不愠，不亦君子乎？」`;
    const t2 = `子曰：「學而時習之，不亦說乎？有朋自遠方來，不亦樂乎？人不知，而不慍，不亦君子乎？」`;
    expect(simpleToTrad(t1)).toBe(t2);
    expect(tradToSimple(t2)).toBe(t1);
    expect(simpleToTrad(tradToSimple(t2))).toBe(t2);
    expect(tradToSimple(simpleToTrad(t1))).toBe(t1);
  });
});
