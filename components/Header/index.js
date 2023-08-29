import { gql } from "@apollo/client";
import Link from "next/link";
import {NavLink} from "../NavLink";
import Icon from '../../assets/images/icon.svg';
import NavIcon from '../../assets/images/hamburger.svg';
import style from "./style.module.css";

export default function Header({ siteTitle, siteDescription, menuItems }) {

  return (
    <header className="w-full bg-black sticky top-0 z-10">
      <div className="flex justify-between items-center pl-7">
        <Link href="/" className="flex gap-2 items-center no-hover-style">
          <Icon aria-label="Website Logo" />
          <h2 className="font-body font-bold text-teal">{siteTitle}</h2>
        </Link>

        <nav id="nav" className={style.navMenu}>
          <label htmlFor="navToggle">
            <NavIcon aria-label="Menu" width="50" height="50" className="mr-7" />
          </label>
          <input type="checkbox" id="navToggle" className=""/>
          <ul className="flex">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink href={item.uri} className="navLink block p-7 hover:bg-teal hover:bg-opacity-10">{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

Header.fragments = {
  entry: gql`
    fragment HeaderFragment on RootQuery {
      generalSettings {
        title
        description
      }
      primaryMenuItems: menuItems(where: { location: PRIMARY }) {
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
