
export type Card = {
  isRevealed: boolean,
  value?: string,
}

export type Player = {
  id: number,
  card: Card
  name: string,
}
