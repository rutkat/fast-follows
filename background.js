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

  // if (msg.syncStorage === true) {
  //   let utcToday = new Date().toJSON().slice(0,10);//.replace(/-/g,'/');
  //   let domainName = new URL(currentUrl).hostname;
  //   const followState = {
  //     [domainName]: {
  //       'date': utcToday,
  //       'followedCount': msg.integer
  //     }
  //   }
  //   setStorage(followState);
  // }
}

function setStorage(followState) {
  if (!followState) return false;
  // let key = Object.keys(followState)[0];
console.log('setStorage() needs work. maybe use localstorage in content.js');
  // chrome.storage.local.set({'medium':'test'});
  // chrome.storage.sync.set(followState, function() {
  // });

  chrome.storage.sync.get('medium.com', function(result) {
    console.log('Value currently is ' + result.key );
    // exists
    if (!!result.key) {

    }
  });

}
