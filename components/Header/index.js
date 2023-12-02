import { gql } from "@apollo/client";
import { React, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarMenuItem, NavbarMenuToggle, NavbarMenu, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import Icon from '../../assets/images/icon.svg';

export default function Header({ siteTitle, menuItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar id="site-nav" onMenuOpenChange={setIsMenuOpen} className="bg-black p-0" shouldHideOnScroll>
      <NavbarContent className="ml-0">
        <NavbarBrand as={Link} href="/" className="flex-grow-0 p-2 gap-4 hover:border-0 hover:bg-none">
          <Icon aria-label="Website Logo" className='absolute -top-1' />
          <p className="font-bold text-inherit text-teal text-xl m-0 ml-20">{siteTitle}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        {menuItems.map((item) => (
          <NavbarItem>
            <Link 
              className={`p-5 hover:bg-teal hover:bg-opacity-10 ${pathname === item.uri || (pathname.startsWith(item.uri) && item.uri !== '/') ? 'text-teal' : 'text-lighter-gray'}`} 
              href={item.uri}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="hidden sm:flex gap-4 m-0 bg-black bg-opacity-50 list-none" justify="center">
        {menuItems.map((item) => (
          <NavbarMenuItem>
            <Link className={`p-5 hover:bg-teal hover:bg-opacity-10  ${pathname === item.uri || (pathname.startsWith(item.uri) && item.uri !== '/') ? 'text-teal' : 'text-lighter-gray'}`} href={item.uri}>
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