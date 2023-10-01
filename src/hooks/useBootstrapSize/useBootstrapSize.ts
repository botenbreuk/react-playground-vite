import { useEffect, useState } from 'react';

export type BootstrapSizes = 'xs' | 'sm' | 'md' | 'lg';

const useBootstrapSize = () => {
  const [mobileSize, setMobileSize] = useState(settingMobileSize(window.innerWidth));

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  function updateWindowDimensions() {
    setMobileSize(settingMobileSize(window.innerWidth));
  }

  function settingMobileSize(width: number): BootstrapSizes {
    if (width < 768) {
      return 'xs';
    } else if (width >= 768 && width < 992) {
      return 'sm';
    } else if (width >= 992 && width < 1200) {
      return 'md';
    } else if (width >= 1200) {
      return 'lg';
    } else {
      return 'lg';
    }
  }

  return mobileSize;
};

export default useBootstrapSize;
