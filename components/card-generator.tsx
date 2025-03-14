"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Printer, RefreshCw } from "lucide-react"
import { CardPreview } from "@/components/card-preview"
import { fetchCardData } from "@/lib/fetch-card-data"

type CardData = {
  keyword: string
  category: string
  taboo_words: string[]
  source_language: string
  destination_language: string
  description: string
}

export function CardGenerator() {
  const [category, setCategory] = useState<string>("All")
  const [sourceLanguage, setSourceLanguage] = useState<string>("All")
  const [destinationLanguage, setDestinationLanguage] = useState<string>("All")
  const [cardCount, setCardCount] = useState<number>(5)
  const [allCards, setAllCards] = useState<CardData[]>([])
  const [filteredCards, setFilteredCards] = useState<CardData[]>([])
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [sourceLanguages, setSourceLanguages] = useState<string[]>([])
  const [destinationLanguages, setDestinationLanguages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Reference to the printable cards container
  const printableCardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCardData()
        setAllCards(data.keywords)

        // Extract unique categories and languages
        const uniqueCategories = Array.from(new Set(data.keywords.map((card) => card.category)))
        const uniqueSourceLangs = Array.from(new Set(data.keywords.map((card) => card.source_language)))
        const uniqueDestLangs = Array.from(new Set(data.keywords.map((card) => card.destination_language)))

        setCategories(uniqueCategories)
        setSourceLanguages(uniqueSourceLangs)
        setDestinationLanguages(uniqueDestLangs)

        setFilteredCards(data.keywords)
        generateRandomCards(data.keywords, cardCount)
      } catch (error) {
        console.error("Failed to fetch card data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    let filtered = [...allCards]

    if (category !== "All") {
      filtered = filtered.filter((card) => card.category === category)
    }

    if (sourceLanguage !== "All") {
      filtered = filtered.filter((card) => card.source_language === sourceLanguage)
    }

    if (destinationLanguage !== "All") {
      filtered = filtered.filter((card) => card.destination_language === destinationLanguage)
    }

    setFilteredCards(filtered)
    generateRandomCards(filtered, cardCount)
  }, [category, sourceLanguage, destinationLanguage, cardCount, allCards])

  const generateRandomCards = (cards: CardData[], count: number) => {
    if (cards.length === 0) {
      setSelectedCards([])
      return
    }

    const shuffled = [...cards].sort(() => 0.5 - Math.random())
    setSelectedCards(shuffled.slice(0, Math.min(count, shuffled.length)))
  }

  const handleRegenerateCards = () => {
    generateRandomCards(filteredCards, cardCount)
  }

  const handlePrint = () => {
    // Create a print-specific stylesheet
    const printStyle = `
      @page {
        size: portrait;
        margin: 1cm;
      }
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        margin: 0;
        padding: 0;
      }
      .print-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
      .card {
        border: 2px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        page-break-inside: avoid;
        margin-bottom: 20px;
        background-color: white;
      }
      .card-header {
        border-bottom: 2px solid #3b82f6;
        padding: 16px;
      }
      .card-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin: 0;
      }
      .card-subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #666;
        margin-top: 4px;
      }
      .card-content {
        padding: 16px;
      }
      .taboo-label {
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: #e11d48;
        margin-bottom: 12px;
      }
      .taboo-words {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      .taboo-word {
        background-color: #f3f4f6;
        padding: 4px;
        border-radius: 4px;
        text-align: center;
        font-size: 14px;
      }
      .card-description {
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid #ddd;
        font-size: 12px;
        font-style: italic;
        color: #666;
      }
    `

    // Generate HTML for each card
    const cardsHTML = selectedCards
      .map(
        (card) => `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${card.keyword}</h3>
          <div class="card-subtitle">
            <span>${card.category}</span>
            <span>${card.source_language} → ${card.destination_language}</span>
          </div>
        </div>
        <div class="card-content">
          <p class="taboo-label">DON'T SAY:</p>
          <div class="taboo-words">
            ${card.taboo_words
              .map(
                (word) => `
              <div class="taboo-word">${word}</div>
            `,
              )
              .join("")}
          </div>
          ${
            card.description
              ? `
            <div class="card-description">
              <p>${card.description}</p>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `,
      )
      .join("")

    // Create a new window for printing
    const printWindow = window.open("", "_blank")

    if (!printWindow) {
      alert("Please allow pop-ups to print cards")
      return
    }

    // Write the print-only HTML to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hacker Taboo Cards</title>
          <style>${printStyle}</style>
        </head>
        <body>
          <div class="print-container">
            ${cardsHTML}
          </div>
          <script>
            // Auto-print when loaded
            window.onload = function() {
              setTimeout(() => {
                window.print();
                setTimeout(() => window.close(), 500);
              }, 500);
            };
          </script>
        </body>
      </html>
    `)

    printWindow.document.close()
  }

  return (
    <section id="card-generator" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Generate Your Hacker Taboo Cards</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Customize your game experience by selecting categories, languages, and the number of cards you want to play
            with.
          </p>
        </div>

        <Card className="mb-10">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-language">Source Language</Label>
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger id="source-language">
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Languages</SelectItem>
                    {sourceLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination-language">Destination Language</Label>
                <Select value={destinationLanguage} onValueChange={setDestinationLanguage}>
                  <SelectTrigger id="destination-language">
                    <SelectValue placeholder="Select destination language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Languages</SelectItem>
                    {destinationLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-count">Number of Cards: {cardCount}</Label>
                <Slider
                  id="card-count"
                  min={1}
                  max={20}
                  step={1}
                  value={[cardCount]}
                  onValueChange={(value) => setCardCount(value[0])}
                  className="py-4"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <Button onClick={handleRegenerateCards} disabled={isLoading}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate Cards
              </Button>
              <Button onClick={handlePrint} disabled={selectedCards.length === 0 || isLoading}>
                <Printer className="mr-2 h-4 w-4" />
                Print Cards
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : selectedCards.length > 0 ? (
          <div
            ref={printableCardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 printable-cards-container"
          >
            {selectedCards.map((card, index) => (
              <CardPreview key={index} card={card} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No cards match your current filters. Try adjusting your selections.</p>
          </div>
        )}
      </div>
    </section>
  )
}

