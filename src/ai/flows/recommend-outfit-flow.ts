
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
// import { getStorage as getAdminStorage } from 'firebase-admin/storage'; // Needed if flow fetches image content

// Initialize Firebase Admin SDK if not already initialized
// This is safe to call multiple times as initializeAdminApp checks internally.
if (getAdminApps().length === 0) {
  initializeAdminApp();
}
const adminDb = getAdminFirestore();

export const RecommendOutfitInputSchema = z.object({
  filePath: z.string().describe("Path to the user's uploaded image in Firebase Storage. E.g., 'images/the-image-user-uploaded.jpg'"),
});
export type RecommendOutfitInput = z.infer<typeof RecommendOutfitInputSchema>;

export const RecommendedItemSchema = z.object({
  name: z.string().describe("商品名稱"),
  type: z.string().describe("商品類型 (e.g., 'top', 'bottom')"),
  color: z.string().describe("主要顏色"),
  imageUrl: z.string().url().describe("可以直接在 <img> 標籤中使用的公開圖片網址"),
  description: z.string().optional().describe("商品的簡單描述"),
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
    // const { filePath } = input; // filePath is available for future use (e.g., image analysis)
    // For V1, we ignore the image content and pick randomly.

    const clothesCol = adminDb.collection('clothes');
    const snapshot = await clothesCol.get();

    if (snapshot.empty) {
      throw new Error('No recommendation items found in the database.');
    }

    const allClothesData: any[] = [];
    snapshot.forEach(doc => {
      allClothesData.push(doc.data()); // Get raw data
    });

    const randomIndex = Math.floor(Math.random() * allClothesData.length);
    const selectedRawItem = allClothesData[randomIndex];

    // Validate and structure the selected item against RecommendedItemSchema
    // This ensures the data from Firestore matches the expected output structure.
    const parseResult = RecommendedItemSchema.safeParse({
        name: selectedRawItem.name,
        type: selectedRawItem.type,
        color: selectedRawItem.color,
        imageUrl: selectedRawItem.imageUrl, // Assumed to be a public URL stored in Firestore
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
