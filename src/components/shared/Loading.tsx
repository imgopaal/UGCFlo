import Spinner from '@/components/ui/Spinner'
import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'
import type { ElementType, ReactNode } from 'react'
import UGCLoader from './UGCLoader'

interface BaseLoadingProps extends CommonProps {
	asElement?: ElementType
	customLoader?: ReactNode
	loading: boolean
	spinnerClass?: string
}

interface LoadingProps extends BaseLoadingProps {
	type?: 'default' | 'cover'
}

const DefaultLoading = (props: BaseLoadingProps) => {
	const { loading, children, spinnerClass, className, asElement: Component = 'div', customLoader } = props

	return loading ? (
		<Component className={classNames(!customLoader && 'flex items-center justify-center h-full', className)}>
			{customLoader ? <>{customLoader}</> : <Spinner className={spinnerClass} size={40} />}
		</Component>
	) : (
		<>{children}</>
	)
}

const Loading = ({ loading = false, asElement = 'div', ...rest }: LoadingProps) => {
	return <DefaultLoading loading={loading} asElement={asElement} customLoader={<UGCLoader />} {...rest} />
}

export default Loading
