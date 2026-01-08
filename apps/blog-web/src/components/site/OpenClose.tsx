import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  open: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
};

function OpenClose({ open = false, onClick }: Props) {
  return (
    <div className="w-16 cursor-pointer" onClick={() => onClick(!open)}>
      <div className="relative w-full pt-[100%]">
        <div className="absolute top-1/2 left-1/2 w-3/4 -translate-1/2 overflow-hidden">
          <div
            className={cn(
              'relative w-full pt-[60%]',
              '[&>span]:block [&>span]:absolute [&>span]:left-0 [&>span]:w-full [&>span]:h-1 [&>span]:overflow-hidden ',
              open ? 'opacity-0' : 'opacity-100',
            )}
          >
            <span
              className={cn(
                'top-0',
                'before:bg-black before:absolute before:left-0 before:top-0 before:w-full before:h-full before:contain-none before:transition-all before:duration-700 before:ease-initial',
                open ? 'before:translate-x-[100%]' : 'before:translate-0',
              )}
            ></span>
            <span
              className={cn(
                'top-1/3',
                'before:bg-black before:absolute before:left-0 before:top-0 before:w-full before:h-full before:contain-none before:transition-all before:duration-700 before:ease-initial',
                open ? 'before:-translate-x-[100%]' : 'before:translate-0',
              )}
            ></span>
            <span
              className={cn(
                'top-2/3',
                'before:bg-black before:absolute before:left-0 before:top-0 before:w-full before:h-full before:contain-none before:transition-all before:duration-700 before:ease-initial',
                open ? 'before:translate-x-[100%]' : 'before:translate-0',
              )}
            ></span>
          </div>

          <div
            className={cn(
              'absolute top-0 left-0 w-full pt-[60%]',
              '[&>span]:block [&>span]:absolute [&>span]:left-0 [&>span]:w-full [&>span]:h-1 [&>span]:overflow-hidden',
              open ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span
              className={cn(
                'top-1/2 left-1/2 -translate-0.5 rotate-30',
                'before:bg-black before:absolute before:left-0 before:top-0 before:w-full before:h-full before:contain-none before:transition-all before:duration-700 before:ease-initial',
                open ? 'before:translate-0' : 'before:-translate-full',
              )}
            ></span>
            <span
              className={cn(
                'top-1/2 left-1/2 -translate-0.5 -rotate-30',
                'before:bg-black before:absolute before:left-0 before:top-0 before:w-full before:h-full before:contain-none before:transition-all before:duration-700 before:ease-initial',
                open
                  ? 'before:translate-0'
                  : 'before:translate-x-[100%] before:translate-y-[-100%]',
              )}
            ></span>
          </div>

          <div className="[&>p]:text-xs [&>p]:bottom-0 [&>p]:left-1/2 [&>p]:-translate-x-1/2 [&>p]:whitespace-nowrap [&>p]:duration-500 relative leading-none mt-3 pt-1">
            <p className={cn(open ? 'opacity-0' : 'opacity-100', 'absolute')}>
              MENU
            </p>
            <p className={cn(open ? 'opacity-100' : 'opacity-0', 'absolute')}>
              CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenClose;
