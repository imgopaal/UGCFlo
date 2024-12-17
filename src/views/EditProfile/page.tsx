import { useState } from 'react'
import { Camera, Shield, Share2, Upload, User } from 'lucide-react'

import { Button } from '@/components/shadcn/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'
import { Switch } from '@/components/shadcn/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import { Textarea } from '@/components/shadcn/ui/textarea'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import { Badge } from '@/components/shadcn/ui/badge'

export default function EditProfile() {
	const [isPublic, setIsPublic] = useState(false)
	const [isVerified, setIsVerified] = useState(false)
	const [activeTab, setActiveTab] = useState('personal')

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
					{isVerified && (
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
							<DropdownMenuItem>Copy Profile Link</DropdownMenuItem>
							<DropdownMenuItem>Share to Twitter</DropdownMenuItem>
							<DropdownMenuItem>Share to Instagram</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList>
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
						<CardContent className="space-y-6">
							<div className="flex items-center gap-6">
								<div className="relative">
									<div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
										<User className="w-10 h-10 text-muted-foreground" />
									</div>
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
										<Switch checked={isPublic} onCheckedChange={setIsPublic} />
									</div>
								</div>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="firstName">First Name</Label>
									<Input id="firstName" placeholder="John" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">Last Name</Label>
									<Input id="lastName" placeholder="Doe" />
								</div>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="email">Email Address</Label>
									<Input id="email" type="email" placeholder="john@example.com" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="bio">About</Label>
								<Textarea id="bio" placeholder="Tell us about yourself" className="min-h-[100px]" />
							</div>

							<Button>Update Profile</Button>
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
										<p className="text-sm text-muted-foreground">
											Drag and drop your photos or videos here
										</p>
										<Button variant="secondary">Browse Files</Button>
									</div>
								</div>

								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{/* Placeholder for portfolio items */}
									{Array.from({ length: 6 }).map((_, i) => (
										<div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
									))}
								</div>
							</div>
						</CardContent>
					</Card>
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
		</div>
	)
}
