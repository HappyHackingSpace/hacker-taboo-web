import { Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hacker Taboo. All rights reserved.
          </p>
          <p className="text-sm flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" /> in Diyarbakir by{" "}
            <Link
              href="https://happyhacking.space"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium hover:underline"
            >
              the Busra Alpay @ Happy Hacking Space
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

