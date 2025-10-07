'use server';

/**
 * @fileOverview This flow analyzes website content to extract relevant information, keywords, and branding elements.
 *
 * - analyzeWebsiteContent - A function that handles the website content analysis process.
 * - AnalyzeWebsiteContentInput - The input type for the analyzeWebsiteContent function.
 * - AnalyzeWebsiteContentOutput - The return type for the analyzeWebsiteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeWebsiteContentInputSchema = z.object({
  websiteUrl: z.string().describe('The URL of the website to analyze.'),
});
export type AnalyzeWebsiteContentInput = z.infer<typeof AnalyzeWebsiteContentInputSchema>;

const AnalyzeWebsiteContentOutputSchema = z.object({
  title: z.string().describe('The title of the website.'),
  description: z.string().describe('A concise description of the website content.'),
  keywords: z.array(z.string()).describe('Relevant keywords extracted from the website content.'),
  brandingElements: z.array(z.string()).describe('Key branding elements identified on the website.'),
});
export type AnalyzeWebsiteContentOutput = z.infer<typeof AnalyzeWebsiteContentOutputSchema>;

export async function analyzeWebsiteContent(input: AnalyzeWebsiteContentInput): Promise<AnalyzeWebsiteContentOutput> {
  return analyzeWebsiteContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeWebsiteContentPrompt',
  input: {schema: AnalyzeWebsiteContentInputSchema},
  output: {schema: AnalyzeWebsiteContentOutputSchema},
  prompt: `You are an expert in website analysis and content extraction for advertising purposes.

  Analyze the content of the following website to extract relevant information, keywords, and branding elements that can be used to create effective ad campaigns. Return the title, description, keywords, and branding elements in the proper schema format. 

  Website URL: {{{websiteUrl}}}

  Consider the website's overall theme, products/services offered, target audience, and key selling points when extracting the information. Focus on identifying elements that would resonate with potential customers and drive conversions.
  `,
});

const analyzeWebsiteContentFlow = ai.defineFlow(
  {
    name: 'analyzeWebsiteContentFlow',
    inputSchema: AnalyzeWebsiteContentInputSchema,
    outputSchema: AnalyzeWebsiteContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
