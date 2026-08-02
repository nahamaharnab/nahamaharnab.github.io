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

document.querySelectorAll("[data-placeholder-download]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});
