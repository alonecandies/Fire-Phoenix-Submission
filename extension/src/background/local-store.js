import browser from 'webextension-polyfill';

/**
 * A wrapper around the extension's storage local API
 */
export default class ExtensionStore {
  constructor() {
    this.isSupported = Boolean(browser.storage.local);
    if (!this.isSupported) {
      console.error('Storage local API not available.');
    }
  }

  /**
   * Returns all of the keys currently saved
   *
   * @returns {Promise<*>}
   */
  async get() {
    if (!this.isSupported) {
      return undefined;
    }
    const result = await this._get();
    // extension.storage.local always returns an obj
    // if the object is empty, treat it as undefined
    if (isEmpty(result)) {
      return undefined;
    }
    return result;
  }

  /**
   * Sets the key in local state
   *
   * @param {Object} state - The state to set
   * @returns {Promise<void>}
   */
  async set(state) {
    return this._set(state);
  }

  /**
   * Returns all of the keys currently saved
   *
   * @private
   * @returns {Object} the key-value map from local storage
   */
  _get() {
    const { local } = browser.storage;
    return new Promise((resolve, reject) => {
      local.get(null).then((/** @type {any} */ result) => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Sets the key in local state
   *
   * @param {Object} obj - The key to set
   * @returns {Promise<void>}
   * @private
   */
  _set(obj) {
    const { local } = browser.storage;
    return new Promise((resolve, reject) => {
      local.set(obj).then(() => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

/**
 * Returns whether or not the given object contains no keys
 *
 * @param {Object} obj - The object to check
 * @returns {boolean}
 */
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Returns an Error if extension.runtime.lastError is present
 * this is a workaround for the non-standard error object that's used
 *
 * @returns {Error|undefined}
 */
 function checkForError() {
  const { lastError } = browser.runtime;
  if (!lastError) {
    return undefined;
  }
  // if it quacks like an Error, its an Error
  if (lastError.stack && lastError.message) {
    return lastError;
  }
  // repair incomplete error object (eg chromium v77)
  return new Error(lastError.message);
}
