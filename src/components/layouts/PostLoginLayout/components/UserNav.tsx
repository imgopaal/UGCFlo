import { useAuth } from '@/auth'
import { Button } from '@/components/shadcn/ui/button'
import { Card } from '@/components/shadcn/ui/card'
import { Separator } from '@/components/shadcn/ui/separator'
import { useRouteKeyStore } from '@/store/routeKeyStore'
import { LogOut, User, UserPenIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserNav() {
	const { signOut } = useAuth()

	const handleSignOut = () => {
		signOut()
	}

	const currentRouteKey = useRouteKeyStore(state => state.currentRouteKey)

	return (
		<Card className="absolute bottom-0 w-full flex flex-col rounded-none shadow-none border-r-0 bg-white">
			<div className="p-4 bg-gray-50 border-none">
				<div className="space-y-1">
					<h2 className="text-sm font-medium">Gopal Das</h2>
					<p className="text-sm text-muted-foreground">gopaldax@gmail.com</p>
				</div>
			</div>
			<Separator />
			<div className="flex-1 p-4 bg-white">
				<div className="space-y-1">
					<Button
						asChild
						variant="ghost"
						className={`w-full justify-start hover:bg-gray-50 ${currentRouteKey === 'profile' && 'bg-gray-100'}`}
					>
						<Link to="/profile">
							<User className="mr-2 h-4 w-4" />
							Profile
						</Link>
					</Button>
					<Button
						asChild
						variant="ghost"
						className={`w-full justify-start hover:bg-gray-50 ${currentRouteKey === 'edit-profile' && 'bg-gray-100'}`}
					>
						<Link to="/edit-profile">
							<UserPenIcon className="mr-2 h-4 w-4" />
							Edit Profile
						</Link>
					</Button>
				</div>
			</div>
			<Separator />
			<div className="p-4 bg-white">
				<Button
					variant="ghost"
					className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
					onClick={handleSignOut}
				>
					<LogOut className="mr-2 h-4 w-4" />
					Log out
				</Button>
			</div>
		</Card>
	)
}
