import React, { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function PageTransition({ children, ...rest }, ref) {
	console.log('key', children.props.pageProps.__SEED_NODE__.id);
	return (
		// <AnimatePresence mode="wait">
			<motion.div
				layout={false}
				ref={ref}
				initial={{ opacity: 0, scale: .99, transformOrigin: 'center 190px' }}
				animate={{ opacity: 1, scale: 1, transformOrigin: 'center 190px' }}
				transition={{
					duration: 0.4,
					delay: 0,
					ease: 'easeInOut'
				}}
				{...rest}
			>
				{children}
			</motion.div>
		// </AnimatePresence>
	)
}

export default forwardRef(PageTransition)