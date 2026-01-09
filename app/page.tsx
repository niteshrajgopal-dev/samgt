import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-800">
          <div className="container mx-auto px-4 py-24 text-center">
            <div className="mb-8 text-6xl">🏁</div>
            <h1 className="mb-6 text-6xl font-bold text-gradient">
              GT7 RACING LEAGUE
            </h1>
            <p className="mb-8 text-xl text-gray-400 max-w-2xl mx-auto">
              Premier Gran Turismo 7 racing championship on PlayStation 5
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/calendar"
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all"
              >
                View Calendar
              </Link>
              <Link
                href="/standings"
                className="px-8 py-4 border-2 border-red-500 rounded-lg font-semibold text-lg hover:bg-red-500/10 transition-all"
              >
                Standings
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-red-500/10 to-purple-600/10 rounded-xl border border-gray-800">
                <div className="text-5xl mb-4">🏎️</div>
                <div className="text-4xl font-bold text-red-500 mb-2">--</div>
                <div className="text-gray-400 uppercase tracking-wide text-sm">Active Drivers</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-purple-600/10 to-orange-500/10 rounded-xl border border-gray-800">
                <div className="text-5xl mb-4">📅</div>
                <div className="text-4xl font-bold text-purple-500 mb-2">--</div>
                <div className="text-gray-400 uppercase tracking-wide text-sm">Total Events</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-gray-800">
                <div className="text-5xl mb-4">🏆</div>
                <div className="text-4xl font-bold text-orange-500 mb-2">--</div>
                <div className="text-gray-400 uppercase tracking-wide text-sm">Upcoming Races</div>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Instructions */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-br from-red-500/5 to-purple-600/5 border border-red-500/20 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gradient">🚀 Setup Required</h2>
              <div className="space-y-4 text-gray-300">
                <p>To complete the GT7 Racing League setup, you need to:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Set up Clerk authentication (see SETUP.md)</li>
                  <li>Configure Supabase database (run SUPABASE_SCHEMA.sql)</li>
                  <li>Add environment variables to .env.local</li>
                  <li>Build remaining pages (Calendar, Drivers, Standings, Admin)</li>
                </ol>
                <p className="mt-6 text-sm text-gray-400">
                  Check <code className="bg-gray-800 px-2 py-1 rounded">README.md</code> and{' '}
                  <code className="bg-gray-800 px-2 py-1 rounded">SETUP.md</code> for detailed instructions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Info */}
        <section className="py-16 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">🎮 PlayStation 5 • Gran Turismo 7</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our competitive racing league featuring the best GT7 drivers.
              Race on iconic tracks, compete for championship points, and prove you're the fastest on the grid.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>GT7 Racing League • Built with Next.js, Clerk, Supabase, and Three.js</p>
        </div>
      </footer>
    </>
  )
}
