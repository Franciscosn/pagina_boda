const TEXT_BY_LOCALE = {
  de: {
    pageTitle: "Unsere Geschichte",
    status: "Online 7/01/25 ⚡",
    ts1: "6/01/2024, 11:48",
    ts2: "6/01/2024, 14:31",
    ts3: "6/01/2024, 15:53",
    m1: "Hallo Francisco! :) Ich bin eine native Spanischsprecherin, die ihr Deutsch verbessern moechte 👉🏻👈🏻",
    m2: "Wir koennten uns helfen ✨",
    m3: "Hallo Katherine :) Ja, das waere eine super Idee. Dein Deutsch scheint schon ziemlich gut.",
    m4: "Wo bist du aufgewachsen?",
    m5: "Falls ich fragen darf :)",
    m6: "Es ist a kleine Baby deutsch haha",
    m7: "Kolumbien, und du?",
    m8: "Kein Problem! Ich glaube, viele Menschen hier in Berlin kommen aus vielen anderen Teilen der Welt.",
    m9: "haha baby deutsch.",
    storyEyebrow: "Unsere Story",
    storyTitle: "So fing naemlich alles an",
    directionsEyebrow: "Directions",
    directionsTitle: "Folgt den gelben Pfeilen",
    directionsLead: "Am Hochzeitstag zeigen euch gelbe Pfeile den Weg zur Location.",
    directionsCard1Title: "Mit dem Auto",
    directionsCard1Body: "Parkplaetze in der Naehe sind ausgeschildert.",
    directionsCard2Title: "Zu Fuss",
    directionsCard2Body: "Vom Treffpunkt sind es nur wenige Minuten.",
    directionsCard3Title: "Falls ihr euch verfahrt",
    directionsCard3Body: "Schreibt uns kurz auf WhatsApp, wir helfen sofort.",
    topImageAlt: "Selfie eines Paares in den Bergen",
    directionsImageAlt: "Selfie eines Paares neben einem gelben Pfeil",
  },
  es: {
    pageTitle: "Nuestra historia",
    status: "En linea 7/01/25 ⚡",
    ts1: "6/01/2024, 11:48",
    ts2: "6/01/2024, 14:31",
    ts3: "6/01/2024, 15:53",
    m1: "Hola Francisco! :) Soy hablante nativa de espanol y quiero mejorar mi aleman 👉🏻👈🏻",
    m2: "Podriamos ayudarnos ✨",
    m3: "Hola Katherine :) Si, seria una super idea. Tu aleman ya parece bastante bueno.",
    m4: "Donde creciste?",
    m5: "si puedo preguntar :)",
    m6: "Es un aleman bebe jaja",
    m7: "Colombia, y tu?",
    m8: "No pasa nada! Creo que mucha gente aqui en Berlin viene de otras partes del mundo.",
    m9: "jaja aleman bebe.",
    storyEyebrow: "Nuestra historia",
    storyTitle: "Asi empezo todo",
    directionsEyebrow: "Directions",
    directionsTitle: "Sigan las flechas amarillas",
    directionsLead: "El dia de la boda, las flechas amarillas les guiaran directo al lugar.",
    directionsCard1Title: "En coche",
    directionsCard1Body: "Habra plazas de aparcamiento senalizadas cerca.",
    directionsCard2Title: "A pie",
    directionsCard2Body: "Desde el punto de encuentro son solo unos minutos.",
    directionsCard3Title: "Si se pierden",
    directionsCard3Body: "Escribannos por WhatsApp y les ayudamos enseguida.",
    topImageAlt: "Selfie de una pareja en las montanas",
    directionsImageAlt: "Selfie de una pareja junto a una flecha amarilla",
  },
  en: {
    pageTitle: "Our Story",
    status: "Online 7/01/25 ⚡",
    ts1: "6/01/2024, 11:48",
    ts2: "6/01/2024, 14:31",
    ts3: "6/01/2024, 15:53",
    m1: "Hi Francisco! :) I am a native Spanish speaker and I want to improve my German 👉🏻👈🏻",
    m2: "We could help each other ✨",
    m3: "Hi Katherine :) Yes, that would be a great idea. Your German already seems pretty good.",
    m4: "Where did you grow up?",
    m5: "if I may ask :)",
    m6: "It is baby German haha",
    m7: "Colombia, and you?",
    m8: "No problem! I think many people here in Berlin come from many different parts of the world.",
    m9: "haha baby German.",
    storyEyebrow: "Our Story",
    storyTitle: "That is how it all started",
    directionsEyebrow: "Directions",
    directionsTitle: "Follow the yellow arrows",
    directionsLead: "On the wedding day, yellow arrows will guide you straight to the venue.",
    directionsCard1Title: "By car",
    directionsCard1Body: "Nearby parking spots will be marked.",
    directionsCard2Title: "On foot",
    directionsCard2Body: "It is only a few minutes from the meeting point.",
    directionsCard3Title: "If you get lost",
    directionsCard3Body: "Send us a quick WhatsApp message and we will help right away.",
    topImageAlt: "Selfie of a couple in the mountains",
    directionsImageAlt: "Selfie of a couple next to a yellow arrow",
  },
};

