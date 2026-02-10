# Event Registration Setup Guide

## Overview

This project now includes a standalone event registration page to replace the Google Form. The registration data is stored in a Supabase PostgreSQL database.

## Setup Instructions

### 1. Create the Database Table

You need to run the SQL migration to create the `event_registrations` table. Follow these steps:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `scripts/setup-registrations-table.sql`
5. Click "Run" to execute the migration

Alternatively, you can copy the SQL directly:

```sql
CREATE TABLE IF NOT EXISTS event_registrations (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  college_name VARCHAR(255) DEFAULT '',
  department VARCHAR(255) DEFAULT '',
  year_semester VARCHAR(50) DEFAULT '',
  event_selection VARCHAR(255) DEFAULT '',
  additional_notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON event_registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON event_registrations(created_at);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts" ON event_registrations;
DROP POLICY IF EXISTS "Allow public reads" ON event_registrations;

CREATE POLICY "Allow public inserts" ON event_registrations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public reads" ON event_registrations
  FOR SELECT
  USING (true);
```

### 2. Verify Environment Variables

Make sure all Supabase environment variables are set in your Vercel project:

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

These should be automatically configured if you've connected Supabase to your Vercel project.

### 3. Test the Registration Page

Once the table is created, you can test the registration form:

1. Navigate to `/register` in your application
2. Fill out the form with test data
3. Click "Complete Registration"
4. You should see a success message

### 4. View Registrations in Supabase

To view submitted registrations:

1. Go to your Supabase dashboard
2. Navigate to the Table Editor
3. Select the `event_registrations` table
4. You should see all submitted registrations

## File Structure

- `/app/register/page.tsx` - Registration page component
- `/components/registration-form.tsx` - Registration form component
- `/app/api/register/route.ts` - API endpoint for form submission
- `/scripts/setup-registrations-table.sql` - Database migration SQL
- `/lib/init-db.ts` - Database initialization utilities

## Form Fields

The registration form includes the following fields:

**Required Fields:**
- Full Name
- Email Address
- Phone Number

**Optional Fields:**
- College Name
- Department (dropdown)
- Year / Semester (dropdown)
- Event Selection (dropdown)
- Additional Notes (text area)

## Features

✅ Form validation for required fields
✅ Email format validation
✅ Success confirmation message
✅ Mobile-friendly responsive design
✅ Database persistence with Supabase
✅ Automatic timestamps for each registration
✅ Clean, minimal UI matching Google Forms style

## Updating Registration Data

If you need to add more events or departments, update the constants in `/components/registration-form.tsx`:

```typescript
const EVENTS = [
  'PaperXpo',
  'Tech Escape',
  // Add more events...
]

const DEPARTMENTS = [
  'Computer Science and Engineering',
  // Add more departments...
]

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']
```

## Troubleshooting

### Table Not Found Error
- Make sure you've run the SQL migration
- Check that the `event_registrations` table exists in Supabase
- Verify environment variables are set correctly

### Registration Not Submitting
- Check browser console for errors
- Verify API endpoint at `/api/register` is accessible
- Check Supabase RLS policies are correctly configured

### Missing Data in Supabase
- Verify the registration form was successfully submitted
- Check the table in Supabase Table Editor
- Look at the browser console Network tab to see API response

## Security Notes

- The table has Row Level Security (RLS) enabled
- Public insert and read policies allow anyone to submit registrations
- For production, consider adding authentication and stricter RLS policies
- Sensitive data should be handled according to your privacy policy
