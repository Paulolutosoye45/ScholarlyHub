
export type ApprovalStatus = "pending" | "approved" | "rejected";
export function normaliseStatus(status: string): ApprovalStatus {
  return (status?.toLowerCase() ?? 'pending') as ApprovalStatus;
}

export interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  url: string;
}

export interface SchoolApplication {
  id: string;
  schoolName: string;
  location: string | null;
  address: string;
  tenantIdentifier: string;
  schoolCode: string;
  logoUrl: string;
  logoPublicId: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminUsername: string;
  status: ApprovalStatus;
  rejectionReason: string | null;
  createdAt: string;
  respondedAt: string | null;
  hasBranch: boolean
}
