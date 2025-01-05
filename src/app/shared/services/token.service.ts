import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { TokenDataResponse } from '@shared/types/token-price.type';
import { Token } from '@shared/types/token.type';

// declare tokens
export const usdc: Token = {
  id: 'usd-coin',
  name: 'USDC',
  symbol: 'USDC',
  price: 0,
  change: 0,
  image: 'assets/token-usdc.webp',
};

export const ggt: Token = {
  id: 'go-game-token',
  name: 'Go Game Token',
  symbol: 'GGT',
  price: 0,
  change: 0,
  image: 'assets/token-ggt.webp',
};

export const gmt: Token = {
  id: 'stepn',
  name: 'Green Metaverse Tokens',
  symbol: 'GMT',
  price: 0,
  change: 0,
  image: 'assets/token-gmt.webp',
};

export const pol: Token = {
  id: 'polygon-ecosystem-token',
  name: 'Polygon',
  symbol: 'POL',
  price: 0,
  change: 0,
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
    const response = await this.getTokensData();

    return AVAILABLE_TOKENS.map((token) => {
      const tokenPrice = response.tokenData.find((t) => t.id === token.id);

      return {
        ...token,
        price: tokenPrice?.price ?? 0,
        change: tokenPrice?.change ?? 0,
        updatedDate: response.updatedDate,
      };
    });
  }

  async getTokensData(): Promise<TokenDataResponse> {
    const tokensDataDocumentReference = doc(
      this.firestore,
      '/TOKENS_DATA/current',
    );
    const document = await getDoc(tokensDataDocumentReference);
    const data = document.data();

    if (!data) {
      return {
        tokenData: [],
        updatedDate: new Date(),
      };
    }

    const tokens = data['tokens'];

    const tokenData = Object.keys(tokens).map((token) => {
      return {
        id: token,
        price: tokens[token].usd,
        change: tokens[token].usd_24h_change,
      };
    });

    return {
      tokenData: tokenData,
      updatedDate: data['updatedDate'].toDate(),
    };
  }
}
