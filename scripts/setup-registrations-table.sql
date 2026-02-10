-- Create event registrations table
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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON event_registrations(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON event_registrations(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON event_registrations;
DROP POLICY IF EXISTS "Allow public reads" ON event_registrations;

-- Create policy to allow public inserts
CREATE POLICY "Allow public inserts" ON event_registrations
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public reads
CREATE POLICY "Allow public reads" ON event_registrations
  FOR SELECT
  USING (true);
