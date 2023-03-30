
export type Card = {
  isRevealed: boolean,
  value?: string,
}

export type Player = {
  id: string,
  card: Card
  name: string,
}
