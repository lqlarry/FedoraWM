chrome.runtime.onInstalled.addListener(details => {
  switch (details.reason) {
    case 'install':
      chrome.tabs.create({url: 'https://pedrolucasmag.github.io/dark-themes/gnews'});
	  console.log("New tab launched with https://pedrolucasmag.github.io/dark-themes/gnews");
      break;

    case 'update':
	  console.log("Dark Theme for Google News Updated!");
      break;
  }
});