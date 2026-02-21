const thread = document.getElementById("chatThread");
const revealItems = [...document.querySelectorAll(".reveal-item")];
const storySection = document.getElementById("storySection");
const urlParams = new URLSearchParams(window.location.search);
const previewMode = urlParams.get("preview");

let currentIndex = 0;
let revealLocked = true;
let revealCooldown = false;
let touchStartY = null;

const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealNow = (el) => {
  if (!el || el.classList.contains("is-visible")) {
    return;
  }

  el.classList.add("is-visible");
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
}

if (storySection) {
  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          storySection.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.35 }
  );

  storyObserver.observe(storySection);
}
