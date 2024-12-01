import ActionLink from '@/components/shared/ActionLink'
import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import { useThemeStore } from '@/store/themeStore'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import SignUpForm from './components/SignUpForm'

type SignUpProps = {
	disableSubmit?: boolean
	signInUrl?: string
}

export const SignUpBase = ({ signInUrl = '/sign-in', disableSubmit }: SignUpProps) => {
	const [message, setMessage] = useTimeOutMessage()
	const mode = useThemeStore(state => state.mode)

	return (
		<>
			<div className="mb-4 flex items-center w-full justify-center">
				<Logo type="streamline" mode={mode} imgClass="mx-auto" logoWidth={120} />
			</div>
			{message && (
				<Alert showIcon className="mb-4" type="danger">
					<span className="break-all">{message}</span>
				</Alert>
			)}
			<SignUpForm disableSubmit={disableSubmit} setMessage={setMessage} />
			<div className="mt-6 text-center">
				<span>Already have an account? </span>
				<ActionLink to={signInUrl} className="heading-text font-bold" themeColor={false}>
					Sign in
				</ActionLink>
			</div>
		</>
	)
}

const SignUp = () => {
	return <SignUpBase />
}

export default SignUp
