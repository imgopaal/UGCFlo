import {
	BackButton,
	CreatorPreferences,
	FormSection,
	RadioCard,
	TotalPrice,
	VideoCounter,
} from '@/components/pages/Flo'
import UGCLoader from '@/components/shared/UGCLoader'
import { Input } from '@/components/ui'
import { videoTypes } from '@/mock/data/commonData'

import { useFloStore } from '@/store/floStore'
import { useScrollToError } from '@/utils/hooks/useScrollToError'

import { Toaster } from 'react-hot-toast'

export default function CreateFlo() {
	const { formData, errors, isLoading, setField, calculatePrice, saveDraft, completeOrder } = useFloStore()

	const { registerRef } = useScrollToError(errors)

	const totalPrice = calculatePrice()

	const handleVideoTypeChange = (type: string) => {
		setField('videoType', type)
	}

	const handleCompleteOrder = async () => {
		await completeOrder()
	}

	return (
		<div className="flex-1 px-8 py-6 max-w-4xl">
			<Toaster position="bottom-right" />
			<BackButton />
			<h1 className="text-2xl font-semibold mb-8">Create Flo</h1>

			<div className="space-y-8">
				<FormSection
					ref={el => registerRef('title', el)}
					title="Title"
					description="This information will not be visible to creators. Creators will only see your brand and product details."
					error={errors.title}
				>
					<Input
						type="text"
						value={formData.title}
						placeholder="Example: First Flo"
						className="bg-white w-full max-w-xl px-3 py-2 border border-gray-300 rounded-md"
						onChange={e => setField('title', e.target.value)}
					/>
				</FormSection>

				<FormSection
					ref={el => registerRef('videoType', el)}
					title="Video Type"
					description="Don't be afraid to experiment and try different things to see what your audience responds to."
					error={errors.videoType}
				>
					<div className="space-y-4">
						{videoTypes.map((type, index) => (
							<RadioCard
								key={index}
								id={`video-type-${index}`}
								name="video-type"
								icon={type.icon}
								title={type.title}
								description={type.description}
								onChange={() => handleVideoTypeChange(type.title)}
							/>
						))}
					</div>
				</FormSection>

				<FormSection
					ref={el => registerRef('videoCount', el)}
					title="Videos"
					description="How many videos would you like? You will be free multiple videos."
					error={errors.videoCount}
				>
					<VideoCounter
						count={formData.videoCount}
						onIncrement={() => setField('videoCount', formData.videoCount + 1)}
						onDecrement={() => setField('videoCount', Math.max(1, formData.videoCount - 1))}
					/>
				</FormSection>

				<FormSection
					ref={el => registerRef('creatorPreferences', el)}
					title="Creator Preferences"
					description="What type of creator are you looking for? Try to keep your main audience in mind."
					error={errors['creatorPreferences.otherPreferences']}
				>
					<CreatorPreferences />
				</FormSection>

				<TotalPrice
					price={totalPrice}
					isLoading={isLoading}
					onSaveDraft={saveDraft}
					onCompleteOrder={handleCompleteOrder}
				/>
			</div>
		</div>
	)
}
