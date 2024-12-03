import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';

interface OrderFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  onSortChange: (sort: string) => void;
}

export function OrderFilters({ onSearch, onFilterChange, onSortChange }: OrderFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          onClick={() => onFilterChange({})}
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          onClick={() => onSortChange('deadline')}
        >
          <SortAsc className="w-5 h-5" />
          Sort
        </button>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200">
          All
        </button>
        <button className="px-3 py-1 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100">
          Active
        </button>
        <button className="px-3 py-1 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100">
          In Review
        </button>
        <button className="px-3 py-1 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100">
          Completed
        </button>
      </div>
    </div>
  );
}