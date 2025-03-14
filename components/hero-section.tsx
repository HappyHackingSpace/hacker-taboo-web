"use client"

import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  // Function to handle smooth scrolling to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-center mb-6">
            <Terminal className="h-12 w-12 text-primary" />
            <h1 className="ml-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Hacker Taboo</h1>
          </div>
          <p className="mt-6 text-xl text-muted-foreground md:text-2xl">
            Bringing Hackers Together, One Taboo Word at a Time!
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={() => scrollToSection("card-generator")}>
              Generate Cards
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("game-overview")}>
              Learn How to Play
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

