import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
          <Logo className="h-8 w-8 text-primary" />
          <span>AdGenius</span>
        </Link>
        <Button asChild>
          <a href="#">Request a Consultation</a>
        </Button>
      </div>
    </header>
  );
}
