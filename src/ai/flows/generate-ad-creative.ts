'use server';

/**
 * @fileOverview A flow for generating ad creatives (copy and visuals) based on website analysis.
 *
 * - generateAdCreative - A function that generates ad creatives based on a website URL.
 * - GenerateAdCreativeInput - The input type for the generateAdCreative function.
 * - GenerateAdCreativeOutput - The return type for the generateAdCreative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdCreativeInputSchema = z.object({
  websiteUrl: z.string().describe('The URL of the website to analyze.'),
});
export type GenerateAdCreativeInput = z.infer<typeof GenerateAdCreativeInputSchema>;

const AdCreativeSchema = z.object({
  headline: z.string().describe('A compelling headline for the ad.'),
  description: z.string().describe('A description for the ad.'),
  imageUrl: z.string().describe('A URL for an image to use in the ad, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
});

const GenerateAdCreativeOutputSchema = z.object({
  adCreatives: z.array(AdCreativeSchema).describe('An array of ad creative variations.'),
});
export type GenerateAdCreativeOutput = z.infer<typeof GenerateAdCreativeOutputSchema>;

export async function generateAdCreative(input: GenerateAdCreativeInput): Promise<GenerateAdCreativeOutput> {
  return generateAdCreativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdCreativePrompt',
  input: {schema: GenerateAdCreativeInputSchema},
  output: {schema: GenerateAdCreativeOutputSchema},
  prompt: `You are an AI-powered advertising expert. Your goal is to generate multiple variations of ad creatives (headlines, descriptions, and image suggestions) based on the content of a given website. The variations should be tailored to the target audience of the website, and designed to maximize click-through rate and conversions.

Analyze the following website to understand its business, products/services, and key selling points:

Website URL: {{{websiteUrl}}}

Generate at least 3 different ad creative variations, each including a headline, description, and a suggested image URL, encoded as a data URI.  The image should be thematically appropriate for the text. Use compelling and persuasive language to entice potential customers. Return the results as a JSON array.  Each image should be different and not be the same image.

Output the ad creatives in the following format:

{{ adCreatives: [
  {
   headline: string,
   description: string,
   imageUrl: string,
  },
  {
   headline: string,
   description: string,
   imageUrl: string,
  },
   {
   headline: string,
   description: string,
   imageUrl: string,
  }
 ]}}`,
});

const generateAdCreativeFlow = ai.defineFlow(
  {
    name: 'generateAdCreativeFlow',
    inputSchema: GenerateAdCreativeInputSchema,
    outputSchema: GenerateAdCreativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    // Ensure imageUrl are proper data URIs
    if (output?.adCreatives) {
      for (const creative of output.adCreatives) {
        if (creative.imageUrl && !creative.imageUrl.startsWith('data:')) {
          console.warn('Image URL does not appear to be a valid data URI; image generation may have failed.');
        }
      }
    }

    return output!;
  }
);
