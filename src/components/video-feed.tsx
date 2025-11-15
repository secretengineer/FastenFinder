'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Square, ScanLine } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { HardwareItem } from '@/lib/types';

interface VideoFeedProps {
  isSorting: boolean;
  toggleSorting: () => void;
  currentItem: HardwareItem | null;
  isLoading: boolean;
  progress: number;
}

export function VideoFeed({ isSorting, toggleSorting, currentItem, isLoading, progress }: VideoFeedProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Camera Feed</CardTitle>
        <Button onClick={toggleSorting} size="sm">
          {isSorting ? <Square className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isSorting ? 'Stop Sorting' : 'Start Sorting'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
          {currentItem && (
            <Image
              src={currentItem.imageUrl}
              alt={currentItem.description}
              fill
              className={`object-cover transition-all duration-500 ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'}`}
              data-ai-hint={currentItem.imageHint}
              priority
            />
          )}
          {!isSorting && !currentItem && (
             <div className="flex h-full w-full flex-col items-center justify-center text-center text-muted-foreground">
                <ScanLine className="h-16 w-16 mb-4" />
                <p className="font-medium">System Idle</p>
                <p className="text-sm">Press "Start Sorting" to begin.</p>
              </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
              <div className="w-24 h-24 relative mb-4">
                  <div className="absolute inset-0 border-4 border-primary/50 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin [animation-timing-function:linear]" style={{clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)'}}></div>
              </div>
              <p className="font-semibold">SCANNING...</p>
            </div>
          )}
        </div>
        <Progress value={progress} className="mt-4 h-2" />
      </CardContent>
    </Card>
  );
}
