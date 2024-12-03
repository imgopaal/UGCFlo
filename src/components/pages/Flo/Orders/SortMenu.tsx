import React from 'react'
import { ChevronDown } from 'lucide-react'
import { SortOption } from '@/views/Orders/types'
import { Button } from '@/components/ui'

interface SortMenuProps {
	onSort: (sort: SortOption) => void
	currentSort: SortOption
}

export function SortMenu({ onSort, currentSort }: SortMenuProps) {
	const [isOpen, setIsOpen] = React.useState(false)

	const sortOptions: Array<{ label: string; value: SortOption }> = [
		{ label: 'Deadline (Earliest)', value: { field: 'deadline', direction: 'asc' } },
		{ label: 'Deadline (Latest)', value: { field: 'deadline', direction: 'desc' } },
		{ label: 'Budget (Low to High)', value: { field: 'budget', direction: 'asc' } },
		{ label: 'Budget (High to Low)', value: { field: 'budget', direction: 'desc' } },
		{ label: 'Title (A-Z)', value: { field: 'title', direction: 'asc' } },
		{ label: 'Title (Z-A)', value: { field: 'title', direction: 'desc' } },
	]

	return (
		<div className="relative">
			<Button
				className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>Sort by</span>
				<ChevronDown className="w-4 h-4" />
			</Button>

			{isOpen && (
				<div className="p-2 absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
					<div className="py-1 flex flex-col gap-2">
						{sortOptions.map(option => (
							<Button
								key={`${option.value.field}-${option.value.direction}`}
								variant="plain"
								className={`block w-full text-left px-4 py-2 text-sm ${
									currentSort.field === option.value.field &&
									currentSort.direction === option.value.direction
										? 'bg-blue-50 text-blue-700'
										: 'text-gray-700 hover:bg-gray-50'
								}`}
								onClick={() => {
									onSort(option.value)
									setIsOpen(false)
								}}
							>
								{option.label}
							</Button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
