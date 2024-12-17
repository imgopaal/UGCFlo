import { User } from '@/views/EditProfile/types'
import { Shield } from 'lucide-react'
import { Badge } from '@/components/shadcn/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'

interface PublicProfileProps {
	user: User
}

export function PublicProfile({ user }: PublicProfileProps) {
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<img
					src={user.avatar}
					alt={`${user.firstName} ${user.lastName}`}
					className="w-20 h-20 rounded-full object-cover"
				/>
				<div>
					<h2 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
					<p className="text-muted-foreground">{user.email}</p>
					{user.isVerified && (
						<Badge variant="secondary" className="gap-1 mt-1">
							<Shield className="w-3 h-3" />
							Verified Creator
						</Badge>
					)}
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>About</CardTitle>
				</CardHeader>
				<CardContent>
					<p>{user.bio}</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Portfolio</CardTitle>
					<CardDescription>Check out my latest work</CardDescription>
				</CardHeader>
				<CardContent>
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
				</CardContent>
			</Card>
		</div>
	)
}
