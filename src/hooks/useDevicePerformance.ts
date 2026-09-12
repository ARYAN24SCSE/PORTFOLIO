import { useState, useEffect } from 'react';
import { DeviceTier } from '../types';

interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
}

export function useDevicePerformance() {
  const [tier, setTier] = useState<DeviceTier>('high');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      const mobileMatch = window.matchMedia('(max-width: 768px)').matches;
      const touchMatch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileDevice = mobileMatch || (touchMatch && window.innerWidth < 1024);
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        setTier('mobile');
        return;
      }

      const extNav = navigator as ExtendedNavigator;
      const cores = navigator.hardwareConcurrency || 4;
      const memory = extNav.deviceMemory || 4;

      if (cores >= 8 && memory >= 8) {
        setTier('high');
      } else if (cores >= 4 && memory >= 4) {
        setTier('medium');
      } else {
        setTier('low');
      }
    };

    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  // Performance budget allocations per tier
  const particleCount = tier === 'high' ? 800 : tier === 'medium' ? 400 : tier === 'low' ? 150 : 80;
  const isLowEnd = tier === 'low' || tier === 'mobile';

  return { tier, isLowEnd, isMobile, particleCount };
}
