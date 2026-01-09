'use client'

import { useState } from 'react'
import { Driver, Event, Championship } from '@/lib/supabase'

interface AdminDashboardProps {
    initialData: {
        drivers: Driver[]
        events: Event[]
        championships: Championship[]
    }
}

export default function AdminDashboard({ initialData }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<'events' | 'drivers' | 'results'>('events')

    return (
        <div className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex gap-4 border-b border-gray-800">
                <button
                    onClick={() => setActiveTab('events')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'events'
                            ? 'text-red-500 border-b-2 border-red-500'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Event Management
                </button>
                <button
                    onClick={() => setActiveTab('drivers')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'drivers'
                            ? 'text-red-500 border-b-2 border-red-500'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Driver Management
                </button>
                <button
                    onClick={() => setActiveTab('results')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'results'
                            ? 'text-red-500 border-b-2 border-red-500'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Results Entry
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'events' && <EventManagement events={initialData.events} championships={initialData.championships} />}
                {activeTab === 'drivers' && <DriverManagement drivers={initialData.drivers} />}
                {activeTab === 'results' && <ResultsEntry events={initialData.events} drivers={initialData.drivers} />}
            </div>
        </div>
    )
}

function EventManagement({ events, championships }: { events: Event[], championships: Championship[] }) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Events</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all">
                    + Create Event
                </button>
            </div>

            {events.length > 0 ? (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="bg-black/50 border border-gray-800 rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{event.name}</h3>
                                <p className="text-sm text-gray-400">{event.track} • {new Date(event.event_date).toLocaleDateString()}</p>
                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'completed' ? 'bg-gray-500/20 text-gray-400' :
                                        event.status === 'live' ? 'bg-red-500/20 text-red-400' :
                                            event.status === 'open' ? 'bg-green-500/20 text-green-400' :
                                                'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {event.status}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    Edit
                                </button>
                                <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-400">
                    <p>No events yet. Create your first event to get started!</p>
                </div>
            )}
        </div>
    )
}

function DriverManagement({ drivers }: { drivers: Driver[] }) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Drivers</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all">
                    + Add Driver
                </button>
            </div>

            {drivers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drivers.map((driver) => (
                        <div key={driver.id} className="bg-black/50 border border-gray-800 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">{driver.avatar_url || '🏎️'}</span>
                                <div>
                                    <h3 className="font-bold">{driver.name}</h3>
                                    {driver.team && <p className="text-sm text-gray-400">{driver.team}</p>}
                                </div>
                            </div>
                            {driver.psn_id && (
                                <p className="text-sm text-gray-500 mb-3">🎮 {driver.psn_id}</p>
                            )}
                            <div className="flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-gray-800 rounded text-sm hover:bg-gray-700 transition-colors">
                                    Edit
                                </button>
                                <button className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-400">
                    <p>No drivers yet. Add drivers to start building your league!</p>
                </div>
            )}
        </div>
    )
}

function ResultsEntry({ events, drivers }: { events: Event[], drivers: Driver[] }) {
    const completableEvents = events.filter(e => e.status !== 'completed')

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Enter Race Results</h2>

            {completableEvents.length > 0 ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            Select Event
                        </label>
                        <select className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-red-500 focus:outline-none">
                            <option value="">Choose an event...</option>
                            {completableEvents.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.name} - {event.track}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                        <h3 className="font-bold mb-4">Race Positions</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Select an event above to enter results. You'll be able to drag and drop drivers to set their finishing positions.
                        </p>
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-2">🏁</div>
                            <p>Results entry interface will appear here</p>
                        </div>
                    </div>

                    <button className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all">
                        Save Results
                    </button>
                </div>
            ) : (
                <div className="text-center py-12 text-gray-400">
                    <p>No events available for results entry. All events are completed or create a new event first.</p>
                </div>
            )}
        </div>
    )
}
