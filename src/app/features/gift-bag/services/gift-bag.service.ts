import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GiftBagService {
  private readonly firestore = inject(Firestore);

  constructor() {}

  async getGiftBagCode(): Promise<string | null> {
    const giftBagDocumentReference = doc(this.firestore, '/GIFT_BAG/current');
    const document = await getDoc(giftBagDocumentReference);
    const data = document.data();

    if (!data) {
      return null;
    }

    return data['code'];
  }
}
