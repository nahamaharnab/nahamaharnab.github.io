const pronunciationButtons = document.querySelectorAll(".pronunciation-audio");
const canSpeak =
  "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

pronunciationButtons.forEach((button) => {
  const control = button.closest(".pronunciation-control");
  const tooltip = document.getElementById(button.getAttribute("aria-describedby"));
  let isPinned = false;

  const showMeaning = () => {
    tooltip.hidden = false;
  };
  const hideMeaning = () => {
    isPinned = false;
    tooltip.hidden = true;
  };

  button.hidden = false;
  if (!canSpeak) {
    button.setAttribute("aria-label", "Learn the meaning of Maharnab");
  }

  control.addEventListener("pointerenter", showMeaning);
  control.addEventListener("pointerleave", () => {
    if (!isPinned && document.activeElement !== button) {
      hideMeaning();
    }
  });
  button.addEventListener("focus", showMeaning);
  button.addEventListener("blur", hideMeaning);
  document.addEventListener("pointerdown", (event) => {
    if (!control.contains(event.target)) {
      hideMeaning();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideMeaning();
    }
  });

  button.addEventListener("click", () => {
    isPinned = true;
    showMeaning();

    if (!canSpeak) {
      return;
    }

    window.speechSynthesis.cancel();

    const pronunciationText = button
      .closest(".pronunciation-line")
      .querySelector(".pronunciation")
      .textContent.trim()
      .replace(/\s+/g, ", ")
      .toLowerCase();
    const pronunciation = new SpeechSynthesisUtterance(pronunciationText);
    pronunciation.lang = "en-US";
    pronunciation.rate = 0.75;

    window.speechSynthesis.speak(pronunciation);
  });
});

document.querySelectorAll("[data-placeholder-message]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.alert(link.dataset.placeholderMessage);
  });
});

document.querySelectorAll("[data-abstract-toggle]").forEach((button) => {
  const panelId = button.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;

  if (!panel) {
    return;
  }

  button.addEventListener("click", () => {
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";

    button.setAttribute("aria-expanded", String(shouldOpen));
    panel.hidden = !shouldOpen;
  });
});
