import { useEffect, useState } from 'react';

const SCREEN_SM = 576;
const SCREEN_MD = 1000;

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isScreenSm: width <= SCREEN_SM,
    isScreenMd: width <= SCREEN_MD,
  };
};
