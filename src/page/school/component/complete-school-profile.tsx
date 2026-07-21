import { Building2, CheckCircle2 } from "lucide-react";
import LogoUpload from "./logo-upload";
import { useState } from "react";

const CompleteSchoolProfile = () => {
    const [logo, setLogo] = useState<File | null>(null);
    return (
        <div className="flex items-center justify-center h-creen ">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#292382] px-6 py-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-green-300 text-xs font-semibold uppercase tracking-wide">
                                Application Approved
                            </span>
                        </div>
                        <h1 className="text-white font-bold text-xl">
                            Complete Your School Profile
                        </h1>
                        <p className="text-white/60 text-sm mt-1.5 max-w-xs">
                            You're almost there — add your school logo to get started
                        </p>
                    </div>

                    <div className="px-6 py-6 space-y-6">
                        {/* Progress */}
                        <div className="flex items-center gap-3">
                            {["Registration", "Approval", "Profile Setup", "Go Live"].map((s, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <div className={`w-full h-1.5 rounded-full ${
                                        i < 2 ? "bg-[#292382]" : i === 2 ? "bg-[#292382]/40" : "bg-gray-100"
                                    }`} />
                                    <span className={`text-[9px] font-semibold ${
                                        i < 2 ? "text-[#292382]" : i === 2 ? "text-[#292382]/60" : "text-gray-300"
                                    }`}>
                                        {s}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Logo upload */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-[#0F0F0E]">
                                    School Logo
                                </label>
                                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                    Optional
                                </span>
                            </div>
                            <LogoUpload
                                value={logo}
                                onChange={(f) => setLogo(f)}
                            />
                            <p className="text-[10px] text-gray-400">
                                PNG, SVG, JPEG or WEBP · max 200KB · Recommended 200×200px
                            </p>
                        </div>

                        {/* Info */}
                        <div className="bg-[#EEEDF9] rounded-xl px-4 py-3 flex items-start gap-3">
                            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                <Building2 className="w-3.5 h-3.5 text-[#292382]" />
                            </div>
                            <p className="text-[11px] text-gray-500 leading-relaxed">
                                Your logo will appear on student portals, reports, and communications sent from your school.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                onClick={() => console.log('skip')}
                                className="flex-1 border border-gray-200 text-gray-500 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Skip for now
                            </button>
                            <button
                                onClick={() => console.log('save logo', logo)}
                                className="flex-1 bg-[#292382] text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Save & Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteSchoolProfile