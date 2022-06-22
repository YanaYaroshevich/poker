import pokerJudge from '../poker';

describe('Poker', () => {
  describe('Straight flush', () => {
    it('one straight flush', () => {
      expect(
        pokerJudge(
          ['10S', 'JS', 'QS', 'KS', 'AS'],
          ['9D', '10D', '6D', 'QD', 'KD'],
        ),
      ).toBe(1);

      expect(
        pokerJudge(
          ['9D', '10D', '6D', 'QD', 'KD'],
          ['6C', '7C', '8C', '9C', '10C'],
        ),
      ).toBe(2);

      expect(
        pokerJudge(
          ['7C', '10C', '8C', '6C', '9C'],
          ['9D', '10D', '6D', 'QD', 'KD'],
        ),
      ).toBe(1);
    });
    it('higher straight flush', () => {
      expect(
        pokerJudge(
          ['9D', '10D', 'JD', 'QD', 'KD'],
          ['10C', 'JC', 'QC', 'KC', 'AC'],
        ),
      ).toBe(2);

      expect(
        pokerJudge(
          ['9D', '10D', 'JD', 'QD', 'KD'],
          ['8C', '9C', '10C', 'JC', 'QC'],
        ),
      ).toBe(1);
    });
    it('same straight flush', () => {
      expect(
        pokerJudge(
          ['10D', 'JD', 'QD', 'KD', 'AD'],
          ['10C', 'JC', 'QC', 'KC', 'AC'],
        ),
      ).toBe(0);

      expect(
        pokerJudge(
          ['2D', '3D', '4D', '5D', '6D'],
          ['2S', '3S', '4S', '5S', '6S'],
        ),
      ).toBe(0);
    });
  });
  describe('Four of a kind', () => {
    it('one four of a kind', () => {
      expect(
        pokerJudge(
          ['10S', '10D', '10C', 'JS', '10H'],
          ['9D', '5D', '6D', 'QD', 'KD'],
        ),
      ).toBe(1);

      expect(
        pokerJudge(
          ['10S', '10D', '9C', 'JS', '10H'],
          ['6C', '10C', '6D', '6S', '6H'],
        ),
      ).toBe(2);
    });
    it('higher four of a kind', () => {
      expect(
        pokerJudge(
          ['10S', '10D', '10C', 'KS', '10H'],
          ['JD', 'JS', 'JC', 'JH', 'KD'],
        ),
      ).toBe(2);

      expect(
        pokerJudge(
          ['3S', '3D', '3C', 'JS', '3H'],
          ['6C', '10D', '6D', '6S', '6H'],
        ),
      ).toBe(2);
    });
    it('four of a kind against straight flush', () => {
      expect(
        pokerJudge(
          ['9S', '9D', '9C', 'JH', '9H'],
          ['10S', 'JS', 'QS', 'KS', 'AS'],
        ),
      ).toBe(2);
    });
  });
  describe('Full house', () => {
    it('one full house', () => {
      expect(
        pokerJudge(
          ['10S', '10D', 'JC', 'JS', '10H'],
          ['9D', '10C', '6D', 'QD', 'KD'],
        ),
      ).toBe(1);

      expect(
        pokerJudge(
          ['10S', '10D', '9C', 'JS', '10H'],
          ['6C', '8C', '8H', '6S', '6H'],
        ),
      ).toBe(2);
    });
    it('higher full house', () => {
      // higher triple wins
      expect(
        pokerJudge(
          ['10S', '10D', 'JC', 'JS', '10H'],
          ['6C', 'JD', 'JH', '6S', '6H'],
        ),
      ).toBe(1);
    });
    it('full house against four of a kind', () => {
      expect(
        pokerJudge(
          ['KS', 'KD', 'QC', 'QS', 'KH'],
          ['10S', '10D', '10C', 'JS', '10H'],
        ),
      ).toBe(2);
    });
    it('full house against straight flush', () => {
      expect(
        pokerJudge(
          ['9D', '10D', 'JD', 'QD', 'KD'],
          ['10S', '10C', 'JC', 'JS', '10H'],
        ),
      ).toBe(1);
    });
  });
  describe('Flush', () => {
    it('one flush', () => {
      expect(
        pokerJudge(
          ['10S', 'JS', '6S', 'KS', 'AS'],
          ['9D', '10D', '6H', 'QD', 'KD'],
        ),
      ).toBe(1);
    });
    it('higher flush', () => {
      expect(
        pokerJudge(
          ['9D', '6D', 'JD', 'QD', 'KD'],
          ['10C', '6C', 'QC', 'KC', 'AC'],
        ),
      ).toBe(2);

      expect(
        pokerJudge(
          ['9D', '10D', '6D', 'QD', 'KD'],
          ['8C', '9C', '6C', 'JC', 'KC'],
        ),
      ).toBe(1);
    });
    it('same flush', () => {
      expect(
        pokerJudge(
          ['10D', '6D', 'QD', 'KD', 'AD'],
          ['10C', '6C', 'QC', 'KC', 'AC'],
        ),
      ).toBe(0);

      expect(
        pokerJudge(
          ['2D', '7D', '4D', '5D', '6D'],
          ['2S', '7S', '4S', '5S', '6S'],
        ),
      ).toBe(0);
    });
    it('flush against full house', () => {
      expect(
        pokerJudge(
          ['10S', '10C', 'JC', 'JS', '10H'],
          ['9D', '5D', '6D', 'QD', 'KD'],
        ),
      ).toBe(1);
    });
    it('flush against four of a kind', () => {
      expect(
        pokerJudge(
          ['6D', '9D', 'JD', 'KD', '2D'],
          ['10S', '10D', '10C', 'JS', '10H'],
        ),
      ).toBe(2);
    });
    it('flush against straight flush', () => {
      expect(
        pokerJudge(
          ['6D', '9D', 'JD', 'KD', '2D'],
          ['10S', 'JS', 'QS', 'KS', 'AS'],
        ),
      ).toBe(2);
    });
  });
  describe('Straight', () => {
    it('one straight', () => {
      expect(
        pokerJudge(
          ['10S', 'JH', 'QH', 'KS', 'AS'],
          ['9D', '10D', '6D', 'QS', 'KD'],
        ),
      ).toBe(1);

      expect(
        pokerJudge(
          ['9D', '10S', '6D', 'QD', 'KD'],
          ['6C', '7H', '8C', '9H', '10C'],
        ),
      ).toBe(2);

      expect(
        pokerJudge(
          ['7C', '10H', '8C', '6H', '9C'],
          ['9D', '10S', '6D', 'QS', 'KD'],
        ),
      ).toBe(1);
    });
    it('higher straight', () => {
      expect(
        pokerJudge(
          ['9D', '10S', 'JD', 'QS', 'KD'],
          ['10C', 'JH', 'QH', 'KC', 'AC'],
        ),
      ).toBe(2);

      expect(
        pokerJudge(
          ['9D', '10H', 'JD', 'QH', 'KD'],
          ['8C', '9S', '10C', 'JS', 'QC'],
        ),
      ).toBe(1);
    });
    it('same straight', () => {
      expect(
        pokerJudge(
          ['10D', 'JH', 'QH', 'KD', 'AD'],
          ['10C', 'JS', 'QS', 'KC', 'AC'],
        ),
      ).toBe(0);

      expect(
        pokerJudge(
          ['2D', '3H', '4D', '5H', '6D'],
          ['2S', '3C', '4S', '5S', '6S'],
        ),
      ).toBe(0);
    });
  });
  describe('Three of a kind', () => {
    it('one three of a kind', () => {
      expect(
        pokerJudge(
          ['10S', '10D', 'JC', '9S', '10H'],
          ['9D', '10C', '6D', 'QD', 'KD'],
        ),
      ).toBe(1);

      expect(
        pokerJudge(
          ['10S', '10D', '9C', 'JS', '10H'],
          ['6C', '8C', '8H', '5S', '6H'],
        ),
      ).toBe(1);
    });
    it('higher three of a kind', () => {
      // higher triple wins
      expect(
        pokerJudge(
          ['10S', '10D', '9C', 'JS', '10H'],
          ['6C', 'JD', 'KH', '6S', '6H'],
        ),
      ).toBe(1);
    });
  });
});
