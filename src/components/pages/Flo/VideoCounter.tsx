import { Button } from "@/components/ui"

interface VideoCounterProps {
	count: number
	onIncrement: () => void
	onDecrement: () => void
}

export function VideoCounter({ count, onIncrement, onDecrement }: VideoCounterProps) {
	return (
		<div className="flex items-center gap-4">
			<Button className="w-8 h-8 flex items-center justify-center border rounded-md" onClick={onDecrement}>
				-
			</Button>
			<span className="text-xl font-medium">{count}</span>
			<Button className="w-8 h-8 flex items-center justify-center border rounded-md" onClick={onIncrement}>
				+
			</Button>
		</div>
	)
}
