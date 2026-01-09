-- SAM Racing League - Sample Events and Results
-- Run this in your Supabase SQL Editor AFTER running UPDATE_DRIVERS.sql

-- First, let's get the driver IDs (we'll need these for results)
-- This will create variables for the driver IDs

DO $$
DECLARE
  season_id_var UUID;
  championship_id_var UUID;
  event1_id UUID;
  event2_id UUID;
  event3_id UUID;
  event4_id UUID;
  franz_id UUID;
  jp_id UUID;
  cads_id UUID;
  wolf_id UUID;
  broncis_id UUID;
BEGIN
  -- Get the active season
  SELECT id INTO season_id_var FROM seasons WHERE is_active = true LIMIT 1;
  
  -- Get or create championship
  SELECT id INTO championship_id_var FROM championships WHERE season_id = season_id_var LIMIT 1;
  
  IF championship_id_var IS NULL THEN
    INSERT INTO championships (season_id, name, game, platform, description)
    VALUES (
      season_id_var,
      'SAM GT7 Championship 2026',
      'Gran Turismo 7',
      'PlayStation 5',
      'SAM Racing League - Premier GT7 Championship'
    )
    RETURNING id INTO championship_id_var;
  END IF;
  
  -- Delete existing events for this championship
  DELETE FROM events WHERE championship_id = championship_id_var;
  
  -- Create events
  INSERT INTO events (championship_id, name, track, event_date, status, max_entries)
  VALUES 
    (championship_id_var, 'Nürburgring GP', 'Nürburgring Nordschleife', NOW() + INTERVAL '7 days', 'open', 20)
    RETURNING id INTO event1_id;
    
  INSERT INTO events (championship_id, name, track, event_date, status, max_entries)
  VALUES 
    (championship_id_var, 'Suzuka Sprint', 'Suzuka Circuit', NOW() + INTERVAL '14 days', 'upcoming', 20)
    RETURNING id INTO event2_id;
    
  INSERT INTO events (championship_id, name, track, event_date, status, max_entries)
  VALUES 
    (championship_id_var, 'Spa-Francorchamps Endurance', 'Circuit de Spa-Francorchamps', NOW() - INTERVAL '7 days', 'completed', 20)
    RETURNING id INTO event3_id;
    
  INSERT INTO events (championship_id, name, track, event_date, status, max_entries)
  VALUES 
    (championship_id_var, 'Monza Speed Challenge', 'Autodromo Nazionale di Monza', NOW() - INTERVAL '14 days', 'completed', 20)
    RETURNING id INTO event4_id;
  
  -- Get driver IDs
  SELECT id INTO franz_id FROM drivers WHERE psn_id = 'SAM_FranzHermann';
  SELECT id INTO jp_id FROM drivers WHERE psn_id = 'SAM_JPLazer';
  SELECT id INTO cads_id FROM drivers WHERE psn_id = 'SAM_Cads71';
  SELECT id INTO wolf_id FROM drivers WHERE psn_id = 'SAM_MWolf';
  SELECT id INTO broncis_id FROM drivers WHERE psn_id = 'SAM_Broncis';
  
  -- Delete existing results
  DELETE FROM results;
  
  -- Race 1: Monza (2 weeks ago) - JP Lazer wins
  INSERT INTO results (event_id, driver_id, position, points, fastest_lap) VALUES
    (event4_id, jp_id, 1, 26, true),      -- JP wins with fastest lap
    (event4_id, franz_id, 2, 18, false),
    (event4_id, wolf_id, 3, 15, false),
    (event4_id, cads_id, 4, 12, false),
    (event4_id, broncis_id, 5, 10, false);
  
  -- Race 2: Spa (1 week ago) - Franz Hermann wins
  INSERT INTO results (event_id, driver_id, position, points, fastest_lap) VALUES
    (event3_id, franz_id, 1, 25, false),
    (event3_id, jp_id, 2, 18, false),
    (event3_id, cads_id, 3, 16, true),    -- Cads gets fastest lap
    (event3_id, broncis_id, 4, 12, false),
    (event3_id, wolf_id, 5, 10, false);
  
  -- Register all drivers for upcoming Nürburgring event
  INSERT INTO event_registrations (event_id, driver_id) VALUES
    (event1_id, franz_id),
    (event1_id, jp_id),
    (event1_id, cads_id),
    (event1_id, wolf_id),
    (event1_id, broncis_id);
  
  RAISE NOTICE 'Sample data created successfully!';
  RAISE NOTICE 'Championship ID: %', championship_id_var;
  RAISE NOTICE 'Events created: 4 (2 completed, 1 open, 1 upcoming)';
  RAISE NOTICE 'Results entered for 2 races';
END $$;

-- Verify the data
SELECT 'Events' as type, COUNT(*) as count FROM events
UNION ALL
SELECT 'Results', COUNT(*) FROM results
UNION ALL
SELECT 'Registrations', COUNT(*) FROM event_registrations;

-- Show current standings
SELECT 
  position,
  driver_name,
  team,
  races,
  wins,
  podiums,
  points
FROM championship_standings
ORDER BY position;
