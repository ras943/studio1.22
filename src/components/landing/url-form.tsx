"use client";

import { useFormState, useFormStatus } from "react-dom";
import { startAnalysis } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          Start Analysis
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function UrlForm() {
  const [state, formAction] = useFormState(startAnalysis, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);


  return (
    <form action={formAction} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="url"
        name="websiteUrl"
        placeholder="https://your-website.com"
        required
        className="flex-grow text-base"
      />
      <SubmitButton />
    </form>
  );
}
