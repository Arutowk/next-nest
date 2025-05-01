'use client';

import { cn } from '@/lib/utils';
import { useClickOutside } from '@repo/ui/hooks';
import { PropsWithChildren, ReactNode, useRef, useState } from 'react';
import OpenClose from './OpenClose';

type Props = PropsWithChildren;

const SideBar = (props: Props) => {
  const [show, setShow] = useState(false);
  const navRef = useRef<HTMLDivElement>(null!);
  const menuRef = useRef<HTMLDivElement>(null!);
  useClickOutside([menuRef, navRef], () => setShow(false));

  return (
    <>
      <div ref={navRef} className="w-full h-16 flex">
        <OpenClose open={show} onClick={setShow} />
      </div>
      <div
        ref={menuRef}
        className={cn(
          'w-60 absolute top-16 z-10 transition-all bg-white rounded-r-md min-h-screen',
          {
            '-left-full': !show,
            'left-0': show,
          },
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export default SideBar;
