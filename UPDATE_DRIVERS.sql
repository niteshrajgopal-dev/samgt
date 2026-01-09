-- Update drivers with SAM team members
-- Run this in your Supabase SQL Editor

-- First, delete the existing dummy drivers
DELETE FROM drivers;

-- Insert the SAM team drivers
INSERT INTO drivers (name, team, nationality, psn_id, avatar_url) VALUES
  ('Franz Hermann', 'SAM Racing', 'Germany', 'SAM_FranzHermann', '🏎️'),
  ('JP Lazer', 'SAM Racing', 'USA', 'SAM_JPLazer', '⚡'),
  ('Cads71', 'SAM Racing', 'UK', 'SAM_Cads71', '🔥'),
  ('M Wolf', 'SAM Racing', 'Germany', 'SAM_MWolf', '🐺'),
  ('Broncis', 'SAM Racing', 'Spain', 'SAM_Broncis', '🏁');

-- Verify the update
SELECT * FROM drivers ORDER BY name;
