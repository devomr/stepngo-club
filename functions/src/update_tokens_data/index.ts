import { defineString } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { HttpsError } from 'firebase-functions/https';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { TokenData } from '../types/token-data.type';
import { onSchedule } from 'firebase-functions/scheduler';

// Define required parameters
const FUNCTIONS_DEPLOYMENT_REGION = defineString(
  'FB_FUNCTIONS_DEPLOYMENT_REGION',
);
const COINGECKO_API_KEY = defineString('COINGECKO_API_KEY');

const TOKENS_IDS = [
  'usd-coin',
  'go-game-token',
  'stepn',
  'polygon-ecosystem-token',
];

/**
 * @description
 * This function is triggered every 10 minutes and updates the
 * tokens data in the Firestore database.
 *
 * @returns {Promise<void>} A promise that resolves when the
 * function is complete.
 */
export const updateTokensData = onSchedule(
  {
    schedule: '*/10 * * * *',
    region: FUNCTIONS_DEPLOYMENT_REGION,
    timeoutSeconds: 5,
  },

  async () => {
    logger.info('Update tokens data...');

    const tokensData = await fetchTokensData(TOKENS_IDS);

    if (!tokensData) {
      // do not override the previous data if no response is available
      logger.info('Tokens data not available...');
      return;
    }

    try {
      await storeTokensData(tokensData);
      logger.info('Tokens data updated successfully...');
    } catch (error) {
      logger.error(error);

      throw new HttpsError(
        'internal',
        'An error occurred while updating tokens data',
      );
    }
  },
);

/**
 * @description
 * Fetches the tokens data from the CoinGecko API. The following data is retrieved:
 * * token price (USD)
 * * 24-hour price change percentage (USD)
 *
 * @param {string[]} tokenIds An array of token IDs to fetch data for.
 *
 * @return {Promise<TokenData | null>} A promise that resolves to the token
 * data or null if an error occurs.
 */
async function fetchTokensData(tokenIds: string[]): Promise<TokenData | null> {
  const baseUrl = new URL('https://api.coingecko.com/api/v3/simple/price');
  baseUrl.searchParams.append('ids', tokenIds.join(','));
  baseUrl.searchParams.append('vs_currencies', 'usd');
  baseUrl.searchParams.append('include_24hr_change', 'true');
  baseUrl.searchParams.append('x_cg_demo_api_key', COINGECKO_API_KEY.value());

  const options = { method: 'GET', headers: { accept: 'application/json' } };

  try {
    const response = await fetch(baseUrl.toString(), options);

    if (response.status !== 200) {
      logger.error('API response error', response.status, response.statusText);
      return null;
    }

    const json = await response.json();
    return json;
  } catch (error) {
    logger.error('Error fetching tokens price:', error);
    return null;
  }
}

/**
 * Store token data in Firestore
 * @param data Token data to store
 */
async function storeTokensData(data: TokenData) {
  const payload = {
    tokens: data,
    updatedDate: Timestamp.now(),
  };

  await getFirestore().collection('TOKENS_DATA').doc('current').set(payload);
}
