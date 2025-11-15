'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bot } from 'lucide-react';

interface InventoryTrackerProps {
  inventoryData: { name: string; value: number }[];
}

const chartConfig = {
  value: {
    label: 'Count',
    color: 'hsl(var(--primary))',
  },
};

export function InventoryTracker({ inventoryData }: InventoryTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Tracker</CardTitle>
        <CardDescription>Total counts of each hardware type sorted.</CardDescription>
      </CardHeader>
      <CardContent>
        {inventoryData.length === 0 ? (
           <div className="flex h-[350px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed text-center text-muted-foreground">
            <Bot className="h-16 w-16 mb-4" />
            <p className="font-medium">No Inventory Data</p>
            <p className="text-sm">Sorted items will appear here.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart accessibilityLayer data={inventoryData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 10) + (value.length > 10 ? '...' : '')}
                className="capitalize"
              />
              <YAxis allowDecimals={false}/>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
