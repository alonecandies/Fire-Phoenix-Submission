// If your extension doesn't need a content script, just leave this file empty

// This is an example of a script that will run on every page. This can alter pages
// Don't forget to change `matches` in manifest.json if you want to only change specific webpages

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig

export function injectScript(file_path, tag) {
  console.log("inject");
  const container = document.head || document.documentElement;
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("async", "false");
  scriptTag.setAttribute("type", "text/javascript");
  scriptTag.setAttribute("src", file_path);
  container.insertBefore(scriptTag, container.children[0]);
  container.removeChild(scriptTag);

  // var node = document.getElementsByTagName(tag)[0];
  // var script = document.createElement("script");
  // script.setAttribute("type", "text/javascript");
  // script.setAttribute("src", file_path);
  // node.appendChild(script);
}

injectScript(global.chrome.extension.getURL("inpage.js"), "body");
