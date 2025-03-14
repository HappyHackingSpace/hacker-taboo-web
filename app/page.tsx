import { HeroSection } from "@/components/hero-section"
import { CardGenerator } from "@/components/card-generator"
import { GameOverview } from "@/components/game-overview"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <HeroSection />
      <GameOverview />
      <CardGenerator />
      <CallToAction />
      <Footer />
    </div>
  )
}

