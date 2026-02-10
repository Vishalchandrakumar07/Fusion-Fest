import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function initializeDatabase() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if table exists
    const { data: tables, error: tableError } = await supabase
      .rpc('information_schema.tables', {
        table_schema: 'public',
        table_name: 'event_registrations',
      } as any);

    // Try to query the table to see if it exists
    const { error: queryError } = await supabase
      .from('event_registrations')
      .select('id')
      .limit(1);

    if (queryError?.code === 'PGRST116') {
      // Table doesn't exist, create it
      console.log('[v0] Creating event_registrations table...');
      
      // We'll create the table via direct SQL execution through a workaround
      // by using the raw PostgreSQL connection string if available
      const postgresUrl = process.env.POSTGRES_URL;
      
      if (postgresUrl) {
        // This would require pg package, which we don't have
        // Instead, we'll log a message to set up the table manually
        console.warn('[v0] Table does not exist. Please run the SQL migration manually.');
        return false;
      }
      
      return false;
    }

    console.log('[v0] Database is initialized');
    return true;
  } catch (error) {
    console.error('[v0] Database initialization error:', error);
    return false;
  }
}

// Export a simple health check function
export async function checkDatabaseHealth() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { count, error } = await supabase
      .from('event_registrations')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('[v0] Database health check failed:', error);
      return false;
    }

    console.log('[v0] Database is healthy. Current registrations:', count);
    return true;
  } catch (error) {
    console.error('[v0] Health check error:', error);
    return false;
  }
}
