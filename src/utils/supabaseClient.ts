import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unlxqleauxykssskzzsq.supabase.co'; // локальный URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubHhxbGVhdXh5a3Nzc2t6enNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MzEwMTEsImV4cCI6MjA1ODQwNzAxMX0.ZjcSGhEzc0Xy9WqwHwUaIE9M8WZUyR6x4wflm7x7hUo'; // твой локальный anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
