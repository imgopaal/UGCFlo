import { User } from '@/views/EditProfile/types'
import { useState, useEffect } from 'react'
import { faker } from '@faker-js/faker';

export function generateMockUser(): User {
	const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah']
	const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']

	return {
		id: Math.random().toString(36).substr(2, 9),
		firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
		lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
		email: `${firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()}@example.com`,
		phone: `+1${Math.floor(Math.random() * 1000000000)
			.toString()
			.padStart(10, '0')}`,
		bio: 'This is a randomly generated bio for a mock user profile.',
		isPublic: Math.random() > 0.5,
		isVerified: Math.random() > 0.7,
		avatar: faker.image.avatar(),
		portfolioItems: Array(Math.floor(Math.random() * 6) + 1)
			.fill(null)
			.map((_, index) => ({
				id: index.toString(),
				url: faker.image.avatar(),
				type: 'image',
			})),
	}
}
export function useUser() {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Simulate fetching user data
		setTimeout(() => {
			setUser(generateMockUser())
			setLoading(false)
		}, 1000)
	}, [])

	const updateUser = async (updatedUser: Partial<User>) => {
		setLoading(true)
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500))
		setUser(prevUser => ({ ...prevUser!, ...updatedUser }))
		setLoading(false)
	}

	return { user, loading, updateUser }
}
