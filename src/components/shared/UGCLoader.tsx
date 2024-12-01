import React, { useEffect, useState } from 'react'
import imgSrc from '../../assets/animation/Loading_Animation-Transparent.gif'

const UGCLoader: React.FC = () => {
	const [hasSidebar, setHasSidebar] = useState(false)

	useEffect(() => {
		// Check if a sidebar exists in the DOM
		const sidebarElement = document.querySelector('.side-nav')
		setHasSidebar(!!sidebarElement)
	}, [])

	return (
		<div className={`fixed inset-0 flex items-center justify-center ${hasSidebar ? 'left-64' : 'left-0'}`}>
			<img src={imgSrc} alt="Loading animation" className="h-64 opacity-20" />
		</div>
	)
}

export default UGCLoader
