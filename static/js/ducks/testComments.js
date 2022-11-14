import messageHandler from "baselayer/MessageHandler";

import * as API from '../API';
import store from '../store';


const FETCH_TEST_COMMENTS = 'skyportal/FETCH_TEST_COMMENTS';
const FETCH_TEST_COMMENTS_OK = 'skyportal/FETCH_TEST_COMMENTS_OK';

const SUBMIT_TEST_COMMENT = 'skyportal/SUBMIT_TEST_COMMENT';

export function fetchComments() {
  return API.GET('/api/test_comment', FETCH_TEST_COMMENTS);
}

export function submitComment(commentText) {
  return API.POST('/api/test_comment', SUBMIT_TEST_COMMENT, { commentText });
}

// Websocket message handler
messageHandler.add((actionType, payload, dispatch) => {
  if (actionType === FETCH_TEST_COMMENTS) {
    dispatch(fetchComments());
  }
});

const reducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_TEST_COMMENTS_OK: {
      return action.data;
    }
    default:
      return state;
  }
};

store.injectReducer('testComments', reducer);