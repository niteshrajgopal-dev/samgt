import Navigation from '@/components/Navigation'

export default function AdminPage() {
    return (
        <>
            <Navigation />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center py-16">
                        <h1 className="text-5xl font-bold text-gradient mb-4">Admin Dashboard</h1>
                        <p className="text-xl text-gray-400 mb-8">
                            Coming Soon
                        </p>
                        <p className="text-gray-500">
                            The admin dashboard is currently under development.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}
