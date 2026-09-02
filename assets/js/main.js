(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SITE_PAGES = ["index.html", "about.html", "experience.html", "skills.html", "contact.html"];

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("is-ready");

    if (!prefersReducedMotion) {
      setupScrollReveal();
      setupAvatarTilt();
    }

    setupClientNav();
    setupMobileNav();
  });

  /* ---------- Mobile off-canvas menu ---------- */
  function setupMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const backdrop = document.querySelector(".nav-backdrop");
    if (!toggle) return;

    function closeMenu() {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) closeMenu();
      else openMenu();
    });

    if (backdrop) backdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeMenu();
    });

    document.querySelectorAll(".side-nav a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Scroll reveal + counters ---------- */
  function setupScrollReveal() {
    const revealEls = Array.from(
      document.querySelectorAll(".section-block, .job-entry, .skill-group, .link-item, .contact-list-main li")
    ).filter((el) => !el.classList.contains("reveal"));
    const counters = Array.from(document.querySelectorAll(".stat-num[data-count]")).filter(
      (el) => !el.classList.contains("reveal")
    );

    revealEls.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 6) * 60}ms`;
    });
    counters.forEach((el) => el.classList.add("reveal"));

    const targets = revealEls.concat(counters);
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      counters.forEach(animateCount);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          if (entry.target.hasAttribute("data-count")) animateCount(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => io.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    if (Number.isNaN(target)) return;

    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }

    requestAnimationFrame(tick);
  }

  /* ---------- Avatar tilt ---------- */
  function setupAvatarTilt() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.querySelectorAll(".avatar").forEach((avatar) => {
      if (avatar.dataset.tiltBound) return;
      avatar.dataset.tiltBound = "true";

      avatar.addEventListener("mousemove", (e) => {
        const rect = avatar.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateY = (x / (rect.width / 2)) * 8;
        const rotateX = -(y / (rect.height / 2)) * 8;
        avatar.style.transition = "none";
        avatar.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      });

      avatar.addEventListener("mouseleave", () => {
        avatar.style.transition = "transform 0.4s cubic-bezier(0.16, 0.84, 0.44, 1)";
        avatar.style.transform = "";
      });
    });
  }

  /* ---------- Client-side page nav: swap only .main-inner, keep sidebar untouched ---------- */
  function setupClientNav() {
    document.body.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !SITE_PAGES.includes(href)) return;
      if (link.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const currentPage = location.pathname.split("/").pop() || "index.html";
      if (href === currentPage) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      navigateTo(href, true);
    });

    window.addEventListener("popstate", () => {
      const page = location.pathname.split("/").pop() || "index.html";
      navigateTo(page, false);
    });
  }

  function navigateTo(url, pushState) {
    const mainInner = document.querySelector(".main-inner");
    if (!mainInner) {
      window.location.href = url;
      return;
    }

    // Kick off the fetch immediately so it overlaps with the fade-out,
    // instead of waiting for the fade to finish before requesting.
    const fetchPromise = fetch(url).then((res) => {
      if (!res.ok) throw new Error("Network error");
      return res.text();
    });

    if (prefersReducedMotion) {
      fetchPromise
        .then((html) => applySwap(mainInner, html, url, pushState))
        .catch(() => {
          window.location.href = url;
        });
      return;
    }

    mainInner.classList.add("is-swapping");
    const minFade = new Promise((resolve) => setTimeout(resolve, 180));

    Promise.all([fetchPromise, minFade])
      .then(([html]) => {
        applySwap(mainInner, html, url, pushState);
        mainInner.classList.remove("is-swapping");
      })
      .catch(() => {
        window.location.href = url;
      });
  }

  function applySwap(mainInner, html, url, pushState) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const newMain = doc.querySelector(".main-inner");
    const newTitle = doc.querySelector("title");
    if (!newMain) throw new Error("No main content in response");

    mainInner.innerHTML = newMain.innerHTML;
    if (newTitle) document.title = newTitle.textContent;
    if (pushState) history.pushState({}, "", url);

    updateActiveNav(url);
    window.scrollTo(0, 0);

    if (!prefersReducedMotion) setupScrollReveal();
  }

  function updateActiveNav(url) {
    document.querySelectorAll(".side-nav a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === url);
    });
  }
})();
