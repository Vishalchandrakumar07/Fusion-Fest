'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface FormData {
  full_name: string
  email: string
  phone_number: string
  college_name: string
  department: string
  year_semester: string
  event_selection: string
  additional_notes: string
}

const EVENTS = [
  'PaperXpo',
  'Tech Escape',
  'Error Auction',
  'Web Architect',
  'Prompt Olympia',
  'Short Film',
  'E-Sports (Free Fire)',
  'Meme Marathon',
  'Connection',
  'Treasure Hunt',
]

const DEPARTMENTS = [
  'Computer Science and Engineering',
  'Electronics and Communication',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Information Technology',
]

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone_number: '',
    college_name: '',
    department: '',
    year_semester: '',
    event_selection: '',
    additional_notes: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.phone_number.trim()) {
      setError('Phone number is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 500 && data.error?.includes('does not exist')) {
          setError(
            'Database table is not yet set up. Please follow the setup instructions in REGISTRATION_SETUP.md to initialize the database.'
          )
        } else {
          setError(data.error || 'Registration failed. Please try again.')
        }
        setLoading(false)
        return
      }

      setSuccess(true)
      setFormData({
        full_name: '',
        email: '',
        phone_number: '',
        college_name: '',
        department: '',
        year_semester: '',
        event_selection: '',
        additional_notes: '',
      })

      // Auto-reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Submit error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-8 bg-card border-primary/30">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-3xl font-bold text-foreground">
            Registration Successful!
          </h2>
          <p className="text-muted-foreground text-lg">
            Thank you for registering for FusionFest. We've received your registration and will contact you soon with more details.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            className="mt-4 px-6 py-2"
          >
            Register Another Person
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 bg-card border-primary/30">
      <h1 className="text-4xl font-bold text-center mb-2 text-foreground">
        FusionFest Registration
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Register for FusionFest 2026 and join the ultimate tech celebration!
      </p>

      {error && (
        <Alert className="mb-6 border-red-500/50 bg-red-500/10">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-foreground font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Enter your full name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
            className="bg-background border-border"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-background border-border"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone_number" className="text-foreground font-medium">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone_number"
            name="phone_number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
            className="bg-background border-border"
          />
        </div>

        {/* College Name */}
        <div className="space-y-2">
          <Label htmlFor="college_name" className="text-foreground font-medium">
            College Name
          </Label>
          <Input
            id="college_name"
            name="college_name"
            type="text"
            placeholder="Enter your college name"
            value={formData.college_name}
            onChange={handleInputChange}
            className="bg-background border-border"
          />
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor="department" className="text-foreground font-medium">
            Department
          </Label>
          <Select
            value={formData.department}
            onValueChange={(value) =>
              handleSelectChange('department', value)
            }
          >
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select your department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year / Semester */}
        <div className="space-y-2">
          <Label htmlFor="year_semester" className="text-foreground font-medium">
            Year / Semester
          </Label>
          <Select
            value={formData.year_semester}
            onValueChange={(value) =>
              handleSelectChange('year_semester', value)
            }
          >
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select your year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Event Selection */}
        <div className="space-y-2">
          <Label htmlFor="event_selection" className="text-foreground font-medium">
            Select Event(s)
          </Label>
          <Select
            value={formData.event_selection}
            onValueChange={(value) =>
              handleSelectChange('event_selection', value)
            }
          >
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {EVENTS.map((event) => (
                <SelectItem key={event} value={event}>
                  {event}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label htmlFor="additional_notes" className="text-foreground font-medium">
            Additional Notes (Optional)
          </Label>
          <Textarea
            id="additional_notes"
            name="additional_notes"
            placeholder="Any additional information you'd like to share"
            value={formData.additional_notes}
            onChange={handleInputChange}
            className="bg-background border-border min-h-24 resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-background button-glow transition-all duration-300"
        >
          {loading ? 'Submitting...' : 'Complete Registration'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By registering, you agree to receive updates about FusionFest 2026
        </p>
      </form>
    </Card>
  )
}
