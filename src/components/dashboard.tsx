'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import type { SortingLogEntry, Inventory, HardwareItem } from '@/lib/types';
import { identifyHardwareFromVideo } from '@/ai/flows/identify-hardware-from-video';
import { generateSortingInstruction } from '@/ai/flows/generate-sorting-instruction';
import { getImageDataUri } from '@/app/actions';

import { VideoFeed } from './video-feed';
import { IdentificationPanel } from './identification-panel';
import { SortingLog } from './sorting-log';
import { InventoryTracker } from './inventory-tracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Dashboard() {
  const { toast } = useToast();
  const [isSorting, setIsSorting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<HardwareItem | null>(null);
  const [identificationResult, setIdentificationResult] = useState<any | null>(null);
  const [sortingInstruction, setSortingInstruction] = useState<any | null>(null);
  const [inventory, setInventory] = useState<Inventory>({});
  const [sortingLog, setSortingLog] = useState<SortingLogEntry[]>([]);
  const [progress, setProgress] = useState(0);

  const processItem = useCallback(
    async (item: HardwareItem) => {
      setIsLoading(true);
      setProgress(0);
      setIdentificationResult(null);
      setSortingInstruction(null);

      try {
        const imageDataUri = await getImageDataUri(item.imageUrl);
        setProgress(30);

        const idResult = await identifyHardwareFromVideo({ videoFrameDataUri: imageDataUri });
        setIdentificationResult(idResult);
        setProgress(70);

        // Use a placeholder for hardwareDetails as the AI flow can infer from the image.
        const instructionResult = await generateSortingInstruction({
          hardwareType: idResult.hardwareType,
          hardwareDetails: item.description,
          imageUri: imageDataUri,
        });
        setSortingInstruction(instructionResult);

        const logEntry: SortingLogEntry = {
          timestamp: new Date().toISOString(),
          hardwareType: idResult.hardwareType,
          binAssignment: instructionResult.binAssignment,
          confidence: idResult.confidence,
          imageUrl: item.imageUrl,
        };

        setSortingLog((prevLog) => [logEntry, ...prevLog].slice(0, 50));

        setInventory((prevInventory) => {
          const type = idResult.hardwareType || 'unidentified';
          return {
            ...prevInventory,
            [type]: (prevInventory[type] || 0) + 1,
          };
        });

        setProgress(100);
      } catch (error) {
        console.error('Error processing item:', error);
        toast({
          variant: 'destructive',
          title: 'Processing Error',
          description: 'Failed to identify or sort the hardware.',
        });
        setProgress(0);
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (!isSorting) {
      if (currentItem) {
        // Clear current item when stopping
        setCurrentItem(null);
        setIdentificationResult(null);
        setSortingInstruction(null);
        setProgress(0);
      }
      return;
    }

    const processNextItem = () => {
      const randomIndex = Math.floor(Math.random() * PlaceHolderImages.length);
      const nextItem = PlaceHolderImages[randomIndex];
      setCurrentItem(nextItem);
      processItem(nextItem);
    };

    // Immediately process the first item
    processNextItem();

    // Then set up an interval for subsequent items
    const interval = setInterval(processNextItem, 7000); // Process a new item every 7 seconds

    return () => clearInterval(interval);
  }, [isSorting, processItem]);

  const toggleSorting = () => {
    setIsSorting((prev) => !prev);
  };
  
  const inventoryData = useMemo(() => {
    return Object.entries(inventory)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [inventory]);

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <VideoFeed
            isSorting={isSorting}
            toggleSorting={toggleSorting}
            currentItem={currentItem}
            isLoading={isLoading}
            progress={progress}
          />
        </div>
        <div className="lg:col-span-2">
          <IdentificationPanel
            identificationResult={identificationResult}
            sortingInstruction={sortingInstruction}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-5">
          <Tabs defaultValue="log">
            <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
              <TabsTrigger value="log">Sorting Log</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            <TabsContent value="log">
              <SortingLog sortingLog={sortingLog} />
            </TabsContent>
            <TabsContent value="inventory">
              <InventoryTracker inventoryData={inventoryData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
