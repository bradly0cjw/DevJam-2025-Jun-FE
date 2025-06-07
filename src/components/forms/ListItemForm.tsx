"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { IconSelector } from "@/components/shared/IconSelector";
import { ITEM_CATEGORIES, ITEM_CONDITIONS, COMMON_MATERIALS, LIST_ITEM_STEPS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X, Camera } from "lucide-react";
import { handleSuggestTags } from "@/ai/actions/suggest-tags-action";
// Removed NextImage as we'll use standard img for local previews

const listItemSchema = z.object({
  photo: z.any().refine(file => file instanceof File, "A photo is required."),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be 100 characters or less"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be 500 characters or less"),
  materials: z.array(z.string()).min(1, "At least one material is required"),
  tags: z.array(z.string()).optional(),
  location: z.string().min(2, "Location is required"),
});

type ListItemFormData = z.infer<typeof listItemSchema>;


export function ListItemForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [currentTagInput, setCurrentTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggestingTags, setIsSuggestingTags] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const { control, handleSubmit, setValue, watch, formState: { errors, isValid, isSubmitting }, trigger } = useForm<ListItemFormData>({
    resolver: zodResolver(listItemSchema),
    mode: "onChange", 
    defaultValues: {
      photo: undefined, // Changed from null to undefined
      category: "",
      condition: "",
      title: "",
      description: "",
      materials: [],
      tags: [],
      location: "",
    }
  });

  const watchedPhoto = watch("photo");

  useEffect(() => {
    if (watchedPhoto && watchedPhoto instanceof File) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        setPhotoPreview(dataUri);
        // Automatically suggest tags when a photo is uploaded
        setIsSuggestingTags(true);
        try {
          const tags = await handleSuggestTags(dataUri);
          setSuggestedTags(tags);
        } catch (error) {
          console.error("Error suggesting tags:", error);
          toast({
            variant: "destructive",
            title: "Tag Suggestion Failed",
            description: "Could not get AI tag suggestions. Please add tags manually.",
          });
        } finally {
          setIsSuggestingTags(false);
        }
      };
      reader.readAsDataURL(watchedPhoto);
    } else {
      setPhotoPreview(null);
      setSuggestedTags([]);
    }
  }, [watchedPhoto, toast]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !customTags.includes(trimmedTag)) {
      const newCustomTags = [...customTags, trimmedTag];
      setCustomTags(newCustomTags);
      setValue("tags", newCustomTags, { shouldValidate: true });
    }
  };

  const handleAddCustomTag = () => {
    addTag(currentTagInput);
    setCurrentTagInput("");
  };
  
  const handleSuggestedTagClick = (tag: string) => {
    addTag(tag);
    setSuggestedTags(prev => prev.filter(t => t !== tag));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newCustomTags = customTags.filter(tag => tag !== tagToRemove);
    setCustomTags(newCustomTags);
    setValue("tags", newCustomTags, { shouldValidate: true });
    // If it was a suggested tag, add it back to suggestions
    if (suggestedTags.every(st => st !== tagToRemove) && !COMMON_MATERIALS.includes(tagToRemove) && !ITEM_CATEGORIES.map(c=>c.name.toLowerCase()).includes(tagToRemove.toLowerCase()) ) {
        // This logic can be improved to only re-add if it was originally an AI suggestion
        // For now, this is a simple way to put it back if it's not a custom or material tag.
    }
  };


  const onSubmit: SubmitHandler<ListItemFormData> = async (data) => {
    console.log("Form data:", data);
    const finalData = {
      ...data,
      photoDataUri: photoPreview, 
      tags: customTags, 
    };
    delete (finalData as any).photo; 

    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Item Listed!", description: `${data.title} has been successfully listed.` });
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof ListItemFormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['photo', 'category', 'condition'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['title', 'description', 'materials', 'location']; // Added location here
    }

    const isValidStep = await trigger(fieldsToValidate);
    if (isValidStep) {
      setCurrentStep(prev => Math.min(prev + 1, LIST_ITEM_STEPS.length));
    } else {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill in all required fields for this step.",
        });
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">List Your Item</CardTitle>
        <CardDescription>Share your pre-loved clothing with creators.</CardDescription>
        <ProgressBar currentStep={currentStep} totalSteps={LIST_ITEM_STEPS.length} stepNames={LIST_ITEM_STEPS.map(s => s.name)} />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="photo" className="text-lg font-medium block mb-2">Item Photo</Label>
                <div className="flex items-center gap-4">
                    <Button type="button" variant="outline" onClick={() => photoInputRef.current?.click()} className="w-full sm:w-auto">
                        <Camera className="mr-2 h-4 w-4" /> {photoPreview ? "Change Photo" : "Upload Photo"}
                    </Button>
                    <Controller
                      name="photo"
                      control={control}
                      render={({ field: { onChange, value, ...restField } }) => (
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          className="hidden" // Hide the default input, use button instead
                          onChange={(e) => onChange(e.target.files ? e.target.files[0] : undefined)} // Ensure undefined if no file
                          {...restField}
                        />
                      )}
                    />
                </div>
                 {photoPreview && (
                  <div className="mt-4 relative w-full aspect-video border rounded-md overflow-hidden bg-muted">
                    {/* Using standard img for local preview */}
                    <img src={photoPreview} alt="Preview" className="object-contain w-full h-full" />
                  </div>
                )}
                {errors.photo && <p className="text-sm text-destructive mt-1">{errors.photo.message as string}</p>}
              </div>

              <div>
                <Label className="text-lg font-medium">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => <IconSelector options={ITEM_CATEGORIES} {...field} />}
                />
                {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <Label className="text-lg font-medium">Condition</Label>
                <Controller
                  name="condition"
                  control={control}
                  render={({ field }) => <IconSelector options={ITEM_CONDITIONS} {...field} />}
                />
                {errors.condition && <p className="text-sm text-destructive mt-1">{errors.condition.message}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-lg font-medium">Item Title</Label>
                <Controller name="title" control={control} render={({ field }) => <Input id="title" {...field} placeholder="e.g., Vintage Blue Denim Jacket" />} />
                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <Label htmlFor="description" className="text-lg font-medium">Description</Label>
                <Controller name="description" control={control} render={({ field }) => <Textarea id="description" {...field} placeholder="Describe the item, its style, any quirks..." rows={4} />} />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
              </div>
              
              <div>
                <Label className="text-lg font-medium">Materials</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {COMMON_MATERIALS.map(material => (
                    <Controller
                        key={material}
                        name="materials"
                        control={control}
                        render={({ field }) => (
                            <label className="flex items-center space-x-2 p-2 border rounded-md hover:bg-muted has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-primary focus:ring-primary border-muted-foreground"
                                    checked={field.value?.includes(material)}
                                    onChange={e => {
                                        const newMaterials = e.target.checked
                                            ? [...(field.value || []), material]
                                            : (field.value || []).filter(m => m !== material);
                                        field.onChange(newMaterials);
                                    }}
                                />
                                <span>{material}</span>
                            </label>
                        )}
                    />
                ))}
                </div>
                {errors.materials && <p className="text-sm text-destructive mt-1">{errors.materials.message}</p>}
              </div>

                <div>
                  <Label className="text-lg font-medium">Tags</Label>
                  {isSuggestingTags && (
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Suggesting tags...
                    </div>
                  )}
                  {suggestedTags.length > 0 && !isSuggestingTags && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <p className="text-sm text-muted-foreground w-full">Suggested tags (click to add):</p>
                      {suggestedTags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-sm py-1 px-2 cursor-pointer hover:bg-accent/20" onClick={() => handleSuggestedTagClick(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="customTags"
                      value={currentTagInput}
                      onChange={(e) => setCurrentTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomTag();}}}
                      placeholder="Add your own tag and press Enter"
                    />
                    <Button type="button" onClick={handleAddCustomTag} variant="outline">Add Tag</Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 min-h-[2.5rem]"> {/* Ensure space even if no tags */}
                    {customTags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-sm py-1 px-2">
                        {tag}
                        <Button type="button" onClick={() => handleRemoveTag(tag)} variant="ghost" size="icon" className="ml-1 h-4 w-4 p-0">
                          <X className="h-3 w-3"/>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                   {errors.tags && <p className="text-sm text-destructive mt-1">{errors.tags.message}</p>}
                </div>
                 <div>
                  <Label htmlFor="location" className="text-lg font-medium">Your Location (City, State)</Label>
                  <Controller name="location" control={control} render={({ field }) => <Input id="location" {...field} placeholder="e.g., San Francisco, CA" />} />
                  {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
                </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Listing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {photoPreview && <img src={photoPreview} alt="Preview" className="rounded-md object-cover w-full max-h-64"/>}
                  <div><strong className="text-primary">Title:</strong> {watch("title")}</div>
                  <div><strong className="text-primary">Category:</strong> {ITEM_CATEGORIES.find(c => c.id === watch("category"))?.name}</div>
                  <div><strong className="text-primary">Condition:</strong> {ITEM_CONDITIONS.find(c => c.id === watch("condition"))?.name}</div>
                  <div><strong className="text-primary">Description:</strong> {watch("description")}</div>
                  <div><strong className="text-primary">Materials:</strong> {watch("materials")?.join(', ')}</div>
                  <div><strong className="text-primary">Tags:</strong> {customTags.join(', ')}</div>
                  <div><strong className="text-primary">Location:</strong> {watch("location")}</div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                Previous
              </Button>
            )}
            {currentStep < LIST_ITEM_STEPS.length ? (
              <Button 
                type="button" 
                onClick={nextStep} 
                className="ml-auto"
                disabled={isSubmitting}
              >
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting || !isValid} className="ml-auto bg-accent hover:bg-accent/90">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                List Item
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

