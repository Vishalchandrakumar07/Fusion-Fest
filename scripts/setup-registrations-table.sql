-- Create event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  college_name VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  year_semester VARCHAR(50) NOT NULL,
  event_selection VARCHAR(255) NOT NULL,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON event_registrations(email);

-- Enable RLS (Row Level Security)
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public inserts" ON event_registrations
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public reads
CREATE POLICY "Allow public reads" ON event_registrations
  FOR SELECT
  USING (true);
