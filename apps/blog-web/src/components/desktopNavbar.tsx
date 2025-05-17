'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type Props = PropsWithChildren;

const DesktopNavbar = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const isScrollDown = scrollPosition > 10;
  const isHome = pathname === '/';
  const isCreateOrUpdatePost =
    pathname === '/user/create-post' ||
    new RegExp(/(\/user\/posts\/)(\d)+(\/update)/g).test(pathname);
  return (
    <nav
      className={cn(
        'hidden transition-colors w-full z-50 text-white top-0',
        {
          'bg-white text-gray-700 shadow-md': isScrollDown || !isHome,
        },
        isHome ? 'fixed' : 'sticky',
        isCreateOrUpdatePost ? 'md:hidden' : 'md:block',
      )}
    >
      <div className="flex items-center px-4 py-4">{props.children}</div>
      <hr className="border-b border-gray-100 opacity-25 " />
    </nav>
  );
};

export default DesktopNavbar;
