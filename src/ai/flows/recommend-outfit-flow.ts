
'use server';
/**
 * @fileOverview Flow to recommend an outfit based on a user-uploaded image path.
 * - recommendOutfit - A function that handles the outfit recommendation process.
 * - RecommendOutfitInputSchema - The input type for the recommendOutfit function.
 * - RecommendOutfitOutputSchema - The return type for the recommendOutfit function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { initializeApp as initializeAdminApp, getApps as getAdminApps } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

if (getAdminApps().length === 0) {
  initializeAdminApp();
}
const adminDb = getAdminFirestore();

export const RecommendOutfitInputSchema = z.object({
  filePath: z.string().describe("Path to the user's uploaded image in Firebase Storage. E.g., 'images/the-image-user-uploaded.jpg'"),
});
export type RecommendOutfitInput = z.infer<typeof RecommendOutfitInputSchema>;

export const RecommendedItemSchema = z.object({
  name: z.string().describe("Product name"),
  type: z.string().describe("Product type (e.g., 'top', 'bottom')"),
  color: z.string().describe("Main color"),
  imageUrl: z.string().url().describe("Publicly accessible image URL that can be used directly in an <img> tag"),
  description: z.string().optional().describe("A brief description of the product"),
});
export type RecommendedItem = z.infer<typeof RecommendedItemSchema>;

export const RecommendOutfitOutputSchema = z.object({
  recommendation: RecommendedItemSchema,
});
export type RecommendOutfitOutput = z.infer<typeof RecommendOutfitOutputSchema>;

export async function recommendOutfit(input: RecommendOutfitInput): Promise<RecommendOutfitOutput> {
  return recommendOutfitFlow(input);
}

const recommendOutfitFlow = ai.defineFlow(
  {
    name: 'recommendOutfitFlow',
    inputSchema: RecommendOutfitInputSchema,
    outputSchema: RecommendOutfitOutputSchema,
  },
  async (input: RecommendOutfitInput) => {
    const clothesCol = adminDb.collection('clothes');
    const snapshot = await clothesCol.get();

    if (snapshot.empty) {
      throw new Error('No recommendation items found in the database.');
    }

    const allClothesData: any[] = [];
    snapshot.forEach(doc => {
      allClothesData.push(doc.data()); 
    });

    const randomIndex = Math.floor(Math.random() * allClothesData.length);
    const selectedRawItem = allClothesData[randomIndex];

    const parseResult = RecommendedItemSchema.safeParse({
        name: selectedRawItem.name,
        type: selectedRawItem.type,
        color: selectedRawItem.color,
        imageUrl: selectedRawItem.imageUrl, 
        description: selectedRawItem.description
    });

    if (!parseResult.success) {
        console.error("Data from Firestore does not match recommendation schema:", parseResult.error.flatten().fieldErrors, selectedRawItem);
        const fieldErrors = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Internal error: Recommended item data from Firestore is invalid. Issues: ${fieldErrors}`);
    }

    return { recommendation: parseResult.data };
  }
);

    