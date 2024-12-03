import React from 'react';
import { UserCircle2, Building2 } from 'lucide-react';

interface ViewToggleProps {
  view: 'creator' | 'brand';
  onViewChange: (view: 'creator' | 'brand') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onViewChange('creator')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
          view === 'creator'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <UserCircle2 className="w-4 h-4" />
        <span>Creator</span>
      </button>
      <button
        onClick={() => onViewChange('brand')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
          view === 'brand'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Building2 className="w-4 h-4" />
        <span>Brand</span>
      </button>
    </div>
  );
}