import { PhomojiLanding } from "@/components/phomoji/PhomojiLanding";
import { LampDemo } from "@/components/ui/lamp";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-col bg-background text-foreground md:min-h-screen">
      <PhomojiLanding />

      <section id="lamp" aria-label="Lamp effect" className="w-full scroll-mt-0">
        <LampDemo variant="section" />
      </section>
    </div>
  );
}
