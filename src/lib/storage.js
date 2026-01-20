const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

export const getStorageItem = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  return safeParse(window.localStorage.getItem(key), fallback);
};

export const setStorageItem = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const todayKey = () => new Date().toISOString().slice(0, 10);

export const updateStreakIfNeeded = () => {
  if (typeof window === "undefined") return;
  const data = getStorageItem("streak", { lastDate: null, count: 0 });
  const today = todayKey();
  if (data.lastDate === today) return data;

  const nextCount = Math.min(7, (data.count || 0) + 1);
  const next = { lastDate: today, count: nextCount };
  setStorageItem("streak", next);
  return next;
};

export const getStreak = () => getStorageItem("streak", { lastDate: null, count: 0 });
