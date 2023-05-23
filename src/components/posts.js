import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
} from "@fortawesome/free-solid-svg-icons";
import starOutline from "../images/star-outline.svg";
import star from "../images/star.svg";
import trash from "../images/trash.svg";
import edit from "../images/edit.svg";

const Posts = ({
  posts,
  order,
  sorted,
  sortOrder,
  sortEntries,
  changeStar,
  handleDelete,
  editPost,
  newContent,
  setChangedContent,
}) => {
  let sortIcon = order ? (
    <FontAwesomeIcon
      icon={faAngleDoubleUp}
      onClick={sortOrder}
      id="iconButton"
    />
  ) : (
    <FontAwesomeIcon
      icon={faAngleDoubleDown}
      onClick={sortOrder}
      id="iconButton"
    />
  );
  return (
    <div id="entryWrapper">
      <div id="dateOrder">
        {sortIcon}
        <button onClick={sortOrder}>&nbsp;&nbsp;DATE</button>
      </div>
      {sorted.map((post) => {
        let starIcon = post.favorite ? (
          <img
            src={star}
            alt=""
            id={post.id}
            className="star"
            name={post.favorite.toString()}
            onClick={changeStar}
          />
        ) : (
          <img
            src={starOutline}
            alt=""
            id={post.id}
            className="starOutline"
            onClick={changeStar}
          />
        );
        return (
          <div className="entry" key={post.date}>
            <p className="entryDate">{post.date}</p>
            <p className="entryContent">{post.content}</p>
            {starIcon}
            <img
              src={edit}
              alt=""
              className="edit"
              id={post.id}
              name={post.content}
              onClick={editPost}
            />
            <img
              src={trash}
              alt=""
              className="trash"
              name={post.date}
              id={post.id}
              onClick={handleDelete}
            />
          </div>
        );
      })}
      <div className="entry"></div>
    </div>
  );
};

export default Posts;
