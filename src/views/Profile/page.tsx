import { PublicProfile } from '@/components/pages/EditProfile/PublicProfile'
import { useUser } from '@/store/user'

function Profile() {
	const { user } = useUser()

	return user ? <PublicProfile user={user} /> : ''
}

export default Profile
