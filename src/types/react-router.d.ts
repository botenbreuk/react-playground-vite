import type { NavigateOptions, To } from 'react-router';

// RouterProvider (Data Router) mode — navigate() returns a Promise.
// See: https://reactrouter.com/api/hooks/useNavigate
declare module 'react-router' {
  interface NavigateFunction {
    (to: To, options?: NavigateOptions): Promise<void>;
    (delta: number): Promise<void>;
  }
}
