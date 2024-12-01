import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import OauthSignIn from './components/OauthSignIn'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'

type SignInProps = {
	signUpUrl?: string
	forgetPasswordUrl?: string
	disableSubmit?: boolean
}

export const SignInBase = ({
	signUpUrl = '/sign-up',
	forgetPasswordUrl = '/forgot-password',
	disableSubmit,
}: SignInProps) => {
	const [message, setMessage] = useTimeOutMessage()

	const mode = useThemeStore(state => state.mode)

	return (
		<>
			<div className="flex flex-col items-center w-full justify-center">
				<div className="mb-4">
					<Logo type="streamline" mode={mode} imgClass="mx-auto" logoWidth={120} />
				</div>
				<div className="mb-10">
					<h4 className="mb-2 text-center">Welcome back!</h4>
					<p className="font-semibold heading-text">Please enter your credentials to sign in!</p>
				</div>
				{message && (
					<Alert showIcon className="mb-4" type="danger">
						<span className="break-all">{message}</span>
					</Alert>
				)}
			</div>
			<SignInForm
				disableSubmit={disableSubmit}
				setMessage={setMessage}
				passwordHint={
					<div className="mb-7 mt-2">
						<ActionLink
							to={forgetPasswordUrl}
							className="font-semibold heading-text mt-2 underline"
							themeColor={false}
						>
							Forgot password
						</ActionLink>
					</div>
				}
			/>
			<div className="mt-8">
				<div className="flex items-center gap-2 mb-6">
					<div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
					<p className="font-semibold heading-text">or countinue with</p>
					<div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
				</div>
				<OauthSignIn disableSubmit={disableSubmit} setMessage={setMessage} />
			</div>
			<div>
				<div className="mt-6 text-center">
					<span>{`Don't have an account yet?`} </span>
					<ActionLink to={signUpUrl} className="heading-text font-bold" themeColor={false}>
						Sign up
					</ActionLink>
				</div>
			</div>
		</>
	)
}

const SignIn = () => {
	return <SignInBase />
}

export default SignIn
