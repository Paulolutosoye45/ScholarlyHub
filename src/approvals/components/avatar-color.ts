const AVATAR_COLORS = [
  '#D84040', '#1E2D5A', '#2563EB', '#7C3AED',
  '#059669', '#0891B2', '#EA580C', '#D97706',
];

export function getAvatarColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}