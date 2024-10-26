// libs/hooks/src/lib/useMediaQuery.ts

import { useEffect, useState } from 'react';

//  default breakpoints
const tailwindBreakpoints = {
  sm: '(max-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

type Breakpoint = keyof typeof tailwindBreakpoints;

export const useMediaQuery = (breakpoint: Breakpoint): boolean => {
  const [matches, setMatches] = useState(false);
  const query = tailwindBreakpoints[breakpoint];

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);
    setMatches(mediaQueryList.matches);

    return () =>
      mediaQueryList.removeEventListener('change', documentChangeHandler);
  }, [query]);

  return matches;
};
