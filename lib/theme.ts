import gsap from 'gsap';

export function animateThemeTransition(isDark: boolean, buttonElement: HTMLElement) {
  const { left, top, width, height } = buttonElement.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  // Calculate the maximum distance to cover entire screen
  const maxDistance = Math.hypot(
    Math.max(centerX, window.innerWidth - centerX),
    Math.max(centerY, window.innerHeight - centerY)
  );

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: ${centerY}px;
    left: ${centerX}px;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${isDark ? '#000' : '#fff'};
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(overlay);

  // Animate the circle expanding
  gsap.to(overlay, {
    width: maxDistance * 2,
    height: maxDistance * 2,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      overlay.remove();
    },
  });
}

export function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
