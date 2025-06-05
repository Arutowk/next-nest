'use client';

import LoaderUI from '@/components/LoaderUI';
import useGetCallById from '@/lib/hoooks/useGetCallById';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { use, useState } from 'react';
import MeetingSetup from './_component/MeetingSetup';
import MeetingRoom from './_component/MeetingRoom';

type PageProps = {
  params: Promise<{ id: string }>;
};

function Meeting({ params }: PageProps) {
  const { id } = use(params);
  const { call, isCallLoading } = useGetCallById(id ?? '');

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (isCallLoading) return <LoaderUI />;
  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}

export default Meeting;
