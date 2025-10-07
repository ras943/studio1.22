import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { UrlForm } from '@/components/landing/url-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'Jane Doe',
    title: 'Marketing Director, Creative Co.',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar-jane-doe'),
    logo: PlaceHolderImages.find(p => p.id === 'logo-creative-co'),
    quote: "AdGenius transformed our ad strategy. We saw a 40% increase in conversions within the first month. It's like having a full-time ads expert on our team.",
  },
  {
    name: 'John Smith',
    title: 'Founder, Digital Dreams',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar-john-smith'),
    logo: PlaceHolderImages.find(p => p.id === 'logo-digital-dreams'),
    quote: "The AI-powered optimization is a game-changer. It automatically reallocates our budget to winning ads, saving us thousands and boosting our ROI significantly.",
  },
];

const clientLogos = [
  PlaceHolderImages.find(p => p.id === 'logo-creative-co'),
  PlaceHolderImages.find(p => p.id === 'logo-digital-dreams'),
  PlaceHolderImages.find(p => p.id === 'logo-solution-inc'),
  PlaceHolderImages.find(p => p.id === 'logo-quantum-leap'),
].filter(Boolean);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary">
              Automate Your Google Ads with AI
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
              Stop guessing. Start growing. AdGenius analyzes your website, generates winning ad creatives, and optimizes your campaigns 24/7 to maximize ROI.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <UrlForm />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Enter your website to start your free analysis.
            </p>
          </div>
        </section>

        <section className="py-12 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-sm font-semibold text-muted-foreground tracking-wider uppercase">
              Trusted by leading enterprise businesses
            </h3>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {clientLogos.map((logo, index) => logo && (
                <div key={index} className="flex justify-center">
                  <Image
                    src={logo.imageUrl}
                    alt={logo.description}
                    width={140}
                    height={40}
                    data-ai-hint={logo.imageHint}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-center">
              What Our Customers Say
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex flex-col">
                  <CardContent className="pt-6 flex-1">
                    <p className="italic text-foreground/90">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardHeader className="flex flex-row items-center gap-4">
                    {testimonial.avatar && (
                      <Avatar>
                        <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
