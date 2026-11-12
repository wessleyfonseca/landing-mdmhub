// MDM Hub — landing: reveals no scroll, nav e barra de progresso.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal on scroll
  const targets = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el) => io.observe(el));
  }

  // Nav: borda ao rolar
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 8);
    // Barra de progresso de leitura
    const doc = document.documentElement;
    const max = doc.scrollHeight - innerHeight;
    doc.style.setProperty("--p", max > 0 ? (scrollY / max).toFixed(4) : "0");
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
