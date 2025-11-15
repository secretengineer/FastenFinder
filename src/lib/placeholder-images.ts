import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  type: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
