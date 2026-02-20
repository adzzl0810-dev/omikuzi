-- Run this script in the Supabase SQL Editor to seed the Ema Wall
-- This bypasses Row Level Security and inserts initial content to show the "vibe" to new users.

INSERT INTO ema_offerings (content, is_public, likes_count, created_at)
VALUES 
  ('World Peace & Inner Calm in this chaotic digital age.', true, 24, NOW() - INTERVAL '3 days'),
  ('Health and prosperity for my family this year. May the spirits guide us.', true, 18, NOW() - INTERVAL '2 days'),
  ('Finding clarity in chaos. Hoping to successfully launch my dream project.', true, 5, NOW() - INTERVAL '1 day'),
  ('Hoping my cat recovers from her illness. She''s my only family in the city.', true, 42, NOW() - INTERVAL '12 hours'),
  ('Praying to pass the bar exam next week. I''ve given everything to this.', true, 15, NOW() - INTERVAL '6 hours'),
  ('To finally find someone who understands my soul. 10 years of loneliness is enough.', true, 33, NOW() - INTERVAL '2 hours');
