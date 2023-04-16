import ObjectMultiplex from "obj-multiplex";
import pump from "pump";
import browser from "webextension-polyfill";

export function setupMultiplex(connectionStream) {
  const mux = new ObjectMultiplex();
  pump(connectionStream, mux, connectionStream, (err) => {
    if (err) {
      console.error(err);
    }
  });
  return mux;
}

export async function openPopup(queries, cb) {
  let width = 400;
  let height = 630;
  let top = 0;
  let left = global.screen.width - 400;

  const lastFocused = await getLastFocusedWindow();
  // Position window in top right corner of lastFocused window.
  top = lastFocused.top;
  left = lastFocused.left + (lastFocused.width - width);

  const windowId = await browser.windows.create({
    url: `popup.html?${queries}`,
    type: "popup",
    width,
    height,
    left,
    top,
  });

  // TODO: need remove listener after the event fired.
  browser.windows.onRemoved.addListener((id) => {
    if (windowId.id === id && cb) {
      cb();
    }
  });
}

export function getLastFocusedWindow() {
  return new Promise((resolve, reject) => {
    browser.windows.getLastFocused().then((windowObject) => {
      const error = checkForError();
      if (error) {
        return reject(error);
      }
      return resolve(windowObject);
    });
  });
}

export function closeCurrentWindow() {
  return browser.windows.getCurrent().then((windowDetails) => {
    return browser.windows.remove(windowDetails.id);
  });
}

export function checkForError() {
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

export function listenMessageFromPopup(cb) {
  const handleMessage = async (request, sender, sendResponse) => {
    const promise = new Promise((resolve, reject) => {
      cb(request, sender, sendResponse, resolve, reject);
    });
    promise.then(() => {
      browser.runtime.onMessage.removeListener(handleMessage);
    });
    return true;
  };
  browser.runtime.onMessage.addListener(handleMessage);
}

export function getCurrentPageInfo() {
  let url = "";
  // eslint-disable-next-line no-undef
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    url = tabs;
  });
  return url;
}
