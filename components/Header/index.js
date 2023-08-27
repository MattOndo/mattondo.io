import { gql } from "@apollo/client";
import Link from "next/link";
import {NavLink} from "../NavLink";
import Icon from '../../assets/images/icon.svg';
import style from "./style.module.css";

export default function Header({ siteTitle, siteDescription, menuItems }) {

  return (
    <header className="w-full bg-black">
      <div className="flex justify-between items-center pl-7">
        <Link href="/" className="flex gap-2 items-center">
          <Icon aria-label="Website Logo" />
          <h2 className="font-display text-teal">{siteTitle}</h2>
        </Link>

        <nav className="block">
          <ul className="flex">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink href={item.uri} className="block p-7 hover:bg-teal hover:bg-opacity-10 hover:text-teal">{item.label}</NavLink>
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
