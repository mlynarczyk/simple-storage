const isLocalStorageAvailable = (() => {
  const test = 'testIfLocalStorageIsAvailable';

  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (_) {
    return false;
  }
})();

function get(
  key: string,
  defaultValue: any = null,
  { useJSONParse = true } = {},
) {
  if (!isLocalStorageAvailable) return defaultValue;

  const value: string | null = localStorage.getItem(key);

  const valueWithDefaultFallback = value === null ? defaultValue : value;

  if (!useJSONParse) return valueWithDefaultFallback;

  try {
    return value === null ? valueWithDefaultFallback : JSON.parse(value);
  } catch (_) {
    return defaultValue;
  }
}

function set(key: string, value: any, { useJSONStringify = true } = {}) {
  if (!isLocalStorageAvailable) return false;
  const normalizedValue = useJSONStringify ? JSON.stringify(value) : value;

  try {
    localStorage.setItem(key, normalizedValue);
    return true;
  } catch (_) {
    return false;
  }
}

function remove(key: string) {
  if (!isLocalStorageAvailable) return;
  localStorage.removeItem(key);
}

function clear() {
  if (!isLocalStorageAvailable) return;
  localStorage.clear();
}

export const LocalStorage = {
  get,
  set,
  remove,
  clear,
};
