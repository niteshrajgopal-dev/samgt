import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'
import AdminDashboard from '@/components/AdminDashboard'

export const revalidate = 0

async function getAdminData() {
    const { data: drivers } = await supabase.from('drivers').select('*')
    const { data: events } = await supabase.from('events').select('*')
    const { data: championships } = await supabase.from('championships').select('*')

    return {
        drivers: drivers || [],
        events: events || [],
        championships: championships || []
    }
}

export default async function AdminPage() {
    const data = await getAdminData()

    return (
        <>
            <Navigation />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-gradient mb-4">Admin Dashboard</h1>
                        <p className="text-xl text-gray-400">
                            Manage events, drivers, and race results
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-red-500/20 to-purple-600/20 border border-red-500/30 rounded-xl p-8 text-center">
                            <div className="text-5xl font-bold text-red-500 mb-2">{data.drivers.length}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Total Drivers</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-600/20 to-orange-500/20 border border-purple-500/30 rounded-xl p-8 text-center">
                            <div className="text-5xl font-bold text-purple-500 mb-2">{data.events.length}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Total Events</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500/20 to-blue-500/20 border border-orange-500/30 rounded-xl p-8 text-center">
                            <div className="text-5xl font-bold text-orange-500 mb-2">
                                {data.events.filter(e => e.status !== 'completed').length}
                            </div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">Upcoming Events</div>
                        </div>
                    </div>

                    {/* Admin Dashboard Component */}
                    <AdminDashboard initialData={data} />
                </div>
            </main>
        </>
    )
}
