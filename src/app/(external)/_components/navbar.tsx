'use client';

import { usePathname } from 'next/navigation';

import { FlexNavbar } from '@/components/external/flex-navbar';

const navLinks = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/customers' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <FlexNavbar
      links={navLinks}
      primaryCtaHref='/signup'
      primaryCtaLabel={isHome ? 'Join board' : 'Create workspace'}
      variant={isHome ? 'hero' : 'page'}
    />
  );
}
