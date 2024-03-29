import {
  suitsComparator,
  suitsValueComparator,
  valueComparator,
} from './helpers';

export enum Suits {
  S = 'S',
  D = 'D',
  C = 'C',
  H = 'H',
}

export enum PictureToVal {
  J = 11,
  Q = 12,
  K = 13,
  A = 14,
}

export class Card {
  public value: number;
  public suit: Suits;

  constructor(value: number, suit: Suits) {
    this.value = value;
    this.suit = suit;
  }
}

export class Combination {
  public name: string;
  public validate: (hand: Card[]) => number[];

  constructor(name: string, validate: (hand: Card[]) => number[]) {
    this.name = name;
    this.validate = validate;
  }
}

function getMap(hand: Card[]): { [key: number]: number } {
  const map: { [key: number]: number } = {};
  for (const card of hand) {
    map[card.value] = map[card.value] ? map[card.value] + 1 : 1;
  }
  return map;
}

export const combinations: Combination[] = [
  new Combination('Straight flush', (hand: Card[]): number[] => {
    hand.sort(suitsValueComparator);
    for (let i = 1; i < hand.length; i++) {
      if (hand[i].value !== hand[i - 1].value + 1) {
        return [-1];
      }
      if (hand[i].suit !== hand[i - 1].suit) {
        return [-1];
      }
    }
    return [hand[hand.length - 1].value];
  }),
  new Combination('Four of a kind', (hand: Card[]): number[] => {
    const map: { [key: number]: number } = {};
    for (const card of hand) {
      map[card.value] = map[card.value] ? map[card.value] + 1 : 1;

      if (map[card.value] === 4) {
        return [card.value];
      }
    }
    return [-1];
  }),
  new Combination('Full house', (hand: Card[]): number[] => {
    const map = getMap(hand);
    const values = Object.entries(map);
    if (values.length > 2) {
      return [-1];
    }
    return [values[0][1] === 3 ? +values[0][0] : +values[1][0]];
  }),
  new Combination('Flush', (hand: Card[]): number[] => {
    hand.sort(suitsComparator);
    for (let i = 1; i < hand.length; i++) {
      if (hand[i].suit !== hand[i - 1].suit) {
        return [-1];
      }
    }
    return hand.map((e) => e.value).sort((a, b) => a - b);
  }),
  new Combination('Straight', (hand: Card[]): number[] => {
    hand.sort(valueComparator);
    for (let i = 1; i < hand.length; i++) {
      if (hand[i].value !== hand[i - 1].value + 1) {
        return [-1];
      }
    }
    return hand.map((e) => e.value).sort((a, b) => a - b);
  }),
  new Combination('Three of a kind', (hand: Card[]): number[] => {
    const map = getMap(hand);
    const values = Object.entries(map);
    const threeVal = values.find((el) => el[1] === 3);
    if (!threeVal) {
      return [-1];
    }
    return [+threeVal[0]];
  }),
  new Combination('Two pairs', (hand: Card[]): number[] => {
    const map = getMap(hand);
    const values = Object.entries(map);
    const pairVals = values.filter((el) => el[1] === 2);
    if (pairVals.length !== 2) {
      return [-1];
    }
    const leftVal = values.find(
      (el) => el[0] !== pairVals[0][0] && el[0] !== pairVals[1][0],
    );
    return [+pairVals[0][0], +pairVals[1][0], +leftVal![0]];
  }),
  new Combination('Pair', (hand: Card[]): number[] => {
    const map = getMap(hand);
    const values = Object.entries(map);
    const pairVal = values.find((el) => el[1] === 2);
    if (!pairVal) {
      return [-1];
    }
    const leftVals = values
      .filter((el) => el[0] !== pairVal[0])
      .map((e) => +e[0])
      .sort((a, b) => a - b);
    return [+pairVal[0], ...leftVals];
  }),
  new Combination('High card', (hand: Card[]): number[] => {
    return hand.map((el) => el.value).sort((a, b) => a - b);
  }),
];
