__all__ = ['TestComment']
import sqlalchemy as sa
from sqlalchemy.orm import relationship

from baselayer.app.models import Base, User


class TestComment(Base):
    text = sa.Column(sa.String, nullable=False, doc="Comment text")

    user_id = sa.Column(
        sa.ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        doc="ID of the User that submitted the comment",
    )
    user = relationship(
        "User",
        foreign_keys=[user_id],
        back_populates="test_comments",
        doc="The User that submitted the comment",
    )

    User.test_comments = relationship(
        "TestComment",
        back_populates="user",
        passive_deletes=True,
        doc="Comments submitted by this User",
    )