const locale = (document.documentElement.lang || "de").slice(0, 2).toLowerCase();
const text = TEXT_BY_LOCALE[locale] || TEXT_BY_LOCALE.de;

const applyTranslations = () => {
  if (text.pageTitle) {
    document.title = text.pageTitle;
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = text[key];

    if (typeof value === "string") {
      element.textContent = value;
    }
  });
};

applyTranslations();

const applyVersionedImage = (imageElement, options) => {
  if (!imageElement) {
    return;
  }

  if (options.alt) {
    imageElement.alt = options.alt;
  }

  const imageUrl = new URL(imageElement.getAttribute("src"), window.location.href);
  imageUrl.searchParams.set("v", window.__assetVersion || Date.now().toString());
  imageElement.src = imageUrl.toString();

  imageElement.addEventListener("error", () => {
    if (imageElement.dataset.fallbackLoaded === "1") {
      return;
    }

    imageElement.dataset.fallbackLoaded = "1";
    imageElement.src = `${options.fallbackPath}?v=${window.__assetVersion || Date.now().toString()}`;
  });
};

const topHeroImage = document.getElementById("topHeroImage");
applyVersionedImage(topHeroImage, {
  alt: text.topImageAlt,
  fallbackPath: "../assets/top-hero-fallback.svg",
});

const directionsImage = document.getElementById("directionsImage");
applyVersionedImage(directionsImage, {
  alt: text.directionsImageAlt,
  fallbackPath: "../assets/directions-fallback.svg",
});

const thread = document.getElementById("chatThread");
if (!thread) {
  throw new Error("Chat thread not found");
}

const revealItems = [...document.querySelectorAll(".reveal-item")];
const storySection = document.getElementById("storySection");
const directionsSection = document.getElementById("directionsSection");
const urlParams = new URLSearchParams(window.location.search);
const previewMode = urlParams.get("preview");

let currentIndex = 0;
let revealLocked = true;
let revealCooldown = false;
let touchStartY = null;

const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealNow = (element) => {
  if (!element || element.classList.contains("is-visible")) {
    return;
  }

  element.classList.add("is-visible");
  thread.scrollTo({ top: thread.scrollHeight, behavior: isReducedMotion ? "auto" : "smooth" });
};

const releaseScroll = () => {
  if (!revealLocked) {
    return;
  }

  revealLocked = false;
  document.body.classList.remove("reveal-locked");
  thread.classList.remove("reveal-locked");
  thread.classList.add("chat-complete");
};

const revealNext = () => {
  const next = revealItems[currentIndex];

  if (!next) {
    releaseScroll();
    return;
  }

  revealNow(next);
  currentIndex += 1;
};

const revealStepFromScroll = () => {
  if (!revealLocked || revealCooldown) {
    return;
  }

  revealCooldown = true;
  revealNext();

  if (currentIndex >= revealItems.length) {
    window.setTimeout(releaseScroll, isReducedMotion ? 50 : 280);
  }

  window.setTimeout(() => {
    revealCooldown = false;
  }, isReducedMotion ? 90 : 350);
};

const onWheel = (event) => {
  if (!revealLocked) {
    return;
  }

  if (Math.abs(event.deltaY) < 4) {
    return;
  }

  event.preventDefault();
  revealStepFromScroll();
};

const onTouchStart = (event) => {
  touchStartY = event.touches[0]?.clientY ?? null;
};

const onTouchMove = (event) => {
  if (!revealLocked) {
    return;
  }

  const currentY = event.touches[0]?.clientY;
  if (touchStartY === null || currentY === undefined) {
    return;
  }

  if (Math.abs(currentY - touchStartY) < 8) {
    return;
  }

  event.preventDefault();
  revealStepFromScroll();
  touchStartY = currentY;
};

const onKeyDown = (event) => {
  if (!revealLocked) {
    return;
  }

  const isScrollKey = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Spacebar"].includes(
    event.key
  );

  if (!isScrollKey) {
    return;
  }

  event.preventDefault();
  revealStepFromScroll();
};

const revealInitialItem = () => {
  const firstItem = revealItems[0];

  if (!firstItem) {
    releaseScroll();
    return;
  }

  firstItem.classList.add("is-visible");
  currentIndex = 1;
};

const observeSectionReveal = (section, threshold = 0.3) => {
  if (!section) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
        }
      });
    },
    { threshold }
  );

  observer.observe(section);
};

document.body.classList.add("reveal-locked");
thread.classList.add("reveal-locked");
revealInitialItem();

window.addEventListener("wheel", onWheel, { passive: false });
window.addEventListener("touchstart", onTouchStart, { passive: true });
window.addEventListener("touchmove", onTouchMove, { passive: false });
window.addEventListener("keydown", onKeyDown);

if (revealItems.length <= 1) {
  releaseScroll();
}

if (previewMode === "all") {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  currentIndex = revealItems.length;
  releaseScroll();
  if (storySection) {
    storySection.classList.add("is-visible");
  }
  if (directionsSection) {
    directionsSection.classList.add("is-visible");
  }
}

observeSectionReveal(storySection, 0.35);
observeSectionReveal(directionsSection, 0.28);
