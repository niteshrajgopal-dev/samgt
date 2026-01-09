'use client'

import { Event } from '@/lib/supabase'
import { useState } from 'react'

interface EventCardProps {
    event: Event & {
        championship?: {
            name: string
            game: string
            platform: string
        }
    }
}

export default function EventCard({ event }: EventCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const eventDate = new Date(event.event_date)
    const now = new Date()
    const isPast = eventDate < now

    // Determine status badge
    let statusBadge = null
    let statusColor = ''

    if (event.status === 'completed') {
        statusBadge = 'Completed'
        statusColor = 'bg-gray-500/20 text-gray-400 border-gray-500'
    } else if (event.status === 'live') {
        statusBadge = '● Live Now'
        statusColor = 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
    } else if (event.status === 'open') {
        statusBadge = 'Registration Open'
        statusColor = 'bg-green-500/20 text-green-400 border-green-500'
    } else {
        statusBadge = 'Upcoming'
        statusColor = 'bg-blue-500/20 text-blue-400 border-blue-500'
    }

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden card-hover">
            {/* Event Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-red-500/10 to-purple-600/10 flex items-center justify-center relative">
                <div className="text-6xl">🏁</div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
                    {statusBadge}
                </div>
            </div>

            {/* Event Details */}
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
                <p className="text-gray-400 mb-4">{event.track}</p>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                        <span>📅</span>
                        <span>{eventDate.toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                    </div>

                    {event.championship && (
                        <div className="flex items-center gap-2 text-gray-300">
                            <span>🏆</span>
                            <span>{event.championship.name}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-gray-300">
                        <span>👥</span>
                        <span>Max {event.max_entries} Drivers</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
                    >
                        View Details
                    </button>
                    {event.status === 'open' && !isPast && (
                        <button className="px-4 py-2 border-2 border-green-500 rounded-lg font-semibold hover:bg-green-500/10 transition-all">
                            Register
                        </button>
                    )}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-800 space-y-2 text-sm text-gray-400">
                        <p><strong className="text-white">Game:</strong> {event.championship?.game || 'Gran Turismo 7'}</p>
                        <p><strong className="text-white">Platform:</strong> {event.championship?.platform || 'PlayStation 5'}</p>
                        <p><strong className="text-white">Status:</strong> {event.status}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
