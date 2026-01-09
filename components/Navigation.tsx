'use client'

import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-gradient">
                        GT7 RACING LEAGUE
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/calendar"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Calendar
                        </Link>
                        <Link
                            href="/drivers"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Drivers
                        </Link>
                        <Link
                            href="/standings"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Standings
                        </Link>
                        <Link
                            href="/admin"
                            className="text-orange-500 hover:text-orange-400 transition-colors"
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Auth Button - Simplified */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/sign-in"
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
