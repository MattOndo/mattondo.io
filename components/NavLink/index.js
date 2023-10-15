import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavLink = ({ href, children, ...props }) => {
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
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
