import { SignOut } from '@/components/sign-out';
import { auth } from '@/auth';
import UsePart from './_component/use-part';
import { getInterviews, getInterviewsById } from '@/lib/actions/interview';
import { Interview } from '@repo/db-codesync';

const Page = async () => {
  const session = await auth();
  const interviews = await getInterviews();
  const isInterviewer = session?.user.role === 'INTERVIEWER';

  return (
    <>
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? 'Manage your interviews and review candidates effectively'
            : 'Access your upcoming interviews and preparations'}
        </p>
      </div>

      <UsePart isInterviewer={isInterviewer} interviews={interviews} />

      <div className="rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{session?.user?.email}</p>
        <p className="font-medium">{JSON.stringify(session)}</p>
      </div>
      <SignOut />
    </>
  );
};

export default Page;
