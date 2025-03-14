type CardProps = {
  card: {
    keyword: string
    category: string
    taboo_words: string[]
    source_language: string
    destination_language: string
    description: string
  }
}

export function CardPreview({ card }: CardProps) {
  return (
    <div className="border-2 border-border rounded-lg overflow-hidden shadow-lg bg-card print:break-inside-avoid">
      <div className="border-b-2 border-primary p-4">
        <h3 className="text-2xl font-bold text-center">{card.keyword}</h3>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{card.category}</span>
          <span>
            {card.source_language} → {card.destination_language}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm font-semibold text-center text-destructive">DON'T SAY:</p>
        <ul className="grid grid-cols-2 gap-2">
          {card.taboo_words.map((word, index) => (
            <li key={index} className="bg-muted p-1 rounded text-center text-sm">
              {word}
            </li>
          ))}
        </ul>
        {card.description && (
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground italic">{card.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

