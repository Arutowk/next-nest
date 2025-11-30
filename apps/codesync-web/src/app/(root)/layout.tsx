import StreamVideoProvider from '@/components/provider/streamclient-provider';
import {type ReactNode} from 'react';

function Layout({ children }: { children: ReactNode }) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
}
export default Layout;
