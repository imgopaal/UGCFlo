import { useState } from 'react'
import { Camera, Shield, Share2, Upload, User } from 'lucide-react'

import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'
import { Switch } from '@/components/shadcn/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/shadcn/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import { Badge } from '@/components/shadcn/ui/badge'
import { PortfolioWall } from '@/components/pages/EditProfile/PortfolioWall'
import { PublicProfile } from '@/components/pages/EditProfile/PublicProfile'
import { useUser } from '@/store/user'
import UGCLoader from '@/components/shared/UGCLoader'

export default function EditProfile() {
	const { user, loading, updateUser } = useUser()
	const [activeTab, setActiveTab] = useState('personal')
	const [isUpdating, setIsUpdating] = useState(false)
	const [showPublicProfile, setShowPublicProfile] = useState(false)

	const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsUpdating(true)
		const formData = new FormData(event.currentTarget)
		const updatedUser = {
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
			bio: formData.get('bio') as string,
			isPublic: formData.get('isPublic') === 'on',
		}
		await updateUser(updatedUser)
		setIsUpdating(false)
	}

	if (loading) {
		return <UGCLoader />
	}

	if (!user) {
		return <div>Error loading user data</div>
	}

	return (
		<div className="container max-w-4xl py-6 space-y-8">
			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
					<p className="text-muted-foreground">
						Manage your profile, verification status and account settings
					</p>
				</div>
				<div className="flex items-center gap-4">
					{user.isVerified && (
						<Badge variant="secondary" className="gap-1">
							<Shield className="w-3 h-3" />
							Verified Creator
						</Badge>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="gap-2">
								<Share2 className="w-4 h-4" />
								Share Profile
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem className="cursor-pointer" onSelect={() => setShowPublicProfile(true)}>
								View Public Profile
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">Copy Profile Link</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">Share to Twitter</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">Share to Instagram</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="grid grid-cols-2 md:grid-cols-4 h-full">
					<TabsTrigger value="personal">Personal Information</TabsTrigger>
					<TabsTrigger value="verification">Verification</TabsTrigger>
					<TabsTrigger value="portfolio">Portfolio</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
				</TabsList>

				<TabsContent value="personal" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
							<CardDescription>
								This information facilitates collaborations and ensures a seamless experience.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleUpdateProfile} className="space-y-6">
								<div className="flex items-center gap-6">
									<div className="relative">
										<img
											src={user.avatar}
											alt={`${user.firstName} ${user.lastName}`}
											className="w-20 h-20 rounded-full object-cover"
										/>
										<Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2">
											<Camera className="w-4 h-4" />
										</Button>
									</div>
									<div className="flex-1">
										<div className="flex items-center justify-between">
											<div className="space-y-1">
												<h4 className="text-sm font-medium">Profile Visibility</h4>
												<p className="text-sm text-muted-foreground">
													Make your profile visible to everyone
												</p>
											</div>
											<Switch
												name="isPublic"
												checked={user.isPublic}
											/>
										</div>
									</div>
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input id="firstName" name="firstName" defaultValue={user.firstName} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input id="lastName" name="lastName" defaultValue={user.lastName} />
									</div>
								</div>

								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="email">Email Address</Label>
										<Input id="email" name="email" type="email" defaultValue={user.email} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="phone">Phone Number</Label>
										<Input id="phone" name="phone" type="tel" defaultValue={user.phone} />
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="bio">About</Label>
									<Textarea id="bio" name="bio" defaultValue={user.bio} className="min-h-[100px]" />
								</div>

								<Button type="submit" disabled={isUpdating}>
									{isUpdating ? 'Updating...' : 'Update Profile'}
								</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="verification" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Creator Verification</CardTitle>
							<CardDescription>
								Verify your identity to unlock additional features and build trust with your audience
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid gap-6">
								<div className="flex items-start gap-4 p-4 border rounded-lg">
									<Shield className="w-6 h-6 mt-1 text-muted-foreground" />
									<div className="space-y-2">
										<h4 className="font-medium">Identity Verification</h4>
										<p className="text-sm text-muted-foreground">
											Upload a government-issued ID to verify your identity
										</p>
										<Button variant="secondary" className="gap-2">
											<Upload className="w-4 h-4" />
											Upload ID
										</Button>
									</div>
								</div>

								<div className="flex items-start gap-4 p-4 border rounded-lg">
									<User className="w-6 h-6 mt-1 text-muted-foreground" />
									<div className="space-y-2">
										<h4 className="font-medium">Selfie Verification</h4>
										<p className="text-sm text-muted-foreground">
											Take a selfie to confirm your identity matches your ID
										</p>
										<Button variant="secondary" className="gap-2">
											<Camera className="w-4 h-4" />
											Take Selfie
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="portfolio" className="space-y-4">
					<PortfolioWall user={user} updateUser={updateUser} />
				</TabsContent>

				<TabsContent value="notifications" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Notification Preferences</CardTitle>
							<CardDescription>Choose what updates you want to hear about</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								{[
									{
										title: 'Marketing',
										description: 'Receive updates about new features and announcements',
									},
									{
										title: 'Portfolio Comments',
										description: 'Get notified when someone comments on your work',
									},
									{
										title: 'Verification Updates',
										description: 'Updates about your verification status',
									},
								].map(item => (
									<div key={item.title} className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label>{item.title}</Label>
											<p className="text-sm text-muted-foreground">{item.description}</p>
										</div>
										<Switch />
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<Dialog open={showPublicProfile} onOpenChange={setShowPublicProfile}>
				<DialogContent className="min-w-[80vw] max-w-[95vw] max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Public Profile</DialogTitle>
						<DialogDescription>This is how your profile appears to the public</DialogDescription>
					</DialogHeader>
					<PublicProfile user={user} />
				</DialogContent>
			</Dialog>
		</div>
	)
}
