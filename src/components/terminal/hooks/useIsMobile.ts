import { useMemo } from 'react';

export const useIsMobile = () => {
  const isMobile = useMemo(() => {
    const width = window.innerWidth;
    return width <= 768;
  }, [])

  return { isMobile };
}
