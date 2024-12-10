import { useLocation } from 'react-router';

export default function useIsActiveUrl(path: string) {
  const location = useLocation();
  return location.pathname.includes(path);
}
