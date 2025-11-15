import type { ImagePlaceholder } from './placeholder-images';

export type HardwareItem = ImagePlaceholder;

export type SortingLogEntry = {
  timestamp: string;
  hardwareType: string;
  binAssignment: string;
  confidence: number;
  imageUrl: string;
};

export type Inventory = {
  [key: string]: number;
};
