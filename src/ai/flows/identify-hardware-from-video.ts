'use server';

/**
 * @fileOverview Identifies hardware from a video feed and provides sorting instructions.
 *
 * - identifyHardwareFromVideo - A function that identifies hardware from a video feed.
 * - IdentifyHardwareFromVideoInput - The input type for the identifyHardwareFromVideo function.
 * - IdentifyHardwareFromVideoOutput - The return type for the identifyHardwareFromVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyHardwareFromVideoInputSchema = z.object({
  videoFrameDataUri: z
    .string()
    .describe(
      "A single frame from the video feed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyHardwareFromVideoInput = z.infer<
  typeof IdentifyHardwareFromVideoInputSchema
>;

const IdentifyHardwareFromVideoOutputSchema = z.object({
  hardwareType: z.string().describe('The identified type of hardware.'),
  containerAssignment: z
    .string()
    .describe('The container to which the hardware should be assigned.'),
  confidence: z
    .number()
    .describe('The confidence level of the identification (0-1).'),
});
export type IdentifyHardwareFromVideoOutput = z.infer<
  typeof IdentifyHardwareFromVideoOutputSchema
>;

export async function identifyHardwareFromVideo(
  input: IdentifyHardwareFromVideoInput
): Promise<IdentifyHardwareFromVideoOutput> {
  return identifyHardwareFromVideoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyHardwareFromVideoPrompt',
  input: {schema: IdentifyHardwareFromVideoInputSchema},
  output: {schema: IdentifyHardwareFromVideoOutputSchema},
  prompt: `You are an AI-powered hardware identification system. You are connected to a mechanical sorting robot.

You will receive a single frame from a video feed of hardware passing through the system. You must identify the type of hardware in the image and provide instructions for the sorting robot.

Analyze the following video frame to determine the hardware type and its appropriate container assignment.

Video Frame: {{media url=videoFrameDataUri}}

Based on the image, identify the hardware type (e.g., screw, bolt, washer) and provide a container assignment (e.g., screws_container_1, bolts_container_3). Also, give the confidence level of the identification. If you are not able to identify the object, set the hardware type to "unidentified" and container assignment to "random_bin".

Please provide the response in JSON format.
`,
});

const identifyHardwareFromVideoFlow = ai.defineFlow(
  {
    name: 'identifyHardwareFromVideoFlow',
    inputSchema: IdentifyHardwareFromVideoInputSchema,
    outputSchema: IdentifyHardwareFromVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
