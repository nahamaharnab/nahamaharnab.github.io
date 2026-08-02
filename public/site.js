const pronunciationButtons = document.querySelectorAll(".pronunciation-audio");
const canSpeak =
  "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

const maleVoiceHints = [
  "male",
  "david",
  "mark",
  "guy",
  "ryan",
  "george",
  "alex",
  "daniel",
  "aaron",
  "tom",
  "fred",
  "ralph",
  "bruce",
];

const findPreferredVoice = () => {
  const englishVoices = window.speechSynthesis
    .getVoices()
    .filter((voice) => /^en(?:-|_|$)/i.test(voice.lang));

  for (const hint of maleVoiceHints) {
    const voice = englishVoices.find((candidate) =>
      candidate.name.toLowerCase().includes(hint),
    );

    if (voice) {
      return voice;
    }
  }

  return (
    englishVoices.find((voice) => /^en(?:-|_)US$/i.test(voice.lang)) ??
    englishVoices[0] ??
    null
  );
};

pronunciationButtons.forEach((button) => {
  if (!canSpeak) {
    return;
  }

  button.hidden = false;
  button.addEventListener("click", () => {
    window.speechSynthesis.cancel();

    const pronunciation = new SpeechSynthesisUtterance("ma her nub, nah huh");
    pronunciation.lang = "en-US";
    pronunciation.pitch = 0.9;
    pronunciation.rate = 0.75;

    const preferredVoice = findPreferredVoice();
    if (preferredVoice) {
      pronunciation.voice = preferredVoice;
    }

    window.speechSynthesis.speak(pronunciation);
  });
});
