import * as React from "react"
import { useForm } from "react-hook-form"
import { platformAdmins } from "@/services/platform"
import { Eye, EyeOff, Loader2, AlertCircle, AtSign, Lock, ShieldCheck } from "lucide-react"
import { Hashing } from "@/utils"
import { token, localData } from "@/utils"
import { useNavigate } from "react-router-dom"

function InputField({
  label, required, error, icon, children,
}: {
  label: string; required?: boolean; error?: string; icon: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-[13px] font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`relative flex items-center rounded-xl border bg-white transition-all ${
        error
          ? "border-red-300 ring-2 ring-red-100"
          : "border-gray-200 focus-within:border-[#292382] focus-within:ring-2 focus-within:ring-[#292382]/10"
      }`}>
        <span className="absolute left-3.5 text-gray-400 shrink-0">{icon}</span>
        {children}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-[11.5px] text-red-500">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </p>
      )}
    </div>
  )
}

export function LoginForm({ onError }: { onError?: (error: string) => void } = {}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<{ username: string; password: string }>({
    mode: "onBlur",
  })

  const onSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true)
    setErrorMsg(null)
    const hashedPassword = await Hashing(data.password)
    try {
      const res = await platformAdmins.Login({ ...data, password: hashedPassword })
      if (res.data.status === "failed") return setErrorMsg(res.data.responseMessage)

      const userData = res.data.data as { token: string; tokenExpiresIn: number; user: any }
      token.login(userData.token, userData.tokenExpiresIn)
      localData.save("user", userData.user)

      navigate('/dashboard')
    } catch (err) {
      const msg =
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        "Invalid username or password"
      setErrorMsg(msg)
      onError?.(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEDF9] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_4px_16px_0px_rgba(41,35,130,0.08),0_24px_64px_0px_rgba(41,35,130,0.06)] border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-[#292382] px-7 py-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-white font-bold text-[20px]">Welcome back</h1>
            <p className="text-white/60 text-[13px] mt-1">Sign in to your platform account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-7 py-7 space-y-4">

            {/* Error banner */}
            {errorMsg && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-[12.5px] font-medium text-red-600">{errorMsg}</p>
              </div>
            )}

            {/* Username */}
            <InputField label="Username" required error={errors.username?.message} icon={<AtSign className="w-4 h-4" />}>
              <input
                placeholder="johndoe"
                autoComplete="username"
                {...register("username", { required: "Username is required" })}
                className="w-full pl-9 pr-3.5 py-2.5 text-[13.5px] text-gray-900 bg-transparent outline-none rounded-xl placeholder:text-gray-300"
              />
            </InputField>

            {/* Password */}
            <InputField label="Password" required error={errors.password?.message} icon={<Lock className="w-4 h-4" />}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-9 pr-10 py-2.5 text-[13.5px] text-gray-900 bg-transparent outline-none rounded-xl placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </InputField>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#292382] hover:bg-[#3D36A8] active:bg-[#1E1868] text-white text-[14px] font-semibold transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-[12px] text-gray-400 mt-5">
          Platform administration portal · Access restricted
        </p>
      </div>
    </div>
  )
}