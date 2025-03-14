export async function fetchCardData() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/HappyHackingSpace/HackerTaboo/main/cards.json")

    if (!response.ok) {
      throw new Error(`Failed to fetch card data: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching card data:", error)

    // Return sample data as fallback
    return {
      keywords: [
        {
          keyword: "Firewall",
          category: "Cybersecurity",
          taboo_words: ["security", "network", "block", "filter", "protection"],
          source_language: "English",
          destination_language: "Spanish",
          description:
            "A system that monitors and controls incoming and outgoing network traffic based on predefined security rules.",
        },
        {
          keyword: "SQL Injection",
          category: "Cybersecurity",
          taboo_words: ["database", "attack", "query", "input", "validation"],
          source_language: "English",
          destination_language: "English",
          description: "A code injection technique used to attack data-driven applications.",
        },
        {
          keyword: "Blockchain",
          category: "Cryptography",
          taboo_words: ["bitcoin", "ledger", "decentralized", "crypto", "transaction"],
          source_language: "English",
          destination_language: "English",
          description: "A distributed database that maintains a continuously growing list of records.",
        },
        {
          keyword: "Router",
          category: "Networking",
          taboo_words: ["network", "traffic", "packets", "forward", "IP"],
          source_language: "English",
          destination_language: "French",
          description: "A networking device that forwards data packets between computer networks.",
        },
        {
          keyword: "Phishing",
          category: "Cybersecurity",
          taboo_words: ["email", "scam", "fake", "credentials", "social engineering"],
          source_language: "English",
          destination_language: "German",
          description: "A technique for attempting to acquire sensitive data through deceptive means.",
        },
      ],
    }
  }
}

