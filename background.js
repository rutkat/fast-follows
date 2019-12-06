// file pulls in variables from 'constants/contextStrings.js'
// set defaults
let userCount = 0;
let currentUrl = null;
let currentTabId = '';

// cache currentUrl of current tab and tabId to be used outside of listener
chrome.tabs.onActivated.addListener(activeTab => {

  currentTabId = activeTab.tabId;
  chrome.tabs.get(currentTabId, id => {
    currentUrl = id.url
  });
});

chrome.runtime.onMessage.addListener(gotMessage);

// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(status) {

  if (status.reason === EXT_INSTALL) {
    chrome.tabs.create({url: 'help.html'});
  }

});

// run a script when tab is reloaded
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  if (changeInfo.status == 'complete') {
    // chrome.tabs.executeScript(null, {code:"init()"});
    chrome.pageAction.show(tabId);
  }

});


// create a context menu
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(queryPage);

function queryPage(page) {

  // user executed context menu
  if (page.menuItemId == MSG_ID_QUERY) {
    chrome.tabs.sendMessage(currentTabId, {query: true});
  }

}

function gotMessage(msg, sender, sendResponse) {

  let loc = currentUrl ? ' on ' + currentUrl : '';

  if (msg.integer === 0 && msg.update === false) {
    chrome.notifications.create(noticeNotFound, function(id) {
      notifId = id;
    });
  }

  if (msg.query) {
    // msg from popup, to query page
    chrome.tabs.sendMessage(currentTabId, {query: true});
  }

  if (msg.integer && msg.update === true) {
    noticeFollowed.message = msg.integer + usersFollowed;
    chrome.notifications.create(noticeFollowed);
  }

}
