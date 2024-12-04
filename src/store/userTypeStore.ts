import { create } from 'zustand'

type UserType = 'creator' | 'brand'

interface UserTypeStore {
	view: UserType
	setView: (view: UserType) => void
}

const useUserTypeStore = create<UserTypeStore>(set => ({
	view: 'brand',
	setView: view => set({ view }),
}))

export default useUserTypeStore
