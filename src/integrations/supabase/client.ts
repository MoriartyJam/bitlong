// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zyvnicsksfiokybnslkz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dm5pY3Nrc2Zpb2t5Ym5zbGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MTM4MDcsImV4cCI6MjA1Nzk4OTgwN30.I6fur-s_eZtS4dmM9QUPnlrOsy1D41XMd8BXBqh5hVE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);