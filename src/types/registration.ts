export interface Step1Form {
  schoolName: string;
  schoolLogo: File | null;
  schoolAddress: string;
  country: string;
  state: string;
  city: string;
  branch: string;
  schoolCode: string;
}

export interface Step2Form {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleDescription: string;
  username: string;
  secretPhrase: string;
}
