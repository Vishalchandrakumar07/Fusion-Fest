import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('Creating event_registrations table...');
    
    const { error } = await supabase.rpc('exec', {
      sql: `
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

        CREATE INDEX IF NOT EXISTS idx_registrations_email ON event_registrations(email);

        ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Allow public inserts" ON event_registrations
          FOR INSERT
          WITH CHECK (true);

        CREATE POLICY "Allow public reads" ON event_registrations
          FOR SELECT
          USING (true);
      `
    });

    if (error) {
      console.error('Error creating table:', error.message);
    } else {
      console.log('Table created successfully!');
    }
  } catch (err) {
    console.error('Setup failed:', err.message);
  }
}

setupDatabase();
