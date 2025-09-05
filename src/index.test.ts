import { describe, it, expect } from 'vitest';
import { Die, DicePool } from './index';

describe('DicePool Engine', () => {
  it('should create a working DicePool instance', () => {
    let die = new Die({ sides: 6 });

    let pool = new DicePool([die, die]);
  });

  it('should roll reasonable results from the dice pool', () => {
    let die = new Die({ sides: 6 });

    let pool = new DicePool([die, die]);

    expect(pool).toBeInstanceOf(DicePool);
    expect(pool.rollAll().length).toBe(2);

    expect(pool.sumResults().value).toBeGreaterThanOrEqual(2);
    expect(pool.sumResults().value).toBeLessThanOrEqual(12);
  })
})