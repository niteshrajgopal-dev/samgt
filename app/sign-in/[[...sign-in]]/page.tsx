import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">GT7 RACING LEAGUE</h1>
                    <p className="text-gray-400">Sign in to your account</p>
                </div>
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "bg-gray-900 border border-gray-800",
                        }
                    }}
                />
            </div>
        </div>
    )
}
