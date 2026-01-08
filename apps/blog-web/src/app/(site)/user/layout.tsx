import { type PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const UserLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center pb-10 h-[calc(100vh-80px)] overflow-y-scroll">
      {children}
    </div>
  );
};

export default UserLayout;
