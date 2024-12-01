import { FormSection, CreatorPreferences } from '@/components/pages/Flo'
import { useFloStore } from '@/store/floStore'
import { useScrollToError } from '@/utils/hooks/useScrollToError'

export function CreatorPreferencesStep() {
	const { errors, nextStep, prevStep } = useFloStore()
	const { registerRef } = useScrollToError(errors)

	return (
		<div className="space-y-8">
			<FormSection
				ref={el => registerRef('creatorPreferences', el)}
				title="Creator Preferences"
				description="What type of creator are you looking for? Try to keep your main audience in mind."
				error={errors['creatorPreferences.otherPreferences']}
			>
				<CreatorPreferences />
			</FormSection>

			<div className="flex justify-between">
				<button onClick={prevStep} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
					Previous
				</button>
				<button onClick={nextStep} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
					Next Step
				</button>
			</div>
		</div>
	)
}
