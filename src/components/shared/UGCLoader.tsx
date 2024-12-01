import React from 'react'
import { useLocation } from 'react-router-dom'
import imgSrc from '../../assets/animation/Loading_Animation-Transparent.gif'

const UGCLoader: React.FC = () => {
	const location = useLocation()
	const isRootRoute = location.pathname === '/'

	return (
		<div className={`fixed inset-0 flex items-center justify-center ${isRootRoute ? 'left-0' : 'left-64'}`}>
			<img src={imgSrc} alt="Loading animation" className="h-64 opacity-20" />
		</div>
	)
}

export default UGCLoader
