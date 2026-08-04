const pronunciationButtons = document.querySelectorAll(".pronunciation-audio");
const canSpeak =
  "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

pronunciationButtons.forEach((button) => {
  if (!canSpeak) {
    return;
  }

  button.hidden = false;
  button.addEventListener("click", () => {
    window.speechSynthesis.cancel();

    const pronunciation = new SpeechSynthesisUtterance("ma her nub, nah huh");
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
