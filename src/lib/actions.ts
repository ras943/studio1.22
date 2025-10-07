"use server";

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { optimizeCampaignPerformance } from '@/ai/flows/optimize-campaign-performance';

// --- Landing Page Action ---
const urlSchema = z.object({
    websiteUrl: z.string().url({ message: "Please enter a valid URL." }),
});

export async function startAnalysis(prevState: any, formData: FormData) {
  const validatedFields = urlSchema.safeParse({
    websiteUrl: formData.get('websiteUrl'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.websiteUrl?.[0] || 'Invalid input.',
    };
  }
  
  redirect(`/dashboard?url=${encodeURIComponent(validatedFields.data.websiteUrl)}`);
}


// --- Dashboard Optimization Action ---

export async function runOptimization(prevState: any, formData: FormData) {
    // In a real app, you would get this data from your database or state
    const mockData = {
        campaignId: 'campaign-123',
        metrics: {
            impressions: 15000,
            clicks: 300,
            conversions: 10,
            cost: 500,
        },
        suggestions: "Focus on increasing conversion rate.",
        currentSetup: "Broad match keywords for 'AI tools', targeting US/Canada, Maximize Clicks bidding.",
    };

    try {
        const result = await optimizeCampaignPerformance(mockData);
        return {
            success: true,
            data: result,
            message: null
        }
    } catch (error) {
        return {
            success: false,
            data: null,
            message: "Failed to run optimization. Please try again."
        }
    }
}
