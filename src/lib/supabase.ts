import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnpukqlokluvsjjrtjgv.supabase.co';
const supabaseKey = 'sb_publishable__X1WFvPA8LB1QIWqqIaViw_yUgXR6vp';

export const supabase = createClient(supabaseUrl, supabaseKey);
