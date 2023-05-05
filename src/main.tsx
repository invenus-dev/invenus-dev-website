import { createRoot } from 'react-dom/client';
import Cubicle from 'Cubicle';
import './css/main.css';

// React DOM hydration
const rootEls = Array.from(document.querySelectorAll('div.cubicle')) as HTMLDivElement[];
rootEls.map((rootEl) => {
  const root = createRoot(rootEl);
  const text = rootEl.dataset?.text;
  root.render(<Cubicle text={text} />);
});

// Sticky enable - intersection reaction when hero is off
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.sticky-header');
  const triggerElement = document.getElementById('sticky-trigger');

  if (header && triggerElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            header.classList.remove('sticky-on');
          } else {
            header.classList.add('sticky-on');
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );
    observer.observe(triggerElement);
  }
});
