import { createRoot } from 'react-dom/client';
import Cubicle from './components/Cubicle';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import WithSvr from './components/WithSvr';
import { setUrlParameterValue, getParameterValue } from './utils/paramRouter';
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
  const openTechStack = () => {
    techStackTriggerEl.classList.add('hidden');
    techStackContainerEl.classList.remove('hidden');

    // init react TechStack component
    if (!techStackInitialized) {
      techStackInitialized = true;
      const stackFile = techStackEl.dataset?.stackFile as string;

      // init react TechStack component with SVR settings
      createRoot(techStackEl).render(
        <WithSvr>
          <TechStack
            stackFile={stackFile}
            onClose={() => {
              setUrlParameterValue('tech-stack', null);
              closeTechStack();
            }}
          />
        </WithSvr>
      );
    }
  };

  const closeTechStack = () => {
    techStackTriggerEl.classList.remove('hidden');
    techStackContainerEl.classList.add('hidden');
  };

  const testTechStackFromUrl = () => {
    const techStackParam = getParameterValue('tech-stack', null);
    if (techStackParam === 'on') {
      openTechStack();
    } else {
      closeTechStack();
    }
  };

  techStackTriggerEl.addEventListener('click', (e) => {
    e.preventDefault();
    setUrlParameterValue('tech-stack', 'on');
    openTechStack();
  });

  testTechStackFromUrl();
  window.onpopstate = () => {
    testTechStackFromUrl();
  };
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

// Testimonials
const testimonialContainer = document.getElementById('testimonial-container');
if (testimonialContainer) {
  const testimonialsFile = testimonialContainer.dataset?.testimonialsFile as string;
  // init react TechStack component with SVR settings
  createRoot(testimonialContainer).render(
    <WithSvr>
      <Testimonials testimonialsFile={testimonialsFile} />
    </WithSvr>
  );
}

// Contact form
const contactFormContainer = document.getElementById('contact-form-container');
if (contactFormContainer) {
  createRoot(contactFormContainer).render(<ContactForm />);
}
