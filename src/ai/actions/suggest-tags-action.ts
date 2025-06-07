
'use server';
/**
 * @fileOverview Server action to suggest clothing tags based on an image.
 *
 * - handleSuggestTags - A function that takes a photo data URI and returns suggested tags.
 */

import { suggestClothingTags } from '@/ai/flows/suggest-clothing-tags';

export async function handleSuggestTags(photoDataUri: string): Promise<string[]> {
  try {
    const result = await suggestClothingTags({ photoDataUri });
    return result.tags;
  } catch (error) {
    console.error("Error suggesting tags via server action:", error);
    // Depending on how you want to handle errors in the client,
    // you might throw the error or return an empty array/specific error structure.
    throw new Error("AI tag suggestion failed.");
  }
}

    