import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'
import EventCard from '@/components/EventCard'

export const revalidate = 0 // Disable caching for real-time data

async function getEvents() {
    const { data: events, error } = await supabase
        .from('events')
        .select(`
      *,
      championship:championships(name, game, platform)
    `)
        .order('event_date', { ascending: true })

    if (error) {
        console.error('Error fetching events:', error)
        return []
    }

    return events || []
}

export default async function CalendarPage() {
    const events = await getEvents()

    return (
        <>
            <Navigation />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-gradient mb-4">Race Calendar</h1>
                        <p className="text-xl text-gray-400">
                            View and register for upcoming GT7 racing events
                        </p>
                    </div>

                    {/* Events Grid */}
                    {events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📅</div>
                            <h3 className="text-2xl font-bold mb-2">No Events Yet</h3>
                            <p className="text-gray-400">Check back soon for upcoming races!</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
