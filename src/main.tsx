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
import Faqs from './components/Faqs';

const FIXED_OFFSET = 80;

// React DOM hydration
// Cubicles
const rootEls = Array.from(document.querySelectorAll('div.cubicle')) as HTMLDivElement[];
rootEls.map((rootEl) => {
  const root = createRoot(rootEl);
  const text = rootEl.dataset?.text;
  root.render(<Cubicle text={text} />);
});

const signalTechStackOpen = () => {
  const event = new CustomEvent('tech-stack-open');
  document.dispatchEvent(event);
};

// Tech Stack
let techStackInitialized = false;
const techStackContainerEl = document.getElementById('tech-stack-container');
const techStackTriggerEl = document.getElementById('tech-stack-trigger');
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
              window.scrollTo({
                top: window.scrollY - TECH_STACK_SCROLL_BACK_ON_CLOSE,
                behavior: 'smooth',
              });
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

  // externally triggered tech stack opens
  document.addEventListener('tech-stack-open', () => {
    if (techStackContainerEl.classList.contains('hidden')) {
      setUrlParameterValue('tech-stack', 'on');
      openTechStack();
    }
  });

  testTechStackFromUrl();
  window.onpopstate = () => {
    testTechStackFromUrl();
  };
}

// Testimonials
const testimonialContainer = document.getElementById('testimonial-container');
if (testimonialContainer) {
  const testimonialsFile = testimonialContainer.dataset?.testimonialsFile as string;
  // init react testimonials component with SVR settings
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

// Common scroll handler
const scrollHandler = (targetId: string) => {
  let targetTop = 0;

  if (targetId && targetId !== '#') {
    // specific case: tech-stack? if so, externally trigger open
    if (targetId === '#tech-stack') {
      signalTechStackOpen();
    }
    // find top of the element
    const targetEl = document.querySelector(
      `.js-scroll-target[data-target="${targetId}"]`
    ) as HTMLElement;
    if (targetEl) {
      targetTop = targetEl.getBoundingClientRect().top + window.scrollY - FIXED_OFFSET;
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
};
// FAQs
const faqsContainer = document.getElementById('faqs-container');
if (faqsContainer) {
  const faqsFile = faqsContainer.dataset?.faqsFile as string;
  const faqLinkClicked = (link: string) => {
    scrollHandler(link);
  };
  // init react faqs component with SVR settings
  createRoot(faqsContainer).render(
    <WithSvr>
      <Faqs onLinkClicked={faqLinkClicked} faqsFile={faqsFile} />
    </WithSvr>
  );
}

// nav button
const navButton = document.querySelector('button.navToggle');
navButton?.addEventListener('click', () => {
  navButton.classList.toggle('activated');
  const nav = document.querySelector('.nav-dropdown');
  nav?.classList.toggle('active');
});

// scroll handlers
document.addEventListener('DOMContentLoaded', function () {
  // js-anchor listeners
  const scrollLinks = document.querySelectorAll('a.js-anchor');
  scrollLinks.forEach((scrollLink) => {
    scrollLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = scrollLink.getAttribute('href') as string;
      scrollHandler(targetId);
    });
  });

  // scroll event handler - controls sticky menu and highlights
  const header = document.querySelector('nav');
  const triggerElement = document.getElementById('sticky-trigger');

  window.addEventListener('scroll', () => {
    if (header && triggerElement) {
      const triggerTop = triggerElement.getBoundingClientRect().top;
      if (window.scrollY > triggerTop + FIXED_OFFSET) {
        header.classList.add('sticky-on');
      } else {
        header.classList.remove('sticky-on');
      }
    }

    const navSticky = document.querySelector('nav.sticky-on') as HTMLElement;
    let offset = FIXED_OFFSET + 4;
    if (navSticky) {
      offset += navSticky.getBoundingClientRect().height;
    }

    // highlight menu item
    const navItems = document.querySelectorAll('nav a.nav-link');
    navItems.forEach((navItem) => {
      const targetAnchor = navItem.getAttribute('href') as string;
      const targetId = targetAnchor.split('#')[1];

      const startDiv = document.querySelector(`div[data-anchor-start="${targetId}"]`);
      const endDiv = document.querySelector(`div[data-anchor-end="${targetId}"]`);

      if (!startDiv || !endDiv) {
        return;
      }
      // reduce by existing nav which is sticky

      const startDivOffset = startDiv.getBoundingClientRect().top + window.scrollY - offset;
      const endDivOffset = endDiv.getBoundingClientRect().top + window.scrollY - offset;

      if (window.scrollY >= startDivOffset && window.scrollY < endDivOffset) {
        navItem.classList.add('active');
      } else {
        navItem.classList.remove('active');
      }
    });
  });
});
