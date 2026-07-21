// pages/NotFound.tsx
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#EEEDF9] flex items-center justify-center p-4 font-Poppins">
            <div className="text-center space-y-6 max-w-md">

                {/* 404 */}
                <div className="relative">
                    <h1 className="text-[120px] font-black text-[#292382]/10 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-[#292382] flex items-center justify-center shadow-lg">
                            <span className="text-white text-3xl">?</span>
                        </div>
                    </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                    <h2 className="text-[#292382] font-bold text-2xl">Page not found</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 border border-gray-200 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white transition-colors"
                    >
                        <ArrowLeft size={15} />
                        Go back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 bg-[#292382] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        <Home size={15} />
                        Go home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;