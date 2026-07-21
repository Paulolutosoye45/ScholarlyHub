import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationSummary from "./component/registration-summary";
import StepOne from "./component/step-one";
import StepTwo from "./component/step-two";
import StepThree from "./component/step-three";
import { schoolService } from "../../services/school";
import type { Step1Form, Step2Form } from "@/types/registration";
import { AxiosError } from "axios";
import { toast } from "sonner";

const STEP_LABELS = ["School Information", "Admin Credentials", "Review & Submit"];
const STEP_PCT = [0, 37, 80];

function StepProgress({ step }: { step: number }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-gray-400 font-space-grotesk">Step {step} of 3 — {STEP_LABELS[step - 1]}</span>
        <span className="text-xs font-semibold text-[#292382] font-space-grotesk">{STEP_PCT[step - 1]}% complete</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#292382] rounded-full transition-all duration-500"
          style={{ width: `${STEP_PCT[step - 1]}%` }}
        />
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function RegisterSchoolPage() {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Form>({
    schoolName: "", schoolLogo: null, schoolAddress: "",
    country: "", state: "", city: "", branch: "", schoolCode: "",
  });
  const [step2, setStep2] = useState<Step2Form>({
    firstName: "", lastName: "", email: "", phone: "",
    roleDescription: "", username: "", secretPhrase: "",

  });

  const handleStep1Next = (data: Step1Form) => {
    setStep1(data);
    setStep(2);
  };

  const handleStep2Next = (data: Step2Form) => {
    setStep2(data);
    setStep(3);
  };

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        logoUrl: "",
        schoolName: step1.schoolName,
        location: `${step1.city}, ${step1.state}, ${step1.country}`,
        countryId: 0,
        stateId: 0,
        state: step1.state,
        address: step1.schoolAddress,
        hasBranch: step1.branch === "Yes",
        tenantIdentifier: "green",
        schoolCode: step1.schoolCode,
        adminFirstName: step2.firstName,
        adminMiddleName: "",
        adminLastName: step2.lastName,
        adminEmail: step2.email,
        adminUsername: step2.username,
        adminPassword: step2.secretPhrase,
      };
      const res = await schoolService.Provision(payload);

      if (!res.data.status) {
        toast.error(res.data.responseMessage || "Something went wrong");
        return;
      }

      toast.success(res.data.responseMessage || "School registered successfully!");

      // reset
      setStep(1);
      setStep1({ schoolName: "", schoolLogo: null, schoolAddress: "", country: "", state: "", city: "", branch: "", schoolCode: "" });
      setStep2({ firstName: "", lastName: "", email: "", phone: "", roleDescription: "", username: "", secretPhrase: "", });

      // navigate("/approval");

    } catch (error) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.responseMessage ??
          error.response?.data?.message ??
          error.message
          : (error as Error).message;
      toast.error(msg || "Failed to register school");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1  flex flex-col overflow-hidden bg-[#EEEDF9]">
      {/* <SchoolTopBar title="Register School" /> */}

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-3 lg:gap-[10px] lg:justify-center p-3 sm:p-5 items-start">
        {/* Left — form */}
        <div className="w-full lg:w-[643px] bg-white rounded-md border border-gray-100 shadow-sm px-4 sm:px-7 py-6 transition-shadow duration-300">
          <StepProgress step={step} />
          <div className="animate-fade-in animate-slide-in-right">
            {step === 1 && <StepOne form={step1} onNext={handleStep1Next} key="step1" />}
            {step === 2 && <StepTwo form={step2} schoolName={step1.schoolName}
              onNext={handleStep2Next} onBack={() => setStep(1)} key="step2" />}
            {step === 3 && <StepThree step1={step1} step2={step2}
              onBack={() => setStep(2)} onSubmit={handleSubmit} submitting={submitting} key="step3" />}
          </div>
        </div>

        {/* Right — summary + help */}
        <div className="w-full lg:w-[462px] lg:sticky lg:top-0 lg:flex-shrink-0 animate-fade-in animate-slide-in-right" style={{ animationDelay: "150ms" }}>
          <RegistrationSummary step1={step1} step2={step2} />
        </div>
      </div>
    </div>
  );
}
