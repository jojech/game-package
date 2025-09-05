import Card from "../card/card";

export interface DeckOptions {
  shuffle?: boolean;
  minSize?: number;
  maxSize?: number;
}

export interface CardState extends Card {
  stateId: string;
}

export default class Deck {
  private cardList: CardState[];
  private activeDeck: CardState[] = [];
  private discardPile: CardState[] = [];
  private inPlay: CardState[] = [];

  constructor(deckLabel: string, cards: Card[] = [], options: DeckOptions = {}) {
    this.cardList = cards.map((card, index) => ({
      ...card,
      stateId: `card-${index}-${deckLabel}`
    }));

    this.activeDeck = [...this.cardList];

    if ( options.shuffle ) this.shuffle();
  }

  static shuffleArray( array: any[] ): any[] {
    let currentIndex = array.length, randomIndex;
    const shuffledArray = [...array];
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ];
    }
    return shuffledArray;
  }

  shuffle( includeDiscard: boolean = false ): void {
    // Create a shallow copy to avoid modifying the original array
    const stack = [...this.activeDeck];

    if ( includeDiscard || stack.length === 0 ) {
      stack.push(...this.discardPile);
      this.discardPile = [];
    }

    this.activeDeck = Deck.shuffleArray(stack);
  }

  draw(count: number = 1): CardState[] {
    const drawnCards: CardState[] = [];

    for (let i = 0; i < count; i++) {
      if (this.activeDeck.length === 0) {
        // If the deck is empty, reshuffle the discard pile into the deck
        this.shuffle(true);
      }

      const card = this.activeDeck.shift();

      if (card) {
        drawnCards.push(card);
      }
    }

    this.inPlay.push(...drawnCards);

    return drawnCards;
  }

  discard(cards: CardState[] = []): void {
    this.purgeList(cards);

    this.discardPile.push(...cards);
  }

  restoreCardList(): void {
    for ( const card of this.cardList ) {
      if ( !this.activeDeck.includes(card) && !this.discardPile.includes(card) && !this.inPlay.includes(card) ) {
        this.activeDeck.push(card);
      }
    }
  }
  
  purge( id: string ): void {
    this.activeDeck = this.activeDeck.filter(card => card.stateId !== id);
    this.discardPile = this.discardPile.filter(card => card.stateId !== id);
    this.inPlay = this.inPlay.filter(card => card.stateId !== id);
  }

  purgeList( cards: CardState[] = [] ): void {
    for ( const card of cards ) {
      this.purge(card.stateId);
    }
  }
}