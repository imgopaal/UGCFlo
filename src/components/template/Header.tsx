import classNames from '@/utils/classNames'
import { HEADER_HEIGHT } from '@/constants/theme.constant'
import { useMemo, type ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'
import { useLocation } from 'react-router-dom'

interface HeaderProps extends CommonProps {
    headerStart?: ReactNode
    headerEnd?: ReactNode
    headerMiddle?: ReactNode
    container?: boolean
    wrapperClass?: string
}

const Header = (props: HeaderProps) => {
    const {
        headerStart,
        headerEnd,
        headerMiddle,
        className,
        container,
        wrapperClass,
    } = props

    const location = useLocation();
    const pathname = useMemo(() => {
    return location.pathname.replace(/^\/|\/+/g, (match, index) => {
        return index === 0 ? '' : ' > ';
    });
    }, [location.pathname]);
      
    return (
        <header className={classNames('header', className)}>
            <div
                className={classNames(
                    'header-wrapper',
                    container && 'container mx-auto',
                    wrapperClass,
                )}
                style={{ height: HEADER_HEIGHT }}
            >
                <div className="header-action header-action-start">
                    {headerStart}
                    <h1 className="text-2xl capitalize font-bold text-gray-900">{pathname}</h1>
                </div>
                {headerMiddle && (
                    <div className="header-action header-action-middle">
                        {headerMiddle}
                    </div>
                )}
                <div className="header-action header-action-end">
                    {headerEnd}
                </div>
            </div>
        </header>
    )
}

export default Header
