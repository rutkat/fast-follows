const DOMAIN_LIST = [
  'twitter.com',
  'soundcloud.com',
  'medium.com',
  'quora.com',
  'pinterest.com',
  'linkedin.com'
];

const FOLLOW_SELECTORS = {
  'twitter.com': '[role="button"][data-testid$="-follow"]',
  'soundcloud.com': '.sc-button-follow.sc-button:not(.sc-button-selected)',
  'medium.com': '.button--follow:not(.is-touched)',
  'quora.com': '.UserConnectionsFollowersList .ui_button--PillStyle',
  'pinterest.com': '.RCK.Hsu.mix',
  'linkedin.com': '.js-discover-person-card__action-btn'
}

const USER_LIMIT = 35;
const TIMER_DELAY = 1000;
