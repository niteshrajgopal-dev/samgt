-- GT7 Racing League Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drivers table
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE,
  name TEXT NOT NULL,
  team TEXT,
  nationality TEXT,
  psn_id TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seasons table
CREATE TABLE seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Championships table
CREATE TABLE championships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  game TEXT DEFAULT 'Gran Turismo 7',
  platform TEXT DEFAULT 'PlayStation 5',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  championship_id UUID REFERENCES championships(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  track TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'open', 'live', 'completed')),
  max_entries INTEGER DEFAULT 20,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Registrations table
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, driver_id)
);

-- Results table
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  points DECIMAL(5,1) DEFAULT 0,
  fastest_lap BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, driver_id)
);

-- Driver Statistics View
CREATE OR REPLACE VIEW driver_statistics AS
SELECT 
  d.id,
  d.name,
  d.team,
  d.nationality,
  d.psn_id,
  d.avatar_url,
  COUNT(DISTINCT r.event_id) as races,
  SUM(CASE WHEN r.position = 1 THEN 1 ELSE 0 END) as wins,
  SUM(CASE WHEN r.position <= 3 THEN 1 ELSE 0 END) as podiums,
  COALESCE(SUM(r.points), 0) as total_points
FROM drivers d
LEFT JOIN results r ON d.id = r.driver_id
GROUP BY d.id, d.name, d.team, d.nationality, d.psn_id, d.avatar_url;

-- Championship Standings View
CREATE OR REPLACE VIEW championship_standings AS
SELECT 
  c.id as championship_id,
  c.name as championship_name,
  d.id as driver_id,
  d.name as driver_name,
  d.team,
  d.avatar_url,
  COUNT(DISTINCT r.event_id) as races,
  SUM(CASE WHEN r.position = 1 THEN 1 ELSE 0 END) as wins,
  SUM(CASE WHEN r.position <= 3 THEN 1 ELSE 0 END) as podiums,
  COALESCE(SUM(r.points), 0) as points,
  ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY SUM(r.points) DESC, SUM(CASE WHEN r.position = 1 THEN 1 ELSE 0 END) DESC) as position
FROM championships c
CROSS JOIN drivers d
LEFT JOIN events e ON e.championship_id = c.id AND e.status = 'completed'
LEFT JOIN results r ON r.event_id = e.id AND r.driver_id = d.id
GROUP BY c.id, c.name, d.id, d.name, d.team, d.avatar_url;

-- Indexes for performance
CREATE INDEX idx_events_championship ON events(championship_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_results_event ON results(event_id);
CREATE INDEX idx_results_driver ON results(driver_id);
CREATE INDEX idx_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_registrations_driver ON event_registrations(driver_id);

-- Row Level Security (RLS) Policies
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE championships ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON drivers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON seasons FOR SELECT USING (true);
CREATE POLICY "Public read access" ON championships FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON event_registrations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON results FOR SELECT USING (true);

-- Authenticated users can register for events
CREATE POLICY "Users can register for events" ON event_registrations 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can unregister from events
CREATE POLICY "Users can unregister from events" ON event_registrations 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Note: Admin policies would need to be implemented based on your Clerk user metadata
-- For now, you'll need to handle admin operations through service role key

-- Seed data for testing
INSERT INTO seasons (name, year, is_active) VALUES
  ('2026 Season', 2026, true);

INSERT INTO drivers (name, team, nationality, psn_id) VALUES
  ('Alex Hamilton', 'Velocity Racing', 'USA', 'AlexH_GT7'),
  ('Marcus Chen', 'Thunder Motorsport', 'Singapore', 'MarcusC_Racing'),
  ('Sofia Rodriguez', 'Phoenix Racing', 'Spain', 'SofiaR_GT7'),
  ('Kenji Tanaka', 'Samurai Speed', 'Japan', 'KenjiT_Racing'),
  ('Emma Williams', 'Apex Legends', 'UK', 'EmmaW_GT7');

-- Get the season ID for championship insertion
DO $$
DECLARE
  season_id_var UUID;
  championship_id_var UUID;
BEGIN
  SELECT id INTO season_id_var FROM seasons WHERE year = 2026 LIMIT 1;
  
  INSERT INTO championships (season_id, name, description) VALUES
    (season_id_var, 'GT7 Championship Series', 'Premier GT7 racing championship featuring the best drivers')
  RETURNING id INTO championship_id_var;
  
  INSERT INTO events (championship_id, name, track, event_date, status) VALUES
    (championship_id_var, 'Nürburgring GP', 'Nürburgring Nordschleife', NOW() + INTERVAL '6 days', 'upcoming'),
    (championship_id_var, 'Suzuka Circuit Challenge', 'Suzuka Circuit', NOW() + INTERVAL '13 days', 'open'),
    (championship_id_var, 'Spa-Francorchamps Endurance', 'Circuit de Spa-Francorchamps', NOW() - INTERVAL '1 day', 'completed');
END $$;
