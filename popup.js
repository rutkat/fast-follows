window.onload = init;

function init() {
  const activeDomain = ((new URL(document.location.href)).hostname).replace('www.', '');
  let btn = document.querySelector('#queryBtn');
  let messageState = {
    'integer': 0,
    'query': true
  };

  btn.addEventListener('click', function() {
    chrome.runtime.sendMessage(messageState);
  });

};
