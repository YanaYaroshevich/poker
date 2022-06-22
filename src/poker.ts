import { Card, combinations, PictureToVal, Suits } from './instances';

function parseCard(card: string): Card {
  if (card.length === 3) {
    return new Card(10, Suits[card[2] as keyof typeof Suits]);
  }

  if (Number.isNaN(+card[0])) {
    return new Card(
      PictureToVal[card[0] as keyof typeof PictureToVal],
      Suits[card[1] as keyof typeof Suits],
    );
  }

  return new Card(+card[0], Suits[card[1] as keyof typeof Suits]);
}

export default function pokerJudge(hand1: string[], hand2: string[]): Number {
  const hand1Mapped: Card[] = hand1.map(parseCard);
  const hand2Mapped: Card[] = hand2.map(parseCard);

  for (const comb of combinations) {
    const hand1Res = comb.validate(hand1Mapped);
    const hand2Res = comb.validate(hand2Mapped);

    if (hand1Res[0] !== -1 && hand2Res[0] !== -1) {
      for (let i = 0; i < hand1Res.length; i++) {
        if (hand1Res[i] > hand2Res[i]) {
          return 1;
        }

        if (hand2Res[i] > hand1Res[i]) {
          return 2;
        }
      }
      return 0;
    }
    if (hand1Res[0] !== -1) {
      return 1;
    }
    if (hand2Res[0] !== -1) {
      return 2;
    }
  }
  return 0;
}
