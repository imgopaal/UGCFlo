

import { TotalPrice } from '@/components/pages/Flo'
import { useFloStore } from '@/store/floStore'

export function ReviewStep() {
  const { formData, isLoading, calculatePrice, saveDraft, completeOrder, prevStep } = useFloStore()
  const totalPrice = calculatePrice()

  return (
    <div className="space-y-8">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Title</h3>
            <p>{formData.title}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Video Type</h3>
            <p>{formData.videoType}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Number of Videos</h3>
            <p>{formData.videoCount}</p>
          </div>
          
          <div>
            <h3 className="font-medium">Creator Preferences</h3>
            <p>{formData.creatorPreferences.otherPreferences}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Previous
        </button>
        
        <TotalPrice
          price={totalPrice}
          isLoading={isLoading}
          onSaveDraft={saveDraft}
          onCompleteOrder={completeOrder}
        />
      </div>
    </div>
  )
}