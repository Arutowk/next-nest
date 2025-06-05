'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import LoaderUI from '../LoaderUI';
import { streamTokenProvider } from '@/lib/actions/stream';
import { useSession } from 'next-auth/react';

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] =
    useState<StreamVideoClient>();
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    if (!user) return;

    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: user?.id!,
        name: user?.name! || user?.id!,
        image: user?.image!,
      },
      tokenProvider: streamTokenProvider,
    });

    setStreamVideoClient(client);
  }, [user?.id]);

  if (!streamVideoClient) return <LoaderUI />;

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
