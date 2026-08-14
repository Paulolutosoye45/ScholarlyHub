import { ClipboardList } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="font-semibold text-[15px] text-gray-800 mb-1">Select an application</h3>
      <p className="text-[13px] text-gray-400 max-w-xs leading-relaxed">
        Choose a school from the list on the left to review their documents and take action.
      </p>
    </div>
  );
}
