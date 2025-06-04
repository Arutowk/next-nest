'use client';

import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MeetingCard from '@/components/MeetingCard';
import { QUICK_ACTIONS } from '@/lib/constants';
import ActionCard from '@/components/ActionCard';
import MeetingModal from '@/components/MeetingModal';

type Props = {
  isInterviewer: boolean;
  interviews?: any[];
};

function UsePart({ isInterviewer, interviews = undefined }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'start' | 'join'>();

  const router = useRouter();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case 'New Call':
        setModalType('start');
        setShowModal(true);
        break;
      case 'Join Interview':
        setModalType('join');
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  return (
    <>
      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === 'join' ? 'Join Meeting' : 'Start Meeting'}
            isJoinMeeting={modalType === 'join'}
          />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold">Your Interviews</h1>
            <p className="text-muted-foreground mt-1">
              View and join your scheduled interviews
            </p>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default UsePart;
