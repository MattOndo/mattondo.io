import { gql } from "@apollo/client";
import { React, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from '../../assets/images/icon.svg';
import style from "./style.module.css";
import className from 'classnames/bind';
const cx = className.bind();

export default function Header({ siteTitle, siteDescription, menuItems }) {

  return (
    <header id="site-header" className="w-full bg-black sticky top-0 z-50">
      <div className="flex justify-between items-center pl-7">
        <Link href="/" className="flex gap-2 items-center no-hover-style">
          <Icon aria-label="Website Logo" />
          <h2 className="font-body font-bold text-teal">{siteTitle}</h2>
        </Link>

        <nav id="nav" className={style.navMenu}>
          <HamburgerIcon aria-label="Menu" width="40" height="40" className="mr-7" />
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

const NavLink = ({ href, children, ...props }) => {
  const pathname = usePathname();
  let isActive;

  if (pathname === href || (href === '/archive/' && pathname.startsWith('/archive/'))) {
    isActive = true;
  }

  if (isActive) {
    props.className += '  text-teal';
  } else {
    props.className += ' text-lighter-gray';
  }

  return (
    <Link href={href} {...props} scroll={false}>
      {children}
    </Link>
  );
};

const HamburgerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavToggle = async (e) => {
    e.preventDefault();
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <>
      <label 
        id="navToggleLabel"
        className={cx(['navToggle', `isOpen-${isOpen}`])} 
        htmlFor="navToggle" 
        aria-label="Menu"
        width="50" 
        height="50"
        onClick={handleNavToggle}>
        <span></span>
        <span></span>
        <span></span>
      </label>
      <input
        id="navToggle"
        type="checkbox"
        checked={isOpen}
        readOnly={true}
      />
    </>
  );
}
