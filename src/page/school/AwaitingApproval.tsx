// pages/AwaitingApproval.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, CheckCircle2, Mail, ShieldCheck, } from "lucide-react";

const approval = false; // ← flip to true to see approved state

const steps = [
    { label: "Application Submitted",   done: true  },
    { label: "Under Review",            done: false },
    { label: "Approval Decision",       done: false },
    { label: "Account Activated",       done: false },
];

const AwaitingApproval = () => {
    const navigate = useNavigate();
    const [dots, setDots] = useState(".");

    // animated dots
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(d => d.length >= 3 ? "." : d + ".");
        }, 600);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (approval) navigate("/dashboard", { replace: true });
    }, []);

    return (
        <div className="min-h-screen bg-[#EEEDF9] flex items-center justify-center p-4 font-Poppins">
            <div className="w-full max-w-lg">

                {/* Card */}
                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">

                    {/* Top banner */}
                    <div className="bg-[#292382] px-6 py-8 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-white font-bold text-xl">
                            Application Under Review
                        </h1>
                        <p className="text-white/60 text-sm mt-1.5 max-w-xs">
                            Your school registration has been received and is being reviewed by our team
                        </p>
                    </div>

                    <div className="px-6 py-6 space-y-6">

                        {/* Status badge */}
                        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                <span className="text-amber-700 font-semibold text-sm">
                                    Status: Pending Review{dots}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide bg-amber-100 px-2 py-1 rounded-full">
                                In Progress
                            </span>
                        </div>

                        {/* Progress timeline */}
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                                Application Progress
                            </p>
                            {steps.map((s, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    {/* Icon */}
                                    <div className="flex flex-col items-center">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                            s.done
                                                ? "bg-[#292382]"
                                                : i === 1
                                                    ? "bg-amber-400"
                                                    : "bg-gray-100"
                                        }`}>
                                            {s.done ? (
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            ) : i === 1 ? (
                                                <Clock className="w-3.5 h-3.5 text-white" />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-gray-300" />
                                            )}
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className={`w-px h-6 mt-1 ${s.done ? "bg-[#292382]/30" : "bg-gray-100"}`} />
                                        )}
                                    </div>

                                    {/* Label */}
                                    <div className="pt-1 pb-4">
                                        <p className={`text-sm font-semibold ${
                                            s.done
                                                ? "text-[#292382]"
                                                : i === 1
                                                    ? "text-amber-600"
                                                    : "text-gray-300"
                                        }`}>
                                            {s.label}
                                        </p>
                                        {i === 0 && (
                                            <p className="text-[11px] text-gray-400 mt-0.5">
                                                {new Date().toLocaleDateString('en-GB', {
                                                    day: 'numeric', month: 'long', year: 'numeric'
                                                })}
                                            </p>
                                        )}
                                        {i === 1 && (
                                            <p className="text-[11px] text-amber-500 mt-0.5">
                                                Usually takes 1–2 business days
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info cards */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    icon: <Mail className="w-4 h-4 text-[#292382]" />,
                                    title: "Check your email",
                                    desc: "We'll notify you once your application is approved",
                                },
                                {
                                    icon: <ShieldCheck className="w-4 h-4 text-[#292382]" />,
                                    title: "Secure review",
                                    desc: "Our team verifies all school registrations manually",
                                },
                            ].map((card, i) => (
                                <div key={i} className="bg-[#EEEDF9] rounded-xl p-3.5 space-y-1.5">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                        {card.icon}
                                    </div>
                                    <p className="text-xs font-semibold text-[#292382]">{card.title}</p>
                                    <p className="text-[10px] text-gray-400 leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Footer actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <p className="text-[11px] text-gray-400">
                                Need help? <a href="mailto:support@bluethub.com" className="text-[#292382] font-semibold underline">Contact support</a>
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-[11px] font-semibold text-[#292382] hover:opacity-70 transition-opacity flex items-center gap-1"
                            >
                                <Clock className="w-3 h-3" />
                                Refresh status
                            </button>
                        </div>
                    </div>
                </div>

                {/* Subtext */}
                <p className="text-center text-xs text-gray-400 mt-4">
                    Bluethub School Management · Secure Registration
                </p>
            </div>
        </div>
    );
};

export default AwaitingApproval;