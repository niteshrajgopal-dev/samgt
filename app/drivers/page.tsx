import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'
import DriverCard from '@/components/DriverCard'

export const revalidate = 0

async function getDrivers() {
    const { data: drivers, error } = await supabase
        .from('driver_statistics')
        .select('*')
        .order('total_points', { ascending: false })

    if (error) {
        console.error('Error fetching drivers:', error)
        return []
    }

    return drivers || []
}

export default async function DriversPage() {
    const drivers = await getDrivers()

    return (
        <>
            <Navigation />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-gradient mb-4">Drivers</h1>
                        <p className="text-xl text-gray-400">
                            View all registered drivers and their statistics
                        </p>
                    </div>

                    {/* Drivers Grid */}
                    {drivers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {drivers.map((driver) => (
                                <DriverCard key={driver.id} driver={driver} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🏎️</div>
                            <h3 className="text-2xl font-bold mb-2">No Drivers Yet</h3>
                            <p className="text-gray-400">Drivers will appear here once they join the league!</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
