interface SchoolAvatarProps {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE = { sm: 'w-9 h-9 text-sm', md: 'w-11 h-11 text-base', lg: 'w-14 h-14 text-lg' };

export function SchoolAvatar({ initials, color, size = 'md' }: SchoolAvatarProps) {
  return (
    <div
      className={`${SIZE[size]} rounded-xl flex items-center justify-center font-bold text-white shrink-0`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
