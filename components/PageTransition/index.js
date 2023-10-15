import React, { forwardRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function PageTransition({ children, ...rest },ref) {
	const onExitComplete = () => {
		window.scrollTo({ top: 0 })
	}
	return (
		<AnimatePresence mode="wait" onExitComplete={onExitComplete}>
			<motion.div
				layout={true}
				ref={ref}
				key={rest.thekey}
				initial={{ opacity: 0, y: -5 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 5 }}
				transition={{
					duration: 0.3,
					delay: 0,
					ease: 'easeInOut'
				}}
				{...rest}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default forwardRef(PageTransition)