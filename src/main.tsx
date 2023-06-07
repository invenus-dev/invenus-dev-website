import { createRoot } from 'react-dom/client';
import Cubicle from './components/Cubicle';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import WithSvr from './components/WithSvr';
import { setUrlParameterValue, getParameterValue } from './utils/paramRouter';
import './css/main.css';
import ContactDetails from './components/ContactDetails';
import ContactMain from './components/ContactMain';

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
const techStackTriggerFromNav = document.getElementById('tech-stack-trigger-nav');
const techStackEl = document.getElementById('tech-stack');
const TECH_STACK_SCROLL_BACK_ON_CLOSE = 230;

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
    window.scrollTo({
      top: window.pageYOffset - TECH_STACK_SCROLL_BACK_ON_CLOSE,
      behavior: 'smooth',
    });
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

  if (techStackTriggerFromNav) {
    techStackTriggerFromNav.addEventListener('click', (e) => {
      e.preventDefault();
      if (techStackContainerEl.classList.contains('hidden')) {
        setUrlParameterValue('tech-stack', 'on');
        openTechStack();
      }
    });
  }

  testTechStackFromUrl();
  window.onpopstate = () => {
    testTechStackFromUrl();
  };
}

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

// Contact containers
const getContactValues = (contactContainer: HTMLElement) => {
  const spanElements = contactContainer.querySelectorAll('span');
  const contactObject: Record<string, string> = {};
  spanElements.forEach((spanElement) => {
    const key = spanElement.dataset?.key as string;
    const value = spanElement.innerText as string;
    contactObject[key] = value;
  });
  return contactObject;
};

const contactMainContainer = document.getElementById('contact-main-container');
if (contactMainContainer) {
  createRoot(contactMainContainer).render(
    <ContactMain data={getContactValues(contactMainContainer)} />
  );
}

const contactDetailsContainer = document.getElementById('contact-details-container');
if (contactDetailsContainer) {
  createRoot(contactDetailsContainer).render(
    <ContactDetails data={getContactValues(contactDetailsContainer)} />
  );
}

// scroll handlers
document.addEventListener('DOMContentLoaded', function () {
  const FIXED_OFFSET = 80;

  // js-anchor listeners
  const scrollLinks = document.querySelectorAll('a.js-anchor');
  scrollLinks.forEach((scrollLink) => {
    scrollLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = scrollLink.getAttribute('href') as string;

      // special case handling:

      let targetTop = 0;
      if (targetId && targetId !== '#') {
        // find top of the element
        const targetEl = document.querySelector(
          `.js-scroll-target[data-target="${targetId}"]`
        ) as HTMLElement;
        if (targetEl) {
          targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - FIXED_OFFSET;
        }
        // reduce by existing nav which is sticky
        const navSticky = document.querySelector('nav.sticky-on') as HTMLElement;
        if (navSticky) {
          targetTop -= navSticky.getBoundingClientRect().height;
        }
      }

      // perform scroll
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });

  // scroll event handler - controls sticky menu and highlights
  const header = document.querySelector('nav');
  const triggerElement = document.getElementById('sticky-trigger');

  window.addEventListener('scroll', () => {
    if (header && triggerElement) {
      const triggerTop = triggerElement.getBoundingClientRect().top;
      if (window.pageYOffset > triggerTop + FIXED_OFFSET) {
        header.classList.add('sticky-on');
      } else {
        header.classList.remove('sticky-on');
      }
    }
  });
});
