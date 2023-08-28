import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavLink = ({ href, exact, children, ...props }) => {
  const pathname = usePathname();
  exact = pathname === '/' ? false : true; // Index always exact
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += '  text-teal';
  } else {
    props.className += ' text-lighter-gray';
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
