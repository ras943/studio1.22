'use server';

/**
 * @fileOverview An AI agent to optimize ad campaign performance.
 *
 * - optimizeCampaignPerformance - A function that optimizes the performance of an ad campaign.
 * - OptimizeCampaignPerformanceInput - The input type for the optimizeCampaignPerformance function.
 * - OptimizeCampaignPerformanceOutput - The return type for the optimizeCampaignPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeCampaignPerformanceInputSchema = z.object({
  campaignId: z.string().describe('The ID of the ad campaign to optimize.'),
  metrics: z.object({
    impressions: z.number().describe('The number of impressions the campaign has received.'),
    clicks: z.number().describe('The number of clicks the campaign has received.'),
    conversions: z.number().describe('The number of conversions the campaign has generated.'),
    cost: z.number().describe('The total cost of the campaign.'),
  }).describe('The performance metrics of the ad campaign.'),
  suggestions: z.string().describe('Additional suggestions to the campaign.'),
  currentSetup: z.string().describe('Description of the current campaign setup, including targeting, bid strategies and ads.'),
});
export type OptimizeCampaignPerformanceInput = z.infer<typeof OptimizeCampaignPerformanceInputSchema>;

const OptimizeCampaignPerformanceOutputSchema = z.object({
  suggestedAdjustments: z.string().describe('The suggested adjustments to the campaign to improve performance.'),
  confidenceScore: z.number().describe('A confidence score (0-1) indicating the likelihood that the suggested adjustments will improve performance.'),
});
export type OptimizeCampaignPerformanceOutput = z.infer<typeof OptimizeCampaignPerformanceOutputSchema>;

export async function optimizeCampaignPerformance(input: OptimizeCampaignPerformanceInput): Promise<OptimizeCampaignPerformanceOutput> {
  return optimizeCampaignPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeCampaignPerformancePrompt',
  input: {schema: OptimizeCampaignPerformanceInputSchema},
  output: {schema: OptimizeCampaignPerformanceOutputSchema},
  prompt: `You are an expert in Google Ads campaign optimization. Given the current campaign performance metrics and setup, suggest adjustments to improve ROI.

Campaign ID: {{{campaignId}}}

Current Campaign Setup: {{{currentSetup}}}

Performance Metrics:
Impressions: {{{metrics.impressions}}}
Clicks: {{{metrics.clicks}}}
Conversions: {{{metrics.conversions}}}
Cost: {{{metrics.cost}}}
Suggestions: {{{suggestions}}}

Based on this data, provide specific, actionable suggestions for adjusting the campaign's targeting, bidding strategy, and creative elements to maximize ROI and minimize wasted ad spend. Also, provide a confidence score between 0 and 1 that represents how confident you are that your suggested adjustments will improve the campaign's ROI.

Format your response as:
Suggested Adjustments: [your suggested adjustments]
Confidence Score: [your confidence score]`,
});

const optimizeCampaignPerformanceFlow = ai.defineFlow(
  {
    name: 'optimizeCampaignPerformanceFlow',
    inputSchema: OptimizeCampaignPerformanceInputSchema,
    outputSchema: OptimizeCampaignPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
