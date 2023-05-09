import { createRoot } from 'react-dom/client';
import Cubicle from 'Cubicle';
import TechStack from 'TechStack';
import WithSvr from 'components/WithSvr';
import './css/main.css';

// React DOM hydration
// Cubicles
const rootEls = Array.from(document.querySelectorAll('div.cubicle')) as HTMLDivElement[];
rootEls.map((rootEl) => {
  const root = createRoot(rootEl);
  const text = rootEl.dataset?.text;
  root.render(<Cubicle text={text} />);
});

// Tech Stack
let techStackInitialized = false;
const techStackContainerEl = document.getElementById('tech-stack-container');
const techStackTriggerEl = document.getElementById('tech-stack-trigger');
const techStackEl = document.getElementById('tech-stack');

// when tech stack containers are detected
if (techStackContainerEl && techStackTriggerEl && techStackEl) {
  techStackTriggerEl.addEventListener('click', (event) => {
    event.preventDefault();
    techStackTriggerEl.classList.toggle('hidden');
    techStackContainerEl.classList.toggle('hidden');

    // init react TechStack component
    if (!techStackInitialized) {
      techStackInitialized = true;
      const stackFile = techStackEl.dataset?.stackFile as string;

      // when tech stack is closed within
      const onCloseHandler = () => {
        techStackTriggerEl.classList.toggle('hidden');
        techStackContainerEl.classList.toggle('hidden');
      };

      // init react TechStack component with SVR settings
      createRoot(techStackEl).render(
        <WithSvr>
          <TechStack stackFile={stackFile} onClose={onCloseHandler} />
        </WithSvr>
      );
    }
  });
}

// Sticky enable - intersection reaction when hero is off
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.sticky-header');
  const triggerElement = document.getElementById('sticky-trigger');

  if (header && triggerElement) {
    // hook intersection observer to drive sticky header display
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
