"use client"

import { useState } from "react"
import { Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const TEMPLATE_URL =
  "https://github.com/HappyHackingSpace/HackerTaboo/issues/new"

export function SuggestCardDialog() {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [tabooWords, setTabooWords] = useState("")
  const [category, setCategory] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("English")
  const [destinationLanguage, setDestinationLanguage] = useState("English")
  const [description, setDescription] = useState("")

  const canSubmit = keyword.trim() !== "" && tabooWords.trim() !== ""

  const handleSubmit = () => {
    const params = new URLSearchParams({
      template: "new_taboo_card.yaml",
      title: `[New Card] ${keyword.trim()}`,
      keyword: keyword.trim(),
      taboo_words: tabooWords.trim(),
      category: category.trim(),
      source_language: sourceLanguage.trim(),
      destination_language: destinationLanguage.trim(),
      description: description.trim(),
    })
    window.open(`${TEMPLATE_URL}?${params.toString()}`, "_blank", "noopener")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Lightbulb className="mr-2 h-4 w-4" />
          Suggest a Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Suggest a new Taboo card</DialogTitle>
          <DialogDescription>
            This opens a prefilled GitHub issue in the{" "}
            <a
              href="https://github.com/HappyHackingSpace/HackerTaboo"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              HackerTaboo
            </a>{" "}
            repository — submit it there and the card joins the deck after
            review.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="suggest-keyword">Keyword *</Label>
            <Input
              id="suggest-keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. Firewall"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="suggest-taboo">Taboo words (5, comma separated) *</Label>
            <Input
              id="suggest-taboo"
              value={tabooWords}
              onChange={(e) => setTabooWords(e.target.value)}
              placeholder="security, network, block, filter, protection"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="suggest-category">Category</Label>
            <Input
              id="suggest-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Cybersecurity"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="suggest-source">Source language</Label>
              <Input
                id="suggest-source"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="suggest-destination">Destination language</Label>
              <Input
                id="suggest-destination"
                value={destinationLanguage}
                onChange={(e) => setDestinationLanguage(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="suggest-description">
              Description (without using the taboo words)
            </Label>
            <Textarea
              id="suggest-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Open prefilled GitHub issue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
