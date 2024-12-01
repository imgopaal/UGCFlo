

import { FormSection, RadioCard } from '@/components/pages/Flo'
import { useFloStore } from '@/store/floStore'
import { useScrollToError } from '@/utils/hooks/useScrollToError'
import { videoTypes } from '@/mock/data/commonData'

export function VideoTypeStep() {
  const { formData, errors, setField, nextStep, prevStep } = useFloStore()
  const { registerRef } = useScrollToError(errors)

  return (
    <div className="space-y-8">
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
              onChange={() => setField('videoType', type.title)}
            />
          ))}
        </div>
      </FormSection>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Next Step
        </button>
      </div>
    </div>
  )
}