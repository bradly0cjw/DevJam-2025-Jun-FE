
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { firebaseApp, firebaseFunctions, firebaseStorage } from '@/lib/firebase/client'; // Ensure this path is correct
import { ref, uploadBytes } from "firebase/storage";
import { httpsCallable } from "firebase/functions";
import NextImage from 'next/image'; // Using NextImage for optimized remote images
import { Loader2, UploadCloud, CheckCircle, XCircle, Shirt } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { APP_NAME } from '@/lib/constants';
import type { RecommendedItem } from '@/ai/flows/recommend-outfit-flow'; // Ensure this type is correctly imported
import { Badge } from '@/components/ui/badge';


export default function SmartMatchingPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Select an image to start matching.");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendedItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const localImageUrl = URL.createObjectURL(file);
      setUploadedImagePreview(localImageUrl);
      setStatusMessage("Image selected. Click 'Match My Outfit' to proceed.");
      setRecommendation(null); // Clear previous recommendation
      setError(null); // Clear previous error
    }
  };

  const handleUploadAndMatch = async () => {
    if (!firebaseStorage || !firebaseFunctions) {
      setError("Firebase services are not available. Please check your Firebase configuration in .env and ensure client SDK is initialized correctly.");
      setStatusMessage("Initialization Error");
      setIsLoading(false);
      return;
    }

    if (!selectedFile) {
      setError("Please select an image file first.");
      setStatusMessage("No image selected.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Uploading image...");
    setError(null);
    setRecommendation(null);

    try {
      // 1. Upload image to Firebase Storage
      const filePath = `user-uploads/smart-matching/${Date.now()}-${selectedFile.name}`;
      const storageRef = ref(firebaseStorage, filePath);
      await uploadBytes(storageRef, selectedFile);
      console.log('Image uploaded successfully!');
      // No need to get download URL here if the backend only needs the path

      // 2. Call the backend Cloud Function
      setStatusMessage("AI is matching your outfit...");
      const getOutfit = httpsCallable<{filePath: string}, {success: boolean, recommendation?: RecommendedItem, error?: string}>(firebaseFunctions, 'getOutfitRecommendation');
      const result = await getOutfit({ filePath: filePath });

      if (result.data.success && result.data.recommendation) {
        setRecommendation(result.data.recommendation);
        setStatusMessage("Outfit match complete!");
      } else if (result.data.error) {
        setError(result.data.error || "Failed to get recommendation.");
        setStatusMessage("Matching failed.");
      } else {
         setError("An unknown error occurred during matching or no recommendation found.");
        setStatusMessage("Matching failed or no items found.");
      }

    } catch (e: any) {
      console.error("An error occurred:", e);
      setError(String(e?.message || "An unexpected error occurred."));
      setStatusMessage(`Error: ${String(e?.message || 'Unknown error')}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline text-primary">
            {APP_NAME} - Smart Outfit Matcher
          </CardTitle>
          <CardDescription>
            Upload an image of a clothing item and let our AI find a great match for you!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="imageUploader" className="text-lg font-medium">
              1. Choose Your Item
            </Label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
                <UploadCloud className="mr-2 h-5 w-5" />
                {selectedFile ? "Change Image" : "Select Image"}
              </Button>
              <Input
                id="imageUploader"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" // Hidden, triggered by button
                ref={fileInputRef}
                disabled={isLoading}
              />
              {selectedFile && <p className="text-sm text-muted-foreground truncate">Selected: {selectedFile.name}</p>}
            </div>
          </div>

          {statusMessage && (
            <Alert variant={error ? "destructive" : "default"} className="flex items-start">
              {isLoading ? <Loader2 className="h-5 w-5 mr-3 animate-spin flex-shrink-0" /> : 
               error ? <XCircle className="h-5 w-5 mr-3 flex-shrink-0" /> : 
               recommendation ? <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-green-500" /> :
               <Shirt className="h-5 w-5 mr-3 flex-shrink-0" />
              }
              <div>
                <AlertTitle>{isLoading ? "Processing..." : error ? "Error" : recommendation ? "Success!" : "Status"}</AlertTitle>
                <AlertDescription>{statusMessage}</AlertDescription>
              </div>
            </Alert>
          )}


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">Your Uploaded Item:</h3>
              {uploadedImagePreview ? (
                <div className="aspect-square w-full rounded-lg border bg-muted overflow-hidden relative">
                  {/* Use standard img tag for local blob previews */}
                  <img src={uploadedImagePreview} alt="User Uploaded Item" className="object-contain w-full h-full" />
                </div>
              ) : (
                <div className="aspect-square w-full rounded-lg border border-dashed bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Image preview will appear here</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">AI Recommended Match:</h3>
              {isLoading && !recommendation && (
                 <div className="aspect-square w-full rounded-lg border bg-muted flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-2" />
                    <p className="text-muted-foreground">Finding a match...</p>
                 </div>
              )}
              {!isLoading && recommendation && (
                <Card className="overflow-hidden shadow-md">
                  <div className="aspect-square w-full relative">
                    <NextImage src={recommendation.imageUrl} alt={recommendation.name} layout="fill" objectFit="contain" data-ai-hint="fashion clothing item" />
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-1">{recommendation.name}</CardTitle>
                    {recommendation.description && <p className="text-sm text-muted-foreground">{recommendation.description}</p>}
                    <Badge variant="outline" className="mt-2">{recommendation.type} - {recommendation.color}</Badge>
                  </CardContent>
                </Card>
              )}
              {!isLoading && !recommendation && !error && (
                <div className="aspect-square w-full rounded-lg border border-dashed bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Recommendation will appear here</p>
                </div>
              )}
               {!isLoading && !recommendation && error && (
                <div className="aspect-square w-full rounded-lg border border-destructive bg-destructive/10 flex items-center justify-center p-4">
                  <p className="text-destructive text-center">{error}</p>
                </div>
              )}
            </div>
          </div>
           <Button 
            onClick={handleUploadAndMatch} 
            disabled={isLoading || !selectedFile} 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
          >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {isLoading ? "Matching..." : "Match My Outfit!"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
