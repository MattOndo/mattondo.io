import { useQuery, gql } from "@apollo/client";
import React, { useRef, useMemo } from 'react'
import { usePathname } from "next/navigation";
import { BlogInfoFragment } from '../../fragments/GeneralSettings';
import {
  Header,
  Footer,
} from "../../components";
import { motion, AnimatePresence } from 'framer-motion'

export default function Layout({ children, pageProps }) {
  const { data } = useQuery(Layout.query);
  const pathname = usePathname();
  const ref = useRef(null)

  const {
    title: siteTitle,
    description: siteDescription,
  } = data?.generalSettings ?? {};
  const menuItems = data?.primaryMenuItems?.nodes ?? [];


	const onExitComplete = () => {
		window.scrollTo({ top: 0 })
	}

  return (
    <>
      {/* <SEO title={siteTitle} description={siteDescription} /> */}

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        <motion.div
          layout={true}
          ref={ref}
          key={pathname}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{
            duration: 0.3,
            delay: 0,
            ease: 'easeInOut'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
}

Layout.query = gql`
  ${Header.fragments.entry}
  ${BlogInfoFragment}
  query GetPage {
    generalSettings {
      ...BlogInfoFragment
    }
    ...HeaderFragment
  }
`;