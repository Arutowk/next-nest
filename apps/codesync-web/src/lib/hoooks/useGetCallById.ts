import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    const getCall = async () => {
      if (!client || id === '') return;
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) setCall(calls[0]);
      } catch (error) {
        console.error(error);
        setCall(undefined);
      } finally {
        setIsCallLoading(false);
      }
    };

    getCall();
  }, [client, id]);

  return { call, isCallLoading };
};

export default useGetCallById;
