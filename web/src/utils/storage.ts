export const STORAGE_PREFIX = 'MAH_AURA_V1_';
export const Ledger = {
  get: (key) => localStorage.getItem(STORAGE_PREFIX + key),
  set: (key, val) => {
    localStorage.setItem(STORAGE_PREFIX + key, val);
    const payload = ['AGE', 'OATH', 'AUTH', 'SOUL', 'LANG'].map(k => localStorage.getItem(STORAGE_PREFIX + k) ?? 'NULL').join('|');
    localStorage.setItem(STORAGE_PREFIX + 'CHK', btoa(payload).slice(0, 16));
  },
  verify: () => {
    const expected = localStorage.getItem(STORAGE_PREFIX + 'CHK');
    if (!expected) return true;
    const payload = ['AGE', 'OATH', 'AUTH', 'SOUL', 'LANG'].map(k => localStorage.getItem(STORAGE_PREFIX + k) ?? 'NULL').join('|');
    return expected === btoa(payload).slice(0, 16);
  }
};