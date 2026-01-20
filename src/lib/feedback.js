export const softFeedback = () => {
  if (typeof window === "undefined") return;
  if (navigator?.vibrate) {
    navigator.vibrate(30);
  }

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 520;
    gain.gain.value = 0.04;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.08);

    oscillator.onended = () => ctx.close();
  } catch (error) {
    // silent fallback
  }
};
