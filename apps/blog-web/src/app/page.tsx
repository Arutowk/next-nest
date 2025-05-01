import Hero from '@/components/hero';
import OpenClose from '@/components/ui/OpenClose';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <div className="h-96 w-full bg-amber-200"></div>
    </main>
  );
}
