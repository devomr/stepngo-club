/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { setGlobalOptions } from 'firebase-functions/v2';
import { initializeApp } from 'firebase-admin/app';

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 1 });

// initilize firebase app
initializeApp();

export * from './update_tokens_current_price/index';
