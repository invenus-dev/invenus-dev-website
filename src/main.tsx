import { createRoot } from 'react-dom/client';
import Cubicle from './components/Cubicle';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import WithSvr from './components/WithSvr';
import './css/main.css';
import ContactDetails, { ContactObject } from './components/ContactDetails';
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

// Tech Stack
const techStackEl = document.getElementById('tech-stack');

if (techStackEl) {
  // init react TechStack component with SVR settings
  const stackFile = techStackEl.dataset?.stackFile as string;
  createRoot(techStackEl).render(
    <WithSvr>
      <TechStack stackFile={stackFile} />
    </WithSvr>
  );
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
  const contactObject: ContactObject[] = [];
  spanElements.forEach((spanElement) =>
    contactObject.push({
      key: spanElement.dataset?.key as string,
      value: spanElement.innerHTML as string,
      url: spanElement.dataset?.url,
      label: spanElement.dataset?.label,
    })
  );
  return contactObject;
};

const contactMainContainer = document.getElementById('contact-main-container');
if (contactMainContainer) {
  createRoot(contactMainContainer).render(
    <ContactDetails data={getContactValues(contactMainContainer)} />
  );
}

const contactLocationContainer = document.getElementById('contact-location-container');
if (contactLocationContainer) {
  createRoot(contactLocationContainer).render(
    <ContactDetails data={getContactValues(contactLocationContainer)} />
  );
}

const contactInvoiceContainer = document.getElementById('contact-invoice-container');
if (contactInvoiceContainer) {
  createRoot(contactInvoiceContainer).render(
    <ContactDetails data={getContactValues(contactInvoiceContainer)} />
  );
}

const contactBankContainer = document.getElementById('contact-bank-container');
if (contactBankContainer) {
  createRoot(contactBankContainer).render(
    <ContactDetails data={getContactValues(contactBankContainer)} />
  );
}

// Common scroll handler
const scrollHandler = (targetId: string) => {
  let targetTop = 0;

  if (targetId && targetId !== '#') {
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
