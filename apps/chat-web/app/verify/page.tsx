import { prisma } from '@repo/db-chat';

export default async function VerifyPage() {
  const user = await prisma.user.findFirst()

  return (
    <>
      <h1>Verify page</h1>
      <p>{user?.name ?? 'no user'}</p>
      <p>
        This page is intended to verify that Redux state is persisted across
        page navigations.
      </p>
    </>
  );
}
