import { Card } from './instances';

export function valueComparator(a: Card, b: Card): number {
  return a.value - b.value;
}

export function suitsComparator(a: Card, b: Card): number {
  return a.suit.localeCompare(b.suit);
}

export function suitsValueComparator(a: Card, b: Card): number {
  const suitsComp: number = suitsComparator(a, b);
  return suitsComp === 0 ? valueComparator(a, b) : suitsComp;
}
