'use server';

/**
 * @fileOverview Summarizes the sorting log for quality control.
 *
 * - summarizeSortingLog - A function that summarizes the sorting log.
 * - SummarizeSortingLogInput - The input type for the summarizeSortingLog function.
 * - SummarizeSortingLogOutput - The return type for the summarizeSortingLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSortingLogInputSchema = z.object({
  sortingLog: z
    .string()
    .describe('The complete sorting log as a single string.'),
});
export type SummarizeSortingLogInput = z.infer<typeof SummarizeSortingLogInputSchema>;

const SummarizeSortingLogOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the sorting log.'),
});
export type SummarizeSortingLogOutput = z.infer<typeof SummarizeSortingLogOutputSchema>;

export async function summarizeSortingLog(input: SummarizeSortingLogInput): Promise<SummarizeSortingLogOutput> {
  return summarizeSortingLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSortingLogPrompt',
  input: {schema: SummarizeSortingLogInputSchema},
  output: {schema: SummarizeSortingLogOutputSchema},
  prompt: `You are an expert quality control engineer.  You are reviewing a log
  from a mechanical sorting robot that sorts hardware components.  Your job is to
  summarize the log and provide a high-level overview of the operation, so
  that any potential issues can be easily identified.

  Here is the sorting log:
  {{sortingLog}}`,
});

const summarizeSortingLogFlow = ai.defineFlow(
  {
    name: 'summarizeSortingLogFlow',
    inputSchema: SummarizeSortingLogInputSchema,
    outputSchema: SummarizeSortingLogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
