"use client";

import { useState, useEffect } from "react";
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
import { Loader2, X } from "lucide-react";
import Image from 'next/image';

const listItemSchema = z.object({
  photo: z.any().refine(file => file instanceof File, "A photo is required."),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
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
  const { toast } = useToast();

  const { control, handleSubmit, setValue, watch, formState: { errors, isValid, isSubmitting } } = useForm<ListItemFormData>({
    resolver: zodResolver(listItemSchema),
    mode: "onChange", // Validate on change for better UX
    defaultValues: {
      photo: null, // Initialize photo to null
      category: "",  // Initialize category to an empty string
      condition: "", // Initialize condition to an empty string
      title: "",     // Initialize title to an empty string
      description: "", // Initialize description to an empty string
      materials: [],
      tags: [],
      location: "",  // Initialize location to an empty string
    }
  });

  const watchedPhoto = watch("photo");

  useEffect(() => {
    if (watchedPhoto && watchedPhoto instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(watchedPhoto);
    } else {
      setPhotoPreview(null);
    }
  }, [watchedPhoto]);

  const handleAddTag = () => {
    if (currentTagInput.trim() && !customTags.includes(currentTagInput.trim())) {
      const newCustomTags = [...customTags, currentTagInput.trim()];
      setCustomTags(newCustomTags);
      setValue("tags", newCustomTags);
      setCurrentTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newCustomTags = customTags.filter(tag => tag !== tagToRemove);
    setCustomTags(newCustomTags);
    setValue("tags", newCustomTags);
  };


  const onSubmit: SubmitHandler<ListItemFormData> = async (data) => {
    // This is where you'd typically send data to your backend
    console.log("Form data:", data);
    // For GenAI flow, image needs to be data URI
    const finalData = {
      ...data,
      photoDataUri: photoPreview, // Assuming photoPreview holds the data URI
      tags: customTags, // Only custom tags
    };
    delete (finalData as any).photo; // Remove File object if not needed by backend

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Item Listed!", description: `${data.title} has been successfully listed.` });
    // Reset form or redirect user
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, LIST_ITEM_STEPS.length));
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
                <Label htmlFor="photo" className="text-lg font-medium">Item Photo</Label>
                <Controller
                  name="photo"
                  control={control}
                  render={({ field: { onChange, value, ...restField } }) => (
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                      {...restField}
                    />
                  )}
                />
                {photoPreview && (
                  <div className="mt-4 relative w-full h-64 border rounded-md overflow-hidden">
                    <Image src={photoPreview} alt="Preview" layout="fill" objectFit="contain" />
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
                <Label htmlFor="tags" className="text-lg font-medium">Tags</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="tags"
                    value={currentTagInput}
                    onChange={(e) => setCurrentTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag();}}}
                    placeholder="Add a tag and press Enter"
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">Add Tag</Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
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
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="location" className="text-lg font-medium">Your Location (City, State)</Label>
                <Controller name="location" control={control} render={({ field }) => <Input id="location" {...field} placeholder="e.g., San Francisco, CA" />} />
                {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Listing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {photoPreview && <Image src={photoPreview} alt="Preview" width={100} height={100} className="rounded-md object-cover"/>}
                  <p><strong>Title:</strong> {watch("title")}</p>
                  <p><strong>Category:</strong> {ITEM_CATEGORIES.find(c => c.id === watch("category"))?.name}</p>
                  <p><strong>Condition:</strong> {ITEM_CONDITIONS.find(c => c.id === watch("condition"))?.name}</p>
                  <p><strong>Materials:</strong> {watch("materials")?.join(', ')}</p>
                  <p><strong>Tags:</strong> {customTags.join(', ')}</p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {currentStep < LIST_ITEM_STEPS.length && (
              <Button 
                type="button" 
                onClick={nextStep} 
                className="ml-auto" 
                disabled={
                  currentStep === 1 
                    ? !watch("photo") || !watch("category") || !watch("condition")
                    : currentStep === 2
                      ? !watch("title") || !watch("description") || !watch("materials")?.length
                      : !isValid && currentStep !== 3
                }
              >
                Next
              </Button>
            )}
            {currentStep === LIST_ITEM_STEPS.length && (
              <Button type="submit" disabled={isSubmitting || !isValid} className="ml-auto">
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
