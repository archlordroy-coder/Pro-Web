/**
 * ETS Pro-Informatique — L’Atelier Signalétique.
 * Révèle les blocs de production à l’approche du viewport avec un léger échelonnement.
 */
import { useEffect } from "react";

const revealSelector = [
  "section > div:not([aria-hidden])",
  ".service-ticket",
  ".cyber-ticket",
  ".gallery-work",
  ".contact-row",
  ".quote-form",
].join(", ");

export default function ScrollRevealManager() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });

    const register = (root: ParentNode) => {
      const elements = Array.from(root.querySelectorAll<HTMLElement>(revealSelector));
      elements.forEach((element, index) => {
        if (element.dataset.revealManaged) return;
        element.dataset.revealManaged = "true";
        element.style.setProperty("--reveal-delay", `${(index % 5) * 55}ms`);
        element.classList.add("scroll-reveal");
        observer.observe(element);
      });
    };

    register(document);
    const mutationObserver = new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) register(node);
    })));
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mutationObserver.disconnect(); };
  }, []);

  return null;
}
