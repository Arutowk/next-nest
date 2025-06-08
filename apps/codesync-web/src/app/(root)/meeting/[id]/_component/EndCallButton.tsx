import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {
  getInterviewByStreamCallId,
  updateInterviewStatus,
} from '@/lib/actions/interview';
import { Interview } from '.prisma/codesync-client';

function EndCallButton() {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const [interview, setInterview] = useState<Interview | null>(null);

  useEffect(() => {
    const fn = async () => {
      if (call?.id && interview === null) {
        const res = await getInterviewByStreamCallId(call.id);
        setInterview(res ?? null);
      }
    };
    fn();
  }, [call]);

  if (!call || !interview) return null;

  const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    try {
      await call.endCall();

      await updateInterviewStatus(interview.id, 'completed');

      router.push('/');
      toast.success('Meeting ended for everyone');
    } catch (error) {
      console.log(error);
      toast.error('Failed to end meeting');
    }
  };

  return (
    <Button variant={'destructive'} onClick={endCall}>
      End Meeting
    </Button>
  );
}
export default EndCallButton;
