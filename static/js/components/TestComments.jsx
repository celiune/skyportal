import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import our action creators from static/js/ducks/testComments.js - see below
import * as commentsActions from '../ducks/testComments';


const TestComments = () => {
  const comments = useSelector((state) => state.testComments);
  const dispatch = useDispatch();
  const [newCommentText, setNewCommentText] = useState("");

  // Fetch comments upon initial component render
  useEffect(() => {
    dispatch(commentsActions.fetchComments());
  }, [dispatch]);

  // Define text input field's onChange callback
  const handleCommentTextChange = (event) => {
    setNewCommentText(event.target.value);
  };

  // Define submission callback
  const handleSubmitNewComment = async () => {
    const requestResult = await dispatch(commentsActions.submitComment(newCommentText));
    if (requestResult.status === "success") {
      setNewCommentText("");
    }
  };

  return (
    <div>
      <div>
        Comments:
        <ul>
          {comments.map((comment, idx) => (
            <li key={idx}>
              {comment.text}
            </li>
           ))}
        </ul>
      </div>
      <div>
        Submit new comment
        <br />
        <input
          type="text"
          value={newCommentText}
          onChange={handleCommentTextChange}
          data-testid="testCommentInput"
        />
        <br />
        <button
          type="button"
          onClick={handleSubmitNewComment}
          data-testid="testCommentSubmitButton"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TestComments;
