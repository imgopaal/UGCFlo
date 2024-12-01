

import { BackButton } from '@/components/pages/Flo'
import { useFloStore } from '@/store/floStore'
import { Toaster } from 'react-hot-toast'
import { FormSteps } from '@/components/pages/Flo/steps'
import { StepIndicator } from '@/components/pages/Flo/StepIndicator'

export default function CreateFlo() {
	const { currentStep } = useFloStore()

	return (
		<div className="flex-1 px-8 py-6 max-w-4xl">
			<Toaster position="bottom-right" />
			<BackButton />

			<div className="mb-8">
				<h1 className="text-2xl font-semibold mb-4">Create Flo</h1>
				<StepIndicator currentStep={currentStep} />
			</div>

			<FormSteps />
		</div>
	)
}
