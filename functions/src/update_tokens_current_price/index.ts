import { defineString } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { HttpsError } from 'firebase-functions/https';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { onSchedule } from 'firebase-functions/scheduler';

// Define required parameters
const FUNCTIONS_DEPLOYMENT_REGION = defineString(
  'FB_FUNCTIONS_DEPLOYMENT_REGION',
);

const TOKENS_IDS = [
  'usd-coin',
  'go-game-token',
  'stepn',
  'polygon-ecosystem-token',
];

export const updateTokensCurrentPrice = onSchedule(
  { schedule: '*/10 * * * *', region: FUNCTIONS_DEPLOYMENT_REGION },

  async () => {
    logger.info('Update tokens current price...');

    const tokensPrice = await fetchTokensPrice(TOKENS_IDS);

    if (!tokensPrice) {
      // do not override the previous prices if no response is available
      return;
    }

    try {
      const payload = {
        tokens: tokensPrice,
        updatedDate: Timestamp.now(),
      };

      await getFirestore()
        .collection('TOKENS_PRICE')
        .doc('current')
        .set(payload);

      logger.info('Token current price updated successfully...');
    } catch (error) {
      logger.error(error);

      throw new HttpsError(
        'internal',
        'An error occurred while updating token current price',
      );
    }
  },
);

async function fetchTokensPrice(tokenIds: string[]) {
  const tokens = tokenIds.join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokens}&vs_currencies=usd`;
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    logger.error('Error fetching tokens price:', error);
    return null;
  }
}
