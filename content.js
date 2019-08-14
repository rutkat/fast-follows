// file also includes variables from 'constants/domainList.js'
window.onload = init();
function init() {

  const activeDomain = ((new URL(document.location.href)).hostname).replace('www.', '');

  // follower placeholder
  let elements = '';
  let messageState = {
    'integer': 0,
    'syncStorage': true, // not working
    'domainName': activeDomain,
    'update': false
  };

  // xxx faulty to run once on load
  // elements = document.querySelectorAll(FOLLOW_SELECTORS[activeDomain]);
  // xxx update object with element count
  // messageState.integer = elements.length;
  // chrome.runtime.sendMessage(messageState);

  chrome.runtime.onMessage.addListener(receiveMsg);

  function receiveMsg(msg, sender, sendResponse) {
   console.log( 'msg content.js ', msg, sender, sendResponse);
    if (msg.query === true) {
      queryPage(FOLLOW_SELECTORS[activeDomain]);
    }
  }

  function queryPage(DOMSelector) {
    elements = document.querySelectorAll(DOMSelector);
    follow(elements);
  }

  function follow(users) {
    // if no users found, notify background.js
    if (users.length < 1) {
      chrome.runtime.sendMessage(messageState);
      return false;
    }
    messageState.update = false;

    let amountAllowed = (users.length > USER_LIMIT ? USER_LIMIT : users.length);

    // prompt for confirmation
    let answer = confirm(`Are you sure you want to follow ${amountAllowed} users? (Daily Limit ${USER_LIMIT})`);

    if (answer === false) return false;

    // counter for notification
    let following = 0;
    // set threshold for loop
    for (let i = 0; i < amountAllowed; i++) {
      // users[i].click();
      // (function(user) {
      (user => {
        // setTimeout(() => console.log(user), TIMER_DELAY); // debug
        setTimeout(() => user.click(), TIMER_DELAY)
      })(users[i]);
      following++;
    }
    // update messageState, send to background.js for notification
    messageState.integer = following;
    messageState.update = true;
      chrome.runtime.sendMessage(messageState);
  }

}
