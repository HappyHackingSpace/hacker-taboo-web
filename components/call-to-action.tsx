"use client"

import { Button } from "@/components/ui/button"
import { Github, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export function CallToAction() {
  const [isSharing, setIsSharing] = useState(false)

  // Function to handle smooth scrolling to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Function to copy to clipboard with proper error handling
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "The game link has been copied to your clipboard.",
      })
      return true
    } catch (error) {
      console.error("Clipboard copy failed:", error)
      toast({
        title: "Copy failed",
        description: "Could not copy the link to clipboard. Your browser may not support this feature.",
        variant: "destructive",
      })
      return false
    }
  }

  // Function to handle sharing
  const handleShare = async () => {
    // Only proceed if not already sharing
    if (isSharing) return

    setIsSharing(true)

    try {
      // Check if Web Share API is available and the context is secure (https)
      if (navigator.share && window.isSecureContext) {
        try {
          await navigator.share({
            title: "Hacker Taboo",
            text: "Check out this awesome word-guessing game for hackers and tech enthusiasts!",
            url: window.location.href,
          })
          toast({
            title: "Shared successfully!",
            description: "Thanks for sharing Hacker Taboo.",
          })
        } catch (shareError) {
          console.error("Share error:", shareError)

          // If permission denied or other share error, fall back to clipboard
          if (
            shareError.name === "NotAllowedError" ||
            (typeof shareError === "string" && shareError.includes("Permission denied"))
          ) {
            toast({
              title: "Sharing not allowed",
              description: "We'll copy the link to your clipboard instead.",
            })
            await copyToClipboard()
          } else {
            // For other share errors, also fall back to clipboard
            await copyToClipboard()
          }
        }
      } else {
        // Web Share API not available, use clipboard directly
        await copyToClipboard()
      }
    } catch (error) {
      console.error("Overall sharing process failed:", error)
      toast({
        title: "Sharing failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Play Hacker Taboo?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Generate your custom cards, print them out, and start playing with your tech-savvy friends. Perfect for
          hackathons, tech meetups, or just a fun night in!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => scrollToSection("card-generator")}>
            Generate Cards Now
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/HappyHackingSpace/HackerTaboo" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
          <Button size="lg" variant="secondary" onClick={handleShare} disabled={isSharing}>
            {isSharing ? (
              <>Loading...</>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}

