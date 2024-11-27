import { Radio } from '@/components/ui'
import { LucideIcon } from 'lucide-react'

interface RadioCardProps {
	id: string
	name: string
	title: string
	description: string
	icon: LucideIcon
	price?: string
	onChange?: () => void
}

export function RadioCard({ id, name, title, description, icon: Icon, price, onChange }: RadioCardProps) {
	return (
		<div className="flex items-center space-x-4 border rounded-lg p-4 bg-white cursor-pointer">
			<Radio id={id} name={name} onChange={onChange} />
			<label htmlFor={id} className="flex items-center justify-between gap-4 flex-1 cursor-pointer">
				<div>
					<div className="font-medium text-md text-gray-700">{title}</div>
					<p className="text-sm text-gray-500">{description}</p>
					{price && <div className="text-xs text-gray-500 mt-1">{price}</div>}
				</div>
				<Icon className="w-8 h-8 text-gray-700" />
			</label>
		</div>
	)
}
