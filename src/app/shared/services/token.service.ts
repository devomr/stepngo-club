import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { TokenPriceResponse } from '@shared/types/token-price.type';
import { Token } from '@shared/types/token.type';

// declare tokens
export const usdc: Token = {
  id: 'usd-coin',
  name: 'USDC',
  symbol: 'USDC',
  price: 0,
  image: 'assets/token-usdc.webp',
};

export const ggt: Token = {
  id: 'go-game-token',
  name: 'Go Game Token',
  symbol: 'GGT',
  price: 0,
  image: 'assets/token-ggt.webp',
};

export const gmt: Token = {
  id: 'stepn',
  name: 'Green Metaverse Tokens',
  symbol: 'GMT',
  price: 0,
  image: 'assets/token-gmt.webp',
};

export const pol: Token = {
  id: 'polygon-ecosystem-token',
  name: 'Polygon',
  symbol: 'POL',
  price: 0,
  image: 'assets/token-pol.webp',
};

const AVAILABLE_TOKENS = [usdc, ggt, gmt, pol];

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly firestore = inject(Firestore);

  constructor() {}

  async getTokensWithPrice(): Promise<Token[]> {
    const tokensPrice = await this.getTokensPrice();

    return AVAILABLE_TOKENS.map((token) => {
      const tokenPrice = tokensPrice.tokenPrices.find((t) => t.id === token.id);

      return {
        ...token,
        price: tokenPrice?.price ?? 0,
        updatedDate: tokensPrice.updatedDate,
      };
    });
  }

  async getTokensPrice(): Promise<TokenPriceResponse> {
    const tokensPriceDocumentReference = doc(
      this.firestore,
      '/TOKENS_PRICE/current',
    );
    const document = await getDoc(tokensPriceDocumentReference);
    const data = document.data();

    if (!data) {
      return {
        tokenPrices: [],
        updatedDate: new Date(),
      };
    }

    const tokens = data['tokens'];

    const prices = Object.keys(tokens).map((token) => {
      return {
        id: token,
        price: tokens[token].usd,
      };
    });

    return {
      tokenPrices: prices,
      updatedDate: data['updatedDate'].toDate(),
    };
  }
}
