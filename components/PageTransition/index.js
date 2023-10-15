import React, { forwardRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function PageTransition({ children, ...rest },ref) {
	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				layout={true}
				ref={ref}
				key={rest.thekey}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
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