

import { useFloStore } from '@/store/floStore'
import { BasicInfoStep } from './BasicInfoStep'
import { VideoTypeStep } from './VideoTypeStep'
import { VideoCountStep } from './VideoCountStep'
import { CreatorPreferencesStep } from './CreatorPreferencesStep'
import { ReviewStep } from './ReviewStep'

export function FormSteps() {
  const { currentStep } = useFloStore()

  switch (currentStep) {
    case 0:
      return <BasicInfoStep />
    case 1:
      return <VideoTypeStep />
    case 2:
      return <VideoCountStep />
    case 3:
      return <CreatorPreferencesStep />
    case 4:
      return <ReviewStep />
    default:
      return null
  }
}