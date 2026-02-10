import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const SQL_MIGRATION = `
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
`;

export async function POST(request: NextRequest) {
  // This endpoint should only be called from localhost or with proper authorization
  const origin = request.headers.get('origin');
  const isLocalhost = origin?.includes('localhost') || origin?.includes('127.0.0.1');

  if (!isLocalhost && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Try to execute the migration
    // Note: This uses the raw SQL execution through Supabase client
    // which may not work for DDL statements. Instead, we'll check if table exists
    // and provide instructions if it doesn't.

    const { error: checkError } = await supabase
      .from('event_registrations')
      .select('id')
      .limit(1);

    if (checkError?.code === 'PGRST116') {
      // Table doesn't exist
      return NextResponse.json(
        {
          success: false,
          message: 'Table does not exist',
          instructions:
            'Please run the SQL migration manually in your Supabase dashboard. Go to SQL Editor and paste the contents of scripts/setup-registrations-table.sql',
          sql: SQL_MIGRATION,
        },
        { status: 400 }
      );
    }

    // Table exists, check connection
    const { count, error: countError } = await supabase
      .from('event_registrations')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      return NextResponse.json(
        { error: 'Database connection error', details: countError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Database is properly configured',
        registrationCount: count,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Database init error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: String(err) },
      { status: 500 }
    );
  }
}

// GET endpoint to check database status
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { count, error } = await supabase
      .from('event_registrations')
      .select('*', { count: 'exact', head: true });

    if (error?.code === 'PGRST116') {
      return NextResponse.json(
        {
          status: 'not_initialized',
          message: 'Database table does not exist',
        },
        { status: 200 }
      );
    }

    if (error) {
      return NextResponse.json(
        {
          status: 'error',
          message: error.message,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: 'healthy',
        registrationCount: count,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        message: String(err),
      },
      { status: 200 }
    );
  }
}
