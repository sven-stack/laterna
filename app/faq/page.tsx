import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Laterna?",
      answer: "Laterna is my personal collection of beautiful lanterns I've encountered during my travels around the world. It's a celebration of light, atmosphere, and the unique charm that lanterns bring to different cultures and places."
    },
    {
      question: "Why lanterns?",
      answer: "I've always been fascinated by the warm, magical glow of lanterns. They transform spaces, create atmosphere, and tell stories without words. Each lantern has its own character—whether it's a traditional paper lantern at a festival, an ornate metal lantern in a narrow alley, or a simple glowing light in the darkness."
    },
    {
      question: "Where are these photos from?",
      answer: "The lanterns in this collection come from my journeys across the globe—from bustling night markets in Asia to quiet European streets, from desert oases to coastal towns. Each photo has location information that shows exactly where that particular lantern was found."
    },
    {
      question: "Can I use these photos?",
      answer: "These photos are my personal collection and are shared here for appreciation and inspiration. If you'd like to use any of the images, please reach out to discuss permissions."
    },
    {
      question: "How often do you add new lanterns?",
      answer: "I add new lanterns whenever I discover particularly special ones during my travels. There's no fixed schedule—each addition is based on finding something truly remarkable that I want to share."
    },
    {
      question: "What makes a lantern 'cool' enough to feature?",
      answer: "Great question! For me, it's about the atmosphere it creates, its unique design, the story behind it, or simply the way it makes me feel. Sometimes it's the intricate craftsmanship, other times it's the context—a simple lantern in the perfect setting can be just as captivating as an elaborate one."
    },
    {
      question: "Can I suggest a lantern location?",
      answer: "Absolutely! If you know of an amazing lantern spot, I'd love to hear about it. While I can't promise I'll make it there immediately, I'm always adding new destinations to my travel list based on recommendations."
    },
    {
      question: "Is there a story behind the name 'Laterna'?",
      answer: "Laterna is derived from the Latin word for lantern. It felt like the perfect name—simple, elegant, and internationally understood, just like the universal appeal of lanterns themselves."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-lantern-amber via-lantern-gold to-lantern-glow bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-300">
          Everything you need to know about Laterna
        </p>
      </section>

      {/* FAQ Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-lantern-navy/50 border border-lantern-amber/20 rounded-xl p-8 hover:border-lantern-amber/40 transition-all"
            >
              <h2 className="text-2xl font-bold text-lantern-gold mb-4 flex items-start gap-3">
                <span className="text-lantern-amber">Q:</span>
                {faq.question}
              </h2>
              <div className="pl-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  <span className="text-lantern-gold font-semibold mr-2">A:</span>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-lantern-navy/50 border border-lantern-amber/20 rounded-2xl p-12 lantern-glow">
            <h2 className="text-3xl font-bold text-lantern-gold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Feel free to explore the gallery and discover the magic of lanterns from around the world
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/gallery"
                className="px-8 py-4 bg-lantern-amber hover:bg-lantern-gold text-lantern-dark font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Explore Gallery
              </Link>
              <Link
                href="/random"
                className="px-8 py-4 bg-lantern-navy hover:bg-lantern-navy/70 border-2 border-lantern-amber text-lantern-gold font-bold rounded-xl transition-all"
              >
                Random Lantern
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-lantern-amber/20 bg-lantern-dark/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Laterna by Sven. Made with ✨ and 🏮</p>
        </div>
      </footer>
    </div>
  );
}
