import React from 'react'
import { X } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { OrderFilters } from '@/views/Orders/types'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
	filters: OrderFilters
	onApplyFilters: (filters: OrderFilters) => void
}

export function FilterModal({ isOpen, onClose, filters, onApplyFilters }: FilterModalProps) {
	const [localFilters, setLocalFilters] = React.useState<OrderFilters>(filters)

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">Filters</h3>
					<button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
						<div className="space-y-2">
							{['active', 'in_review', 'completed', 'draft'].map(status => (
								<label key={status} className="flex items-center">
									<input
										type="checkbox"
										checked={localFilters.status?.includes(status) || false}
										className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
										onChange={e => {
											const newStatus = e.target.checked
												? [...(localFilters.status || []), status]
												: (localFilters.status || []).filter(s => s !== status)
											setLocalFilters({ ...localFilters, status: newStatus })
										}}
									/>
									<span className="ml-2 text-sm text-gray-600">
										{status
											.split('_')
											.map(word => word.charAt(0).toUpperCase() + word.slice(1))
											.join(' ')}
									</span>
								</label>
							))}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Input
									type="number"
									placeholder="Min"
									value={localFilters.minBudget || ''}
									className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									onChange={e =>
										setLocalFilters({
											...localFilters,
											minBudget: parseInt(e.target.value) || undefined,
										})
									}
								/>
							</div>
							<div>
								<Input
									type="number"
									placeholder="Max"
									value={localFilters.maxBudget || ''}
									className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									onChange={e =>
										setLocalFilters({
											...localFilters,
											maxBudget: parseInt(e.target.value) || undefined,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Deadline Before</label>
						<Input
							type="date"
							value={localFilters.deadline || ''}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							onChange={e =>
								setLocalFilters({
									...localFilters,
									deadline: e.target.value || undefined,
								})
							}
						/>
					</div>
				</div>

				<div className="mt-6 flex justify-end gap-3">
					<Button
						className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
						onClick={() => {
							setLocalFilters({})
							onApplyFilters({})
						}}
					>
						Clear All
					</Button>
					<Button
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						onClick={() => onApplyFilters(localFilters)}
					>
						Apply Filters
					</Button>
				</div>
			</div>
		</div>
	)
}
