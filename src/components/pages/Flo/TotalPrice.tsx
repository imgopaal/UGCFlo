import { Button } from "@/components/ui"

interface TotalPriceProps {
	price: number
	onSaveDraft: () => void
	onCompleteOrder: () => void
	isLoading: boolean
}

export function TotalPrice({ onSaveDraft, onCompleteOrder, isLoading }: TotalPriceProps) {
	return (
		<div className="flex justify-between items-center py-4">
			{/* <div>
				<p className="text-sm text-gray-500">
					You'll be able to make edits to your flo for 24 hours after you complete your order
				</p>
			</div> */}
			<div className="text-right">
				{/* <div className="text-2xl font-bold">A$ {price}</div> */}
				<div className="flex gap-4 mt-2">
					<Button
						disabled={isLoading}
						className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
						onClick={onSaveDraft}
					>
						Save Draft
					</Button>
					<Button
						disabled={isLoading}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:text-white disabled:opacity-50 min-w-[120px]"
						onClick={onCompleteOrder}
					>
						{isLoading ? 'Creating...' : 'Complete Order'}
					</Button>
				</div>
			</div>
		</div>
	)
}
