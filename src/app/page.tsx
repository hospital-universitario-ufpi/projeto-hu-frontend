/* eslint-disable @typescript-eslint/no-unused-vars */


import React from 'react'
import { cookies } from 'next/headers'
import PageClient from './PageClient';
import { createClient } from '../utils/supabase/server';

export default function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return <PageClient />
}

