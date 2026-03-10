'use client';

import { usePathname } from 'next/navigation';

import { FlexNavbar } from '@/components/external/flex-navbar';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <FlexNavbar
      primaryCtaHref='/signup'
      primaryCtaLabel={isHome ? 'Join board' : 'Create workspace'}
      variant={isHome ? 'hero' : 'page'}
    />
  );
}
