"use client";

import { useFormState, useFormStatus } from "react-dom";
import { runOptimization } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Lightbulb, BarChart, Percent, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const initialState = {
  success: false,
  data: null,
  message: null
};

function OptimizeButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Optimizing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Run AI Optimization
        </>
      )}
    </Button>
  );
}

const mockMetrics = {
    impressions: 15000,
    clicks: 300,
    conversions: 10,
    cost: 500,
};

export default function CampaignOptimizationCard({ url }: { url: string }) {
  const [state, formAction] = useFormState(runOptimization, initialState);
  const { toast } = useToast();
  
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (state.message) {
      toast({
        variant: "destructive",
        title: "Optimization Error",
        description: state.message,
      });
    }
    if(state.success && state.data?.confidenceScore) {
        // Animate progress bar
        const timer = setTimeout(() => setConfidence(state.data.confidenceScore * 100), 500);
        return () => clearTimeout(timer);
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Campaign Performance
        </CardTitle>
        <CardDescription>Monitor and optimize a sample campaign.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold">Impressions:</span> {mockMetrics.impressions.toLocaleString()}</div>
            <div><span className="font-semibold">Clicks:</span> {mockMetrics.clicks.toLocaleString()}</div>
            <div><span className="font-semibold">Conversions:</span> {mockMetrics.conversions.toLocaleString()}</div>
            <div><span className="font-semibold">Cost:</span> ${mockMetrics.cost.toLocaleString()}</div>
        </div>
        <form action={formAction}>
          <OptimizeButton />
        </form>

        {state.success && state.data && (
            <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    AI Suggestions
                </h4>
                <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                    {state.data.suggestedAdjustments}
                </p>
                <div>
                     <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Percent className="h-4 w-4 text-primary" />
                        Confidence Score
                    </h4>
                    <Progress value={confidence} className="w-full" />
                    <p className="text-right text-xs text-muted-foreground mt-1">{Math.round(confidence)}%</p>
                </div>
            </div>
        )}

      </CardContent>
    </Card>
  );
}
