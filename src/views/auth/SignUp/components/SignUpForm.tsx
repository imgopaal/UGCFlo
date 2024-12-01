import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { SignUpType, signupTypesArray } from '@/@types/auth'

interface SignUpFormProps extends CommonProps {
	disableSubmit?: boolean
	setMessage?: (message: string) => void
}

type SignUpFormSchema = {
	userName: string
	password: string
	email: string
	confirmPassword: string
	userType: SignUpType
}

const validationSchema: ZodType<SignUpFormSchema> = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		userName: z.string().min(1, { message: 'Please enter your name' }),
		password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
		confirmPassword: z.string().min(6, { message: 'Confirm Password Required' }),
		userType: z
			.enum(['creator', 'brand'], { required_error: 'User type is required' })
			.refine(value => ['creator', 'brand'].includes(value), { message: 'Invalid user type' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

const SignUpForm = (props: SignUpFormProps) => {
	const { disableSubmit = false, className, setMessage } = props

	const [isSubmitting, setSubmitting] = useState<boolean>(false)
	const [signUpType, setSignUpType] = useState<SignUpType>('brand')

	const { signUp } = useAuth()

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<SignUpFormSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			userType: signUpType,
		},
	})

	const onSignUp = async (values: SignUpFormSchema) => {
		const { userName, password, email, userType } = values

		if (!signupTypesArray.includes(userType)) {
			setMessage?.('Invalid user type selected')
			return
		}

		if (!disableSubmit) {
			setSubmitting(true)
			const result = await signUp({ userName, password, email, userType })

			if (result?.status === 'failed') {
				setMessage?.(result.message)
			}

			setSubmitting(false)
		}
	}

	return (
		<div className={className}>
			<div className="mb-8">
				<h4 className="mb-0 text-center">Create an Account As</h4>
				<FormItem invalid={Boolean(errors.userType)} errorMessage={'Please select the Signup Type'}>
					<input type="hidden" value={signUpType} {...control.register('userType', { required: true })} />
				</FormItem>
				<div className="w-full flex gap-2">
					{signupTypesArray.map(type => (
						<Button
							key={type}
							variant={signUpType === type ? 'solid' : 'default'}
							active={signUpType === type}
							className="capitalize w-1/2"
							onClick={() => {
								if (signUpType !== type) setSignUpType(type)
							}}
						>
							{type}
						</Button>
					))}
				</div>
			</div>
			<Form onSubmit={handleSubmit(onSignUp)}>
				<FormItem label="User name" invalid={Boolean(errors.userName)} errorMessage={errors.userName?.message}>
					<Controller
						name="userName"
						control={control}
						render={({ field }) => (
							<Input size="sm" type="text" placeholder="User Name" autoComplete="off" {...field} />
						)}
					/>
				</FormItem>
				<FormItem label="Email" invalid={Boolean(errors.email)} errorMessage={errors.email?.message}>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<Input size="sm" type="email" placeholder="Email" autoComplete="off" {...field} />
						)}
					/>
				</FormItem>
				<FormItem label="Password" invalid={Boolean(errors.password)} errorMessage={errors.password?.message}>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<Input size="sm" type="password" autoComplete="off" placeholder="Password" {...field} />
						)}
					/>
				</FormItem>
				<FormItem
					label="Confirm Password"
					invalid={Boolean(errors.confirmPassword)}
					errorMessage={errors.confirmPassword?.message}
				>
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field }) => (
							<Input
								size="sm"
								type="password"
								autoComplete="off"
								placeholder="Confirm Password"
								{...field}
							/>
						)}
					/>
				</FormItem>

				<Button block loading={isSubmitting} variant="solid" type="submit">
					{isSubmitting ? 'Creating Account...' : 'Sign Up'}
				</Button>
			</Form>
		</div>
	)
}

export default SignUpForm
