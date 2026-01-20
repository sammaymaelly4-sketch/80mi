const LAST_SEEN_KEY = "welcome_last_seen_date";
const ALWAYS_SHOW_KEY = "welcome_show_always";

const pad = (value) => String(value).padStart(2, "0");

export const getTodayKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
};

export const shouldShowWelcomeSplash = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const alwaysShow = window.localStorage.getItem(ALWAYS_SHOW_KEY) === "true";
  if (alwaysShow) {
    return true;
  }

  const lastSeen = window.localStorage.getItem(LAST_SEEN_KEY);
  const today = getTodayKey();
  return lastSeen !== today;
};

export const markWelcomeSeen = (date = new Date()) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LAST_SEEN_KEY, getTodayKey(date));
};

export const welcomeStorageKeys = {
  alwaysShow: ALWAYS_SHOW_KEY,
  lastSeen: LAST_SEEN_KEY
};
