import Navigation from '@/components/Navigation'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

async function getStandings() {
    const { data: standings, error } = await supabase
        .from('championship_standings')
        .select('*')
        .order('position', { ascending: true })

    if (error) {
        console.error('Error fetching standings:', error)
        return []
    }

    return standings || []
}

async function getChampionships() {
    const { data: championships, error } = await supabase
        .from('championships')
        .select('*')

    if (error) {
        console.error('Error fetching championships:', error)
        return []
    }

    return championships || []
}

export default async function StandingsPage() {
    const [standings, championships] = await Promise.all([
        getStandings(),
        getChampionships()
    ])

    const getPositionBadge = (position: number) => {
        if (position === 1) return '🥇'
        if (position === 2) return '🥈'
        if (position === 3) return '🥉'
        return ''
    }

    // Group standings by championship
    const standingsByChampionship = standings.reduce((acc, standing) => {
        if (!acc[standing.championship_id]) {
            acc[standing.championship_id] = []
        }
        acc[standing.championship_id].push(standing)
        return acc
    }, {} as Record<string, typeof standings>)

    return (
        <>
            <Navigation />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    {/* Page Header */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-gradient mb-4">Championship Standings</h1>
                        <p className="text-xl text-gray-400">
                            Current driver standings and points
                        </p>
                    </div>

                    {/* Standings Tables */}
                    {championships.length > 0 ? (
                        <div className="space-y-8">
                            {championships.map((championship) => {
                                const champStandings = standingsByChampionship[championship.id] || []
                                const leaderPoints = champStandings[0]?.points || 0

                                return (
                                    <div key={championship.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                        {/* Championship Header */}
                                        <div className="p-6 border-b border-gray-800">
                                            <h2 className="text-3xl font-bold mb-2">{championship.name}</h2>
                                            <p className="text-gray-400">{championship.game} • {championship.platform}</p>
                                        </div>

                                        {/* Standings Table */}
                                        {champStandings.length > 0 ? (
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-black/50">
                                                        <tr>
                                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Pos</th>
                                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Driver</th>
                                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Team</th>
                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Races</th>
                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Wins</th>
                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Podiums</th>
                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Points</th>
                                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Gap</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-800">
                                                        {champStandings.map((standing) => {
                                                            const gap = standing.position === 1 ? 0 : leaderPoints - standing.points

                                                            return (
                                                                <tr key={standing.driver_id} className="hover:bg-gray-800/50 transition-colors">
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-xl">{getPositionBadge(standing.position)}</span>
                                                                            <strong className="text-lg">{standing.position}</strong>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="text-2xl">{standing.avatar_url || '🏎️'}</span>
                                                                            <strong className="text-lg">{standing.driver_name}</strong>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 text-gray-400">{standing.team || '-'}</td>
                                                                    <td className="px-6 py-4 text-center">{standing.races}</td>
                                                                    <td className="px-6 py-4 text-center">{standing.wins}</td>
                                                                    <td className="px-6 py-4 text-center">{standing.podiums}</td>
                                                                    <td className="px-6 py-4 text-center">
                                                                        <strong className="text-xl text-red-500">{standing.points}</strong>
                                                                    </td>
                                                                    <td className="px-6 py-4 text-center text-gray-400">
                                                                        {gap > 0 ? `+${gap}` : '-'}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="p-12 text-center text-gray-400">
                                                <p>No standings yet. Results will appear after the first race.</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🏆</div>
                            <h3 className="text-2xl font-bold mb-2">No Championships Yet</h3>
                            <p className="text-gray-400">Championships will appear here once they're created!</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
