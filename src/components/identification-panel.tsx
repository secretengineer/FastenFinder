'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Bolt, Circle, Construction, HelpCircle, Hammer, Info, Bot } from 'lucide-react';

interface IdentificationPanelProps {
  identificationResult: any | null;
  sortingInstruction: any | null;
  isLoading: boolean;
}

const hardwareIcons: { [key: string]: React.ElementType } = {
  screw: Construction,
  bolt: Bolt,
  washer: Circle,
  nail: Hammer,
  unidentified: HelpCircle,
};

function getConfidenceColor(confidence: number): string {
  if (confidence > 0.9) return 'bg-green-500';
  if (confidence > 0.7) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function IdentificationPanel({ identificationResult, sortingInstruction, isLoading }: IdentificationPanelProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-8 w-2/3" />
          </div>
        </div>
      );
    }

    if (!identificationResult || !sortingInstruction) {
      return (
        <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-muted-foreground">
          <Info className="h-12 w-12 mb-4" />
          <p className="font-medium">Awaiting Item</p>
          <p className="text-sm">Scan an item to see identification results.</p>
        </div>
      );
    }
    
    const { hardwareType, confidence } = identificationResult;
    const { binAssignment, sortingInstruction: instructionText } = sortingInstruction;
    const Icon = hardwareIcons[hardwareType] || HelpCircle;

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Identified Hardware</h3>
          <div className="flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            <p className="text-2xl font-semibold capitalize">{hardwareType}</p>
          </div>
        </div>

        <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Confidence Score</h3>
            <div className="flex items-center gap-3">
                <div className="w-full bg-muted rounded-full h-2.5">
                    <div className={getConfidenceColor(confidence)} style={{ width: `${confidence * 100}%`, height: '100%', borderRadius: 'inherit' }}></div>
                </div>
                <span className="font-semibold text-lg">{Math.round(confidence * 100)}%</span>
            </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Assigned Bin</h3>
          <Badge variant="secondary" className="text-base">{binAssignment}</Badge>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Robot Instruction</h3>
          <div className="flex items-start gap-2 text-primary">
            <Bot className="h-5 w-5 mt-0.5 shrink-0"/>
            <p className="font-medium">{instructionText}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Identification & Sorting</CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
