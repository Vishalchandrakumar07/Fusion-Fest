'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { label: 'Events', href: '#events', isExternal: false },
  // { label: 'Schedule', href: '/schedule', isExternal: true },
  // { label: 'Prizes', href: '/prizes', isExternal: true },
  // { label: 'FAQ', href: '/faq', isExternal: true },
  { label: 'Contact', href: '#contact', isExternal: false },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isExternal) {
      router.push(item.href)
    } else {
      const element = document.querySelector(item.href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="/fusionfest-logo.jpeg"
                alt="FusionFest Logo"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-muted-foreground leading-none">FusionFest</span>
              <span className="text-xs text-primary font-semibold">RVCE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => window.open('https://forms.google.com/your-fusion-fest-form', '_blank', 'noopener,noreferrer')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-background font-semibold"
            >
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary hover:bg-card rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-primary hover:bg-card rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => window.open('https://forms.google.com/your-fusion-fest-form', '_blank', 'noopener,noreferrer')}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-background font-semibold"
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
