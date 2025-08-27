import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: () => void,
    onSignout: () => void,
    onHome?: () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    onHome
}: AppbarProps) => {
    return (
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 px-6 py-4 shadow-lg">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <div 
                    onClick={onHome}
                    className="text-white text-xl font-bold cursor-pointer hover:text-gray-200 transition-colors"
                >
                    BalanceBox
                </div>

                {/* Right side buttons */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-200">Hello, {user.name || "User"}</span>
                            <Button 
                                onClick={onSignout}
                                variant="ghost"
                            >
                                Sign out →
                            </Button>
                        </div>
                    ) : (
                        <Button 
                            onClick={onSignin}
                            variant="primary"
                        >
                            Sign in
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}