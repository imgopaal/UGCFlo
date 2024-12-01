

import { FormSection, VideoCounter } from '@/components/pages/Flo'
import { useFloStore } from '@/store/floStore'
import { useScrollToError } from '@/utils/hooks/useScrollToError'

export function VideoCountStep() {
  const { formData, errors, setField, nextStep, prevStep } = useFloStore()
  const { registerRef } = useScrollToError(errors)

  return (
    <div className="space-y-8">
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