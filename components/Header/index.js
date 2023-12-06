import { gql } from "@apollo/client";
import { React, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarMenuItem, NavbarMenuToggle, NavbarMenu, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import Icon from '@assets/images/icon.svg';

export default function Header({ siteTitle, menuItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar id="site-nav" onMenuOpenChange={setIsMenuOpen} className="bg-black p-0" height="5rem" shouldHideOnScroll>
      <NavbarContent className="ml-0">
        <NavbarBrand as={Link} href="/" className="flex-grow-0 gap-4">
          <Icon aria-label="Website Logo" className='w-10' />
          <p className="font-bold text-inherit text-teal text-xl m-0">{siteTitle}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        {menuItems.map((item,index) => (
          <NavbarItem key={`navItem-${index}`}>
            <Link 
              className={`p-5 hover:bg-teal hover:bg-opacity-10 ${pathname === item.uri || (pathname.startsWith(item.uri) && item.uri !== '/') ? 'text-teal' : 'text-lighter-gray'}`} 
              href={item.uri}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="hidden sm:flex gap-4 m-0 bg-black bg-opacity-50 list-none overflow-visible" justify="center">
        {menuItems.map((item,index) => (
          <NavbarMenuItem key={`mNavItem-${index}`} className=" p-0">
            <Link className={`p-5 hover:bg-teal hover:bg-opacity-10 block ${pathname === item.uri || (pathname.startsWith(item.uri) && item.uri !== '/') ? 'text-teal' : 'text-lighter-gray'}`} href={item.uri}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarMenuToggle
        id="menu-toggle"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
    </Navbar>
  )
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