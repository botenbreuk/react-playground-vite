import { useLocation } from 'react-router';

export function useIsActiveUrl(path: string) {
  const location = useLocation();
  return location.pathname.includes(path);
}
