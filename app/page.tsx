'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Sparkles } from 'lucide-react'
// import { ExternalLink } from '@/components/ExternalLink' // Declared the ExternalLink variable

const TechnicalEvents = [
  {
    title: 'PaperXpo',
    description: 'Showcase your research and innovative ideas in front of tech enthusiasts',
  },
  {
    title: 'Tech Escape',
    description: 'Compete in real-time coding challenges and prove your programming prowess',
  },
  {
    title: 'Error Auction',
    description: 'Find and fix bugs in complex code within the time limit',
  },
  {
    title: 'Web Architect',
    description: 'Display your semester projects and demonstrate live implementations',
  },
  {
    title: 'Prompt Olympia',
    description: 'Display your semester projects and demonstrate live implementations',
  },
]

const NonTechnicalEvents = [
  {
    title: 'Short Film',
    description: 'Test your knowledge of technology and computer science fundamentals',
  },
  {
    title: 'E-Sports(Free Fire)',
    description: 'Compete in popular gaming titles and win exciting prizes',
  },
  {
    title: 'Meme Marathon',
    description: 'Showcase your photography skills with tech and innovation themes',
  },
  {
    title: 'Connection',
    description: 'Create hilarious tech-themed memes and compete for awards',
  },
  {
    title: 'Treasure Hunt',
    description: 'Find hidden tech clues and win exciting prizes',
  },
]

export default function Page() {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to Innovation 2026</span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <p className="text-sm md:text-base text-primary font-semibold tracking-widest uppercase">
              Renganayagi Varatharaj College Of Engineering
            </p>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-balance">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                FUSION FEST
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-foreground">
              BY DEPARTMENT OF CSE
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join the ultimate tech celebration. Compete in challenging contests, showcase your projects, and connect with innovators from across the campus.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-background button-glow transition-all duration-300"
                aria-label="Register for FusionFest"
              >
                Register Now
              </Button>
            </Link>
            <Button
              onClick={() => document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-6 text-lg font-semibold bg-transparent border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Learn more about events"
            >
              Explore Events
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 z-10 animate-bounce">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
              Events
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          {/* Technical Events */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center">
              Technical Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TechnicalEvents.map((event, index) => (
                <Card
                  key={index}
                  className="group relative p-6 bg-card border-primary/30 hover:border-primary/60 glow-box transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {event.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Non-Technical Events */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-accent mb-10 text-center">
              Non-Technical Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {NonTechnicalEvents.map((event, index) => (
                <Card
                  key={index}
                  className="group relative p-6 bg-card border-accent/30 hover:border-accent/60 glow-box transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-accent mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {event.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* College Showcase Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
              Renganayagi Varatharaj College Of Engineering
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A premier engineering institution committed to fostering innovation, technological excellence, and academic leadership in computer science and engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <img src="/college-1.png" alt="College Campus" className="rounded-lg w-full h-48 object-cover border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" />
            <img src="/college-2.png" alt="CSE Building" className="rounded-lg w-full h-48 object-cover border border-accent/30 hover:border-accent/60 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" />
            <img src="/college-3.png" alt="Computer Lab" className="rounded-lg w-full h-48 object-cover border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" />
            <img src="/college-4.png" alt="Tech Event" className="rounded-lg w-full h-48 object-cover border border-accent/30 hover:border-accent/60 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-primary/20 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-lg font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                Empowering students with cutting-edge technical knowledge and practical skills to become industry-ready engineers and innovators.
              </p>
            </Card>
            <Card className="p-6 bg-card border-accent/20 hover:border-accent/50 transition-all duration-300">
              <h3 className="text-lg font-bold text-accent mb-3">Academic Excellence</h3>
              <p className="text-muted-foreground">
                State-of-the-art infrastructure, experienced faculty, and industry-aligned curriculum to nurture technical and creative talents.
              </p>
            </Card>
            <Card className="p-6 bg-card border-primary/20 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-lg font-bold text-primary mb-3">Innovation Hub</h3>
              <p className="text-muted-foreground">
                A center for research, development, and innovation where students collaborate on real-world projects and entrepreneurial ventures.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-8 text-center">
            About FusionFest
          </h2>
          <Card className="p-8 bg-card/50 border-primary/30 backdrop-blur-sm">
            <p className="text-foreground text-lg leading-relaxed mb-4">
              FusionFest is the premier technical symposium organized by the Computer Science and Engineering department. It brings together students, faculty, and industry professionals to celebrate innovation, creativity, and technological excellence.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you're a seasoned programmer, a creative designer, or simply passionate about technology, FusionFest offers a platform to showcase your skills, learn from peers, and network with tech leaders in the industry.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-12 text-center">
            Venue & Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-primary/30">
              <h3 className="text-xl font-bold text-primary mb-4">Location</h3>
              <p className="text-muted-foreground mb-2">CSE Department Block</p>
              <p className="text-muted-foreground mb-2">College Campus</p>
              <p className="text-secondary">Date: [27/02/2026]</p>
            </Card>
            <Card className="p-6 bg-card border-accent/30">
              <h3 className="text-xl font-bold text-accent mb-4">Contact</h3>
              <p className="text-muted-foreground mb-2">Email: fusion@cse.edu.in</p>
              <p className="text-muted-foreground mb-2">Phone: +91 XXXX-XXX-XXX</p>
              <p className="text-secondary">Follow us on social media</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-muted-foreground bg-background">
        <p>&copy; 2026 FusionFest. CSE Department Symposium. All rights reserved.</p>
      </footer>
    </div>
  )
}
