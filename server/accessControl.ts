// Email whitelist for access control
const AUTHORIZED_EMAILS = [
  "drewgodwin@outlook.com",
];

export function isAuthorizedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return AUTHORIZED_EMAILS.includes(email.toLowerCase());
}

export function checkAccess(email: string | null | undefined): void {
  if (!isAuthorizedEmail(email)) {
    throw new Error("Access denied. Your email is not authorized to access this application.");
  }
}
