import * as React from "react"
import { useForm } from "react-hook-form"
import { platformAdmins } from "@/services/platform"
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, User, Mail, Lock, Shield, AtSign } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  role: string
}

interface CreateUserFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

const ROLES = [
  { value: "admin",       label: "Admin"       },
  { value: "super-admin", label: "Super Admin" },
  { value: "teacher",     label: "Teacher"     },
  { value: "staff",       label: "Staff"       },
]

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
      <div className={`relative flex items-center rounded-xl border bg-white transition-all ${error ? "border-red-300 ring-2 ring-red-100" : "border-gray-200 focus-within:border-[#292382] focus-within:ring-2 focus-within:ring-[#292382]/10"}`}>
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

export function CreateUserForm({ onSuccess, onError }: CreateUserFormProps = {}) {
  const [isLoading,    setIsLoading]    = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [message,      setMessage]      = React.useState<{ text: string; ok: boolean } | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ mode: "onBlur" })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setMessage(null)
    try {
      await platformAdmins.createUser(data)
      setMessage({ text: "User created successfully!", ok: true })
      onSuccess?.()
    } catch (err) {
      const msg =
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        "Failed to create user"
      setMessage({ text: msg, ok: false })
      onError?.(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEDF9] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_4px_16px_0px_rgba(41,35,130,0.08),0_24px_64px_0px_rgba(41,35,130,0.06)] border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-[#292382] px-7 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-[17px]">Create New User</h1>
                <p className="text-white/60 text-[12px] mt-0.5">Fill in the details to add a user to the platform</p>
              </div>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-7 py-6 space-y-4">

            {/* First + Last name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="First Name" required error={errors.firstName?.message} icon={<User className="w-4 h-4" />}>
                <input
                  placeholder="John"
                  {...register("firstName", { required: "First name is required" })}
                  className="w-full pl-9 pr-3.5 py-2.5 text-[13.5px] text-gray-900 bg-transparent outline-none rounded-xl placeholder:text-gray-300"
                />
              </InputField>

              <InputField label="Last Name" required error={errors.lastName?.message} icon={<User className="w-4 h-4" />}>
                <input
                  placeholder="Doe"
                  {...register("lastName", { required: "Last name is required" })}
                  className="w-full pl-9 pr-3.5 py-2.5 text-[13.5px] text-gray-900 bg-transparent outline-none rounded-xl placeholder:text-gray-300"
                />
              </InputField>
            </div>

            {/* Email */}
            <InputField label="Email" required error={errors.email?.message} icon={<Mail className="w-4 h-4" />}>
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                })}
                className="w-full pl-9 pr-3.5 py-2.5 text-[13.5px] text-gray-900 bg-transparent outline-none rounded-xl placeholder:text-gray-300"
              />
            </InputField>

            {/* Username */}
            <InputField label="Username" required error={errors.username?.message} icon={<AtSign className="w-4 h-4" />}>
              <input
                placeholder="johndoe"
                {...register("username", { required: "Username is required" })}
                className="w-full pl-9 pr-3.5 py-2.5 text-[13.5px] text-gray-900 bg-transparent outline-none rounded-xl placeholder:text-gray-300"
              />
            </InputField>

            {/* Password */}
            <InputField label="Password" required error={errors.password?.message} icon={<Lock className="w-4 h-4" />}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
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

            {/* Role */}
            <InputField label="Role" required error={errors.role?.message} icon={<Shield className="w-4 h-4" />}>
              <select
                {...register("role", { required: "Please select a role" })}
                className="w-full pl-9 pr-3.5 py-2.5 text-[13.5px] text-gray-900 bg-transparent outline-none rounded-xl appearance-none cursor-pointer"
              >
                <option value="">Select a role</option>
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </InputField>

            {/* Status message */}
            {message && (
              <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-[12.5px] font-medium ${message.ok ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-600"}`}>
                {message.ok
                  ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                {message.text}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#292382] hover:bg-[#3D36A8] text-white text-[14px] font-semibold transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Creating user...</>
              ) : message?.ok ? (
                <><CheckCircle2 className="w-4 h-4" /> User Created!</>
              ) : (
                "Create User"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}