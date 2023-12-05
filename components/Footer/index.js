import { gql } from "@apollo/client";
import Link from "next/link";
import styles from './style.module.css';

export default function Footer({menuItems}) {

  const year = new Date().getFullYear();

  const footerLinks = menuItems.map((item, index) => (
    <li 
      key={item.id}
      className={`block px-2 ${index > 0 ? 'md:border-l md:border-slate' : ''}`}
    >
      <Link  href={item.uri} className={`${styles.link} px-2 py-1`}>
        {item.label}
      </Link>
    </li>
  ));

  return (
    <footer className="container-fluid text-center mt-40 mb-1">
      <ul className="list-none flex flex-wrap justify-center font-mono text-sm m-0 mb-9">
        {footerLinks}
      </ul>
      <small className="text-xs">&copy; {year} Matt Ondo | <a href="/privacy-policy/" className="text-lighter-gray font-sans p-1">Privacy</a></small>
    </footer>
  );
}

Footer.fragments = {
  entry: gql`
    fragment FooterFragment on RootQuery {
      menuItems: menuItems(where: { location: FOOTER }) {
        nodes {
          id
          uri
          path
          label
          parentId
          cssClasses
          menu {
            node {
              name
            }
          }
        }
      }
    }
  `,
};