'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SortingLogEntry } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SortingLogProps {
  sortingLog: SortingLogEntry[];
}

export function SortingLog({ sortingLog }: SortingLogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sorting Log</CardTitle>
        <CardDescription>A real-time log of all sorting activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Preview</TableHead>
                <TableHead>Hardware Type</TableHead>
                <TableHead>Bin</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortingLog.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No sorting activity yet. Start the system to see logs.
                  </TableCell>
                </TableRow>
              )}
              {sortingLog.map((entry) => (
                <TableRow key={entry.timestamp}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <Image
                        src={entry.imageUrl}
                        alt={entry.hardwareType}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium capitalize">{entry.hardwareType}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{entry.binAssignment}</Badge>
                  </TableCell>
                  <TableCell>{(entry.confidence * 100).toFixed(0)}%</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
