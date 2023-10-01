import { useEffect, useState } from 'react';

/**
 * Types of Bootstrap screen types.
 *
 * xs: for all screen size below 576 px.
 * sm: for larger mobile phones (devices with resolutions ≥ 576px).
 * md: for tablets (devices with resolutions ≥ 768px).
 * lg: for laptops (devices with resolutions ≥ 992px).
 * xl: for desktops (devices with resolutions ≥ 1200px)
 */
export type BootstrapSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * This hook returns the type of Bootstrap 4 size based on the screen width.
 *
 * if a component need to render differently in mobile in comparison to desktop
 * this hook can help.
 *
 * example:
 * function ComponentWithMobile() {
 *  const mobileScreenSize = useBootstrapSize();
 *
 *  // Other hooks/functions
 *
 *  if (['xs', 'sm'].includes(mobileScreenSize)) {
 *    return (
 *      // Render for mobile
 *    )
 *  }
 *
 *  return (
 *    // Render for desktop
 *  )
 * }
 */
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
    if (width < 576) {
      return 'xs';
    } else if (width >= 576 && width < 768) {
      return 'sm';
    } else if (width >= 768 && width < 992) {
      return 'md';
    } else if (width >= 992 && width < 1200) {
      return 'lg';
    } else if (width >= 1200) {
      return 'xl';
    } else {
      return 'xl';
    }
  }

  return mobileSize;
};

export default useBootstrapSize;
