import { Suspense } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import WebsiteAnalysisCard, { WebsiteAnalysisSkeleton } from '@/components/dashboard/website-analysis-card';
import AdCreativesList, { AdCreativesSkeleton } from '@/components/dashboard/ad-creatives-list';
import CampaignOptimizationCard from '@/components/dashboard/campaign-optimization-card';

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { url?: string };
}) {
  const url = searchParams.url || '';

  if (!url) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>No URL provided. Please go back and enter a website URL.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-6">
          AI Analysis Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Suspense fallback={<WebsiteAnalysisSkeleton />}>
              <WebsiteAnalysisCard url={url} />
            </Suspense>
            <CampaignOptimizationCard url={url} />
          </div>
          <div className="lg:col-span-2">
             <Suspense fallback={<AdCreativesSkeleton />}>
              <AdCreativesList url={url} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
