'use client'

import { DriverStatistics } from '@/lib/supabase'

interface DriverCardProps {
    driver: DriverStatistics
}

const flagEmojis: Record<string, string> = {
    'USA': '🇺🇸',
    'UK': '🇬🇧',
    'Japan': '🇯🇵',
    'Spain': '🇪🇸',
    'Singapore': '🇸🇬',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Italy': '🇮🇹',
    'Brazil': '🇧🇷',
    'Australia': '🇦🇺',
}

export default function DriverCard({ driver }: DriverCardProps) {
    const flag = driver.nationality ? flagEmojis[driver.nationality] || '🏁' : '🏁'

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 card-hover">
            {/* Driver Header */}
            <div className="text-center mb-6">
                <div className="text-5xl mb-3">
                    {driver.avatar_url || '🏎️'}
                </div>
                <h3 className="text-2xl font-bold mb-1">{driver.name}</h3>
                {driver.team && (
                    <p className="text-gray-400 mb-2">{driver.team}</p>
                )}
                {driver.nationality && (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <span className="text-xl">{flag}</span>
                        <span>{driver.nationality}</span>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="bg-black/50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-3xl font-bold text-red-500">{driver.total_points}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Points</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-purple-500">{driver.wins}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Wins</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-orange-500">{driver.podiums}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Podiums</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-500">{driver.races}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Races</div>
                    </div>
                </div>
            </div>

            {/* PSN ID */}
            {driver.psn_id && (
                <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                        <span>🎮</span>
                        <span>{driver.psn_id}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
