'use server';

/**
 * @fileOverview A flow for generating real-time sorting instructions for a mechanical sorting robot.
 *
 * - generateSortingInstruction - A function that generates sorting instructions based on identified hardware.
 * - GenerateSortingInstructionInput - The input type for the generateSortingInstruction function.
 * - GenerateSortingInstructionOutput - The return type for the generateSortingInstruction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSortingInstructionInputSchema = z.object({
  hardwareType: z.string().describe('The identified type of hardware (e.g., screw, bolt, washer).'),
  hardwareDetails: z.string().describe('Detailed specifications of the hardware, including dimensions and other relevant features.'),
  imageUri: z.string().describe("A photo of the hardware, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateSortingInstructionInput = z.infer<typeof GenerateSortingInstructionInputSchema>;

const GenerateSortingInstructionOutputSchema = z.object({
  binAssignment: z.string().describe('The designated bin for the identified hardware.'),
  sortingInstruction: z.string().describe('Specific instructions for the robot to move the hardware to the assigned bin.'),
});
export type GenerateSortingInstructionOutput = z.infer<typeof GenerateSortingInstructionOutputSchema>;

export async function generateSortingInstruction(input: GenerateSortingInstructionInput): Promise<GenerateSortingInstructionOutput> {
  return generateSortingInstructionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSortingInstructionPrompt',
  input: {schema: GenerateSortingInstructionInputSchema},
  output: {schema: GenerateSortingInstructionOutputSchema},
  prompt: `You are an AI system that generates instructions for mechanical robot responsible for sorting hardware into bins. Based on the identified hardware and its specifications, determine the appropriate bin and provide clear instructions for the robot. 

  Hardware Type: {{{hardwareType}}}
  Hardware Details: {{{hardwareDetails}}}
  Hardware Image: {{media url=imageUri}}

  Consider the bin assignments are preconfigured. Just select the best bin.
  The outputted bin assignment should be the exact name of the bin and the robot instruction should reference that bin assignment.
  `, 
});

const generateSortingInstructionFlow = ai.defineFlow(
  {
    name: 'generateSortingInstructionFlow',
    inputSchema: GenerateSortingInstructionInputSchema,
    outputSchema: GenerateSortingInstructionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
