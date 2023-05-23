import edit from "../images/edit.svg";

function openEditPost() {
  document.getElementById("editForm").style.display = "block";
  document.getElementById("editButton").style.display = "none";
}

function closeEditPost() {
  document.getElementById("editForm").style.display = "none";
  document.getElementById("editButton").style.display = "block";
}

const EditForm = (props) => {
  return (
    <div className="Post">
      <img src={edit} alt="" id="editButton" onClick={openEditPost} />
      <div className="form-popup" id="editForm">
        <form
          action="/action_page.php"
          className="form-container"
          onSubmit={props.editPost}
        >
          <p>Edit Post</p>
          <div className="dateWrapper">
            <label htmlFor="date">
              <b>Date:&nbsp;&nbsp;&nbsp;</b>
            </label>
            <p className="entryDate">**Date</p>
          </div>
          <br />
          <div className="postBox">
            <label htmlFor="post">
              <b>Entry Details:</b>
            </label>
            <textarea
              value={props.newPost}
              onChange={props.handleNewPost}
              placeholder="I am grateful for..."
              name="post"
              required
            ></textarea>
          </div>
          <div className="buttonWrapper">
            <button type="submit" className="btn">
              Post
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={closeEditPost}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
