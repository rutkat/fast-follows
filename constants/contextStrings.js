// Variables used in background.js
const MSG_ID_QUERY = 'query';
const EXT_UPDATE = 'update'
const EXT_INSTALL = 'install'

const contextMenuItem = {
  'id': MSG_ID_QUERY,
  'title': 'Query page for Followers',
  'contexts': ['page']
};

const usersFound = ' or more users found';
const usersFollowed = ' or more users followed';

const noticeNotFound = {
  type: 'basic',
  iconUrl: 'images/icon-64.png',
  title: 'Fast Follow!',
  message: 'Users who you do not follow arecd  not found on this page.'
}
// clone object to later overwrite message key
const noticeFound = noticeNotFound;
const noticeFollowed = noticeNotFound;
