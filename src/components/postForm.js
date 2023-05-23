import Message from "./message";

function openPost() {
  document.getElementById("entryForm").style.display = "block";
  document.getElementById("newButton").style.display = "none";
}

function closePost() {
  document.getElementById("entryForm").style.display = "none";
  document.getElementById("newButton").style.display = "block";
}

const PostForm = (props) => {
  return (
    <div className="newPost">
      <button id="newButton" onClick={openPost}>
        &nbsp;&nbsp;+ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NEW
      </button>
      <div className="form-popup" id="entryForm">
        <form
          action="/action_page.php"
          className="form-container"
          onSubmit={props.addNewPost}
        >
          <p>New Gratitude Post</p>
          <div className="dateWrapper">
            <label htmlFor="date">
              <b>Date:&nbsp;&nbsp;&nbsp;</b>
            </label>
            <input
              type="Date"
              value={props.newDate}
              onChange={props.handleNewDate}
              id="date"
              name="date"
              required
            />
            <Message message={props.message} />
          </div>
          <br />
          <div className="postBox">
            <label htmlFor="post">
              <b>Entry Details:</b>
            </label>
            <textarea
              value={props.newContent}
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
            <button type="button" className="btn cancel" onClick={closePost}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
