import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSpatialNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      const focusableElements = Array.from(document.querySelectorAll('.focusable')) as HTMLElement[];

      if (!focusableElements.length) return;

      // Handle Enter/OK key
      if (e.key === 'Enter') {
        activeElement?.click();
        return;
      }

      // Handle Back/Escape keys (including TV specific codes)
      const backKeys = ['Backspace', 'Escape', 'Back', 'XF86Back', 'BrowserBack'];
      if (backKeys.includes(e.key) || e.keyCode === 8 || e.keyCode === 27 || e.keyCode === 461 || e.keyCode === 10009 || e.keyCode === 4) {
        e.preventDefault();
        navigate(-1);
        return;
      }

      // Handle directional keys
      const directions: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };

      if (!directions[e.key]) return;

      e.preventDefault();

      if (!activeElement || !activeElement.classList.contains('focusable')) {
        focusableElements[0].focus();
        return;
      }

      const activeRect = activeElement.getBoundingClientRect();
      const activeCenter = {
        x: activeRect.left + activeRect.width / 2,
        y: activeRect.top + activeRect.height / 2,
      };

      let bestElement: HTMLElement | null = null;
      let minDistance = Infinity;

      focusableElements.forEach((el) => {
        if (el === activeElement) return;

        const rect = el.getBoundingClientRect();
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };

        const dx = center.x - activeCenter.x;
        const dy = center.y - activeCenter.y;

        // Check if the element is in the correct direction
        const [dirX, dirY] = directions[e.key];
        const isInDirection = (dirX !== 0 && Math.sign(dx) === dirX && Math.abs(dx) > Math.abs(dy)) ||
                              (dirY !== 0 && Math.sign(dy) === dirY && Math.abs(dy) > Math.abs(dx));

        if (isInDirection) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) {
            minDistance = distance;
            bestElement = el;
          }
        }
      });

      if (bestElement) {
        (bestElement as HTMLElement).focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Auto-focus the first element if nothing is focused
    if (!document.activeElement || !document.activeElement.classList.contains('focusable')) {
      const first = document.querySelector('.focusable') as HTMLElement;
      first?.focus();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};

export default useSpatialNavigation;
