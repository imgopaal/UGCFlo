import { useState } from 'react'
import { User, PortfolioItem } from '@/views/EditProfile/types'
import { Upload } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'

interface PortfolioWallProps {
	user: User
	updateUser: (updatedUser: Partial<User>) => Promise<void>
}

export function PortfolioWall({ user, updateUser }: PortfolioWallProps) {
	const [isUploading, setIsUploading] = useState(false)

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		setIsUploading(true)
		// Simulate file upload
		await new Promise(resolve => setTimeout(resolve, 1500))

		const newItem: PortfolioItem = {
			id: Math.random().toString(36).substr(2, 9),
			url: URL.createObjectURL(file),
			type: file.type.startsWith('image/') ? 'image' : 'video',
		}

		await updateUser({
			portfolioItems: [...user.portfolioItems, newItem],
		})
		setIsUploading(false)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Portfolio Wall</CardTitle>
				<CardDescription>Share your work and build your personal brand</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="p-8 text-center border-2 border-dashed rounded-lg">
						<div className="space-y-2">
							<Upload className="w-8 h-8 mx-auto text-muted-foreground" />
							<h3 className="font-medium">Upload Media</h3>
							<p className="text-sm text-muted-foreground">Drag and drop your photos or videos here</p>
							<Button variant="secondary" disabled={isUploading}>
								<label className="cursor-pointer">
									{isUploading ? 'Uploading...' : 'Browse Files'}
									<input
										type="file"
										className="hidden"
										accept="image/*,video/*"
										onChange={handleFileUpload}
										disabled={isUploading}
									/>
								</label>
							</Button>
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{user.portfolioItems.map(item => (
							<div key={item.id} className="aspect-square rounded-lg overflow-hidden">
								{item.type === 'image' ? (
									<img src={item.url} alt="Portfolio item" className="w-full h-full object-cover" />
								) : (
									<video src={item.url} className="w-full h-full object-cover" controls />
								)}
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
