from baselayer.app.access import auth_or_token
from ..base import BaseHandler
from ...models import TestComment


class TestCommentHandler(BaseHandler):
    @auth_or_token
    def get(self):
        # If we wanted to do any query filtering, this is where that would happen
        with self.Session() as session:
            comments = session.scalars(
                TestComment.select(session.user_or_token)
            ).all()
            return self.success(data=comments)

    @auth_or_token
    def post(self):
        data = self.get_json()
        comment_text = data.get("commentText")
        if comment_text is None or comment_text == "":
            return self.error("`commentText` must be provided as a non-empty string")
        with self.Session() as session:
            comment = TestComment(
                text=comment_text,
                user_id=session.user_or_token.id,
            )
            session.add(comment)
            session.commit()
            self.push_all(action='skyportal/FETCH_TEST_COMMENTS')
            return self.success(data=comment)