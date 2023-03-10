import { useLocation } from 'react-router-dom';

export default function useIsActiveUrl(path: string) {
  const location = useLocation();
  return location.pathname.includes(path);
}
