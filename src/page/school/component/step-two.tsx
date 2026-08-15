import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircleChevronLeft, User } from "lucide-react";
import { Field } from "./field";
import { Input } from "./input";
import { step2Schema, type Step2FormData } from "./schemas";
import type { Step2Form } from "@/types/registration";
import { useEffect } from "react";

const StepTwo = ({
  form,
  onNext,
  onBack,
  schoolName,
}: {
  form: Step2Form;
  onNext: (data: Step2Form) => void;
  onBack: () => void;
  schoolName: string;
}) => {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: yupResolver(step2Schema) as any,
    defaultValues: {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      roleDescription: form.roleDescription,
      username: form.username,
    },
    mode: "onChange",
  });

  
  const watchedFirst = watch("firstName");
  const watchedLast = watch("lastName");

  const generatedUsername = watchedFirst && watchedLast
    ? `${watchedFirst.replace(/\s+/g, "")}.${watchedLast.replace(/\s+/g, "")}`.toLowerCase()
    : "";

  useEffect(() => {
    setValue("username", generatedUsername, { shouldValidate: true });
  }, [generatedUsername, setValue]);

  const onSubmit = (data: Step2FormData) => {
    onNext({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone ?? "",
      roleDescription: data.roleDescription ?? "",
      username: generatedUsername,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div>
        <h2 className="text-base font-semibold font-space-grotesk text-gray-800">Create admin credentials</h2>
        <p className="text-xs font-space-grotesk text-gray-400 mt-1">
          This account will have full administrative control over your school. You can add other users and roles later from the dashboard.
        </p>
      </div>

      {/* Personal Identity */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-normal text-[#6B7280] font-space-grotesk">Personal Identity</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="First Name" required error={errors.firstName?.message}>
            <Input
              placeholder="eg Amara"
              value={watch("firstName")}
              onChange={(v) => setValue("firstName", v, { shouldValidate: true })}
              error={!!errors.firstName}
            />
          </Field>
          <Field label="Last Name" required error={errors.lastName?.message}>
            <Input
              placeholder="eg Bob"
              value={watch("lastName")}
              onChange={(v) => setValue("lastName", v, { shouldValidate: true })}
              error={!!errors.lastName}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Email address" required error={errors.email?.message}>
            <Input
              placeholder="eg amarabob@blutthub.com"
              type="email"
              value={watch("email")}
              onChange={(v) => setValue("email", v, { shouldValidate: true })}
              error={!!errors.email}
            />
          </Field>
          <Field label="Phone" optional>
            <Input
              placeholder="+234 9000 0000 00"
              type="tel"
              value={watch("phone") ?? ""}
              onChange={(v) => setValue("phone", v)}
            />
          </Field>
        </div>

        <Field label="Role description" optional>
          <Input
            placeholder="eg super admin, head-teacher and principal"
            value={watch("roleDescription") ?? ""}
            onChange={(v) => setValue("roleDescription", v)}
          />
        </Field>

        <Field label="Username" required error={errors.username?.message}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <User size={13} />
            </div>
            <input
              readOnly
              value={generatedUsername}
              placeholder={generatedUsername ? "" : "Fill in first & last name"}
              className="w-full h-10 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm pl-9 pr-4 cursor-not-allowed select-all focus:outline-none"
            />
          </div>
        </Field>
      </div>

      <div className="h-px bg-gray-100" />

      {/* School attachment */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-normal text-[#6B7280] font-space-grotesk">School attachment</p>
        <Field label="Attach admin to school" required>
          <Input
            placeholder={schoolName || "Greenwood College"}
            icon={<User size={13} />}
            value={schoolName}
            onChange={() => { }}
          />
        </Field>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Secret phrase */}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 flex items-center gap-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <CircleChevronLeft /> Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#292382] hover:bg-indigo-900 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition-colors text-sm"
        >
          Continue to Approval
        </button>
      </div>
    </form>
  );
};

export default StepTwo;
