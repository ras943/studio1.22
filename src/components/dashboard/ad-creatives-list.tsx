import Image from 'next/image';
import { generateAdCreative } from '@/ai/flows/generate-ad-creative';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Megaphone } from 'lucide-react';
import { Button } from '../ui/button';

export default async function AdCreativesList({ url }: { url: string }) {
  const { adCreatives } = await generateAdCreative({ websiteUrl: url });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-primary" />
          Generated Ad Creatives
        </CardTitle>
        <CardDescription>AI-generated ads ready to launch.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {adCreatives.map((creative, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1">
                 {creative.imageUrl && (
                    <div className="relative aspect-video w-full">
                        <Image
                            src={creative.imageUrl}
                            alt={creative.headline}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
              </div>
              <div className="p-4 md:col-span-2">
                <h4 className="font-semibold">{creative.headline}</h4>
                <p className="text-sm text-muted-foreground mt-1">{creative.description}</p>
                <Button variant="secondary" size="sm" className="mt-4">Launch Ad</Button>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}


export function AdCreativesSkeleton() {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            Generated Ad Creatives
          </Title>
          <CardDescription>AI-generated ads ready to launch.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-1">
                        <Skeleton className="aspect-video w-full" />
                    </div>
                    <div className="p-4 md:col-span-2">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6 mt-1" />
                        <Skeleton className="h-9 w-24 mt-4" />
                    </div>
                </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
}
