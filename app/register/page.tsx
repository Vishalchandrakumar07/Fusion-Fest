'use client'

import { Navbar } from '@/components/navbar'
import RegistrationForm from '@/components/registration-form'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Registration Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
              Join FusionFest
            </h1>
            <p className="text-lg text-muted-foreground">
              Register now to participate in our tech-packed events and showcase your skills
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-muted-foreground bg-background mt-20">
        <p>&copy; 2026 FusionFest. CSE Department Symposium. All rights reserved.</p>
      </footer>
    </div>
  )
}
