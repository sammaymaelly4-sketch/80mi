import { getStorageItem, setStorageItem } from "@/lib/storage";

const todayKey = () => new Date().toISOString().slice(0, 10);

const buildKey = (template) => template.replace("YYYY-MM-DD", todayKey());

const readIds = (template) => getStorageItem(buildKey(template), []);

const writeIds = (template, ids) => setStorageItem(buildKey(template), ids);

export const markCardShown = (id, storageKeys) => {
  if (!storageKeys?.shown_today) return;
  const shown = readIds(storageKeys.shown_today);
  if (shown.includes(id)) return;
  writeIds(storageKeys.shown_today, [id, ...shown]);
};

export const markCardDismissed = (id, storageKeys) => {
  if (!storageKeys?.dismissed_today) return;
  const dismissed = readIds(storageKeys.dismissed_today);
  if (dismissed.includes(id)) return;
  writeIds(storageKeys.dismissed_today, [id, ...dismissed]);
};

export const selectDailyCard = (cards, storageKeys) => {
  if (!Array.isArray(cards) || cards.length === 0) return null;
  if (!storageKeys?.shown_today || !storageKeys?.dismissed_today) {
    return cards[0] || null;
  }

  const shown = readIds(storageKeys.shown_today);
  const dismissed = readIds(storageKeys.dismissed_today);
  const shownId = shown[0];

  if (shownId) {
    if (dismissed.includes(shownId)) return null;
    return cards.find((card) => card.id === shownId) || null;
  }

  const next = cards.find((card) => !dismissed.includes(card.id));
  if (!next) return null;
  markCardShown(next.id, storageKeys);
  return next;
};
