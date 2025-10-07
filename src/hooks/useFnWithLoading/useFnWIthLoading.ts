import { useState } from 'react';
import { getAxiosError } from '../../utils/axios';

type Return = {
  loading: boolean;
  fnWithLoading: (fn: () => Promise<void>) => Promise<void>;
  setLoading: (loading: boolean) => void;
};

export function useFnWithLoading(): Return {
  const [loading, setLoading] = useState(false);

  async function fnWithLoading(fn: () => Promise<void>) {
    setLoading(true);
    try {
      await fn();
    } catch (error) {
      const { errorCode } = getAxiosError(error);
      console.error(`Error: ${errorCode}`);
    }
    setLoading(false);
  }

  return { loading, fnWithLoading, setLoading };
}
