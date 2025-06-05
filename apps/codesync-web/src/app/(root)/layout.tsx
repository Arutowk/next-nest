import StreamVideoProvider from '@/components/provider/streamclient-provider';

function Layout({ children }: { children: React.ReactNode }) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
}
export default Layout;
