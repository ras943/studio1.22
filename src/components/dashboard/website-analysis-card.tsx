import { analyzeWebsiteContent } from '@/ai/flows/analyze-website-content';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Tags, Sparkles } from 'lucide-react';

export default async function WebsiteAnalysisCard({ url }: { url: string }) {
  const analysis = await analyzeWebsiteContent({ websiteUrl: url });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Website Analysis
        </CardTitle>
        <CardDescription>Key insights extracted from your site.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-sm mb-1">{analysis.title}</h3>
          <p className="text-sm text-muted-foreground">{analysis.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Tags className="h-4 w-4 text-primary" />
            Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary">{keyword}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Branding Elements
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.brandingElements.map((element) => (
              <Badge key={element} variant="outline">{element}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WebsiteAnalysisSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Website Analysis
        </CardTitle>
        <CardDescription>Key insights extracted from your site.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-1" />
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Tags className="h-4 w-4 text-primary" />
            Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Branding Elements
          </h4>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
