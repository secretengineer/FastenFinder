import { config } from 'dotenv';
config();

import '@/ai/flows/identify-hardware-from-video.ts';
import '@/ai/flows/generate-sorting-instruction.ts';
import '@/ai/flows/summarize-sorting-log.ts';