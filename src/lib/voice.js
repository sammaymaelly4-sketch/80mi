export const isVoiceEnabled = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem("voice_enabled") === "true";
};

export const speak = (text) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!isVoiceEnabled()) {
    return;
  }

  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};
