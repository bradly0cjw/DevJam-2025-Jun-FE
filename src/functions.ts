
/**
 * @fileOverview Firebase Cloud Functions definitions.
 * To deploy these functions, ensure your firebase.json is configured
 * to find and deploy functions from this file/directory.
 * E.g., by setting functions.source appropriately or using Next.js framework-aware hosting.
 */

import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp as initializeAdminAppIfNeeded, getApps as getAdminApps } from 'firebase-admin/app';

// Import the Genkit flow. Adjust path if function file moves.
import { recommendOutfit, type RecommendOutfitInput } from './ai/flows/recommend-outfit-flow';

// Initialize Firebase Admin SDK. It's safe to call this multiple times.
// Genkit flows might also initialize it.
if (getAdminApps().length === 0) {
  initializeAdminAppIfNeeded();
}

/**
 * Firebase Callable Function to get an outfit recommendation.
 * This function is invoked via HTTPS Callable from the client.
 * It uses a Genkit flow to determine the recommendation.
 */
export const getOutfitRecommendation = onCall(async (request) => {
  logger.info("getOutfitRecommendation called with data:", request.data);

  const filePath = request.data.filePath;

  if (typeof filePath !== 'string' || !filePath) {
    logger.warn("Missing or invalid 'filePath' argument.");
    throw new HttpsError('invalid-argument', 'The function must be called with the "filePath" argument.');
  }

  try {
    const flowInput: RecommendOutfitInput = { filePath };
    const result = await recommendOutfit(flowInput); // Call the Genkit flow

    return {
      success: true,
      recommendation: result.recommendation,
    };

  } catch (error: any) {
    logger.error("Error in getOutfitRecommendation flow execution:", error);

    // Map specific errors from the flow/logic to HttpsError as per spec
    if (error.message === 'No recommendation items found in the database.') {
      throw new HttpsError('not-found', 'No recommendation items found in the database.');
    }
    if (error.message && error.message.startsWith('Internal error: Recommended item data from Firestore is invalid')) {
        throw new HttpsError('internal', 'An internal error occurred while processing the data.');
    }
    // For other errors, throw a generic one as per spec
    throw new HttpsError('internal', 'An internal error occurred while processing the image.');
  }
});
