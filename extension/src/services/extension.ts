import { closeCurrentWindow } from "src/background/bgHelper";

export const sendMessage = (opt?: Object): Promise<any> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(opt, (response) => {
      resolve(response);
    });
  });
};

export const listenMessage = () => {
  const cb = function (request: any, sender: any, sendResponse: any) {
    chrome.runtime.onMessage.removeListener(cb);
    if (request.type === "close_popup") {
      // if (Object.values(DAPP_REQUEST_METHODS).some((item) => window.location.href.includes(item))) {
      //   sendMessage({ type: "log", message: { request, sender } });
      //   sendResponse(true);
      //   closeCurrentWindow();
      // } else {
      //   sendResponse(false);
      // }
    }
    return true;
  };
  chrome.runtime.onMessage.addListener(cb);

  window.addEventListener(
    "beforeunload",
    () => {
      sendMessage({ type: "close_popup_window" });
    },
    false,
  );
};
