import { LampDemo } from "@/components/ui/lamp";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero — первая секция */}
      <section
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-24 text-center"
        aria-label="Hero"
      >
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          phomoji · lamp-ui
        </p>
        <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Next.js + shadcn + Tailwind
        </h1>
        <p className="max-w-md text-pretty text-muted-foreground md:text-lg">
          Ниже — секция с эффектом Lamp (framer-motion), на одной странице с hero.
        </p>
      </section>

      {/* Lamp — вторая секция */}
      <section id="lamp" aria-label="Lamp effect" className="w-full scroll-mt-0">
        <LampDemo variant="section" />
      </section>
    </div>
  );
}
