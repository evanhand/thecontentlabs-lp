'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ApprovedReview {
  id: string;
  rating: number;
  body: string;
  title: string | null;
  photo_url: string | null;
  display_name: string | null;
  created_at: string;
}

export function useApprovedReviews() {
  const [data, setData] = useState<ApprovedReview[]>([]);

  useEffect(() => {
    supabase
      .from('reviews')
      .select('id, rating, body, title, photo_url, display_name, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setData(data as ApprovedReview[]);
      });
  }, []);

  return data;
}
