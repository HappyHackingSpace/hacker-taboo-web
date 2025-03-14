import { Card, CardContent } from "@/components/ui/card"

export function GameOverview() {
  return (
    <section id="game-overview" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How Hacker Taboo Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A thrilling word-guessing game inspired by Taboo, but tailored for hackers, security enthusiasts, and tech
            lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">The Challenge</h3>
              <p className="text-muted-foreground">
                Describe the keyword without using any of the taboo words. It's harder than it sounds when all the
                obvious clues are off-limits!
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">The Setup</h3>
              <p className="text-muted-foreground">
                Form teams, grab the cards, and take turns being the clue-giver. Your teammates must guess the keyword
                before time runs out.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">The Twist</h3>
              <p className="text-muted-foreground">
                Our cards feature tech and hacking terminology across multiple languages, making this perfect for
                international tech conferences and meetups.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md transform rotate-3 shadow-lg">
              <CardContent className="p-6">
                <div className="border-b-2 border-primary pb-2 mb-4">
                  <h4 className="text-2xl font-bold text-center">FIREWALL</h4>
                  <p className="text-xs text-center text-muted-foreground">Cybersecurity</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-center text-destructive">DON'T SAY:</p>
                  <ul className="grid grid-cols-2 gap-2 text-center">
                    <li className="bg-muted p-1 rounded">security</li>
                    <li className="bg-muted p-1 rounded">network</li>
                    <li className="bg-muted p-1 rounded">block</li>
                    <li className="bg-muted p-1 rounded">filter</li>
                    <li className="bg-muted p-1 rounded">protection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

