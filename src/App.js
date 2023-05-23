import { useState, useEffect } from "react";
import postServices from "./services/postServices";

import Filter from "./components/filter";
import PostForm from "./components/postForm";
import Posts from "./components/posts";
import sun from "./images/sun.svg";
import box from "./images/box.png";
import week from "./images/week.png";
import month from "./images/month.png";
import star from "./images/star.png";

/* --- --- --- --- --- VARIABLES --- --- --- --- --- --- */

const App = () => {
  const [posts, setPosts] = useState([]);
  const [categorized, setCategorized] = useState([]);

  useEffect(() => {
    postServices.getAll().then((response) => {
      setPosts(response.data);
      setCategorized(response.data);
    });
  }, []);

  const [filter, setFilter] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newDate, setNewDate] = useState("");
  const [order, setOrder] = useState(true);
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState("ALL ENTRIES");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNewPost = (event) => {
    setNewContent(event.target.value);
  };

  const handleNewDate = (event) => {
    setNewDate(event.target.value);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 9999999999999999);
  };

  /* --- --- --- --- --- SIDEBAR FUNCTIONS --- --- --- --- --- --- */

  /*
  const allEntries = () => {
    postServices.getAll().then((response) => {
      setPosts(response.data);
    });
  };
  
  const weekEntries = () => {
    const today = new Date();
    const weekAgo = new Date(today.setDate(today.getDate() - 7));
    let weekPosts = posts.filter((post) => {
      let pdate = new Date(post.date);
      return pdate >= weekAgo;
    });
    setPosts(weekPosts);
  };

  const monthEntries = () => {
    const today = new Date();
    const monthAgo = new Date(today.setDate(today.getDate() - 30));
    let monthPosts = posts.filter((post) => {
      let pdate = new Date(post.date);
      return pdate >= monthAgo;
    });
    setPosts(monthPosts);
  };

  const favoriteEntries = () => {
    let favoritePosts = posts.filter((post) => {
      return post.favorite === true;
    });
    setPosts(favoritePosts);
  };
*/

  const categorizer = (event) => {
    setCategorized(posts);
    const today = new Date();
    const weekAgo = new Date(today.setDate(today.getDate() - 7));
    const monthAgo = new Date(today.setDate(today.getDate() - 30));
    setCategorized(
      posts.filter((post) => {
        const postDate = new Date(post.date);
        const postYear = new Date(post.date).getYear() + 1900;
        if (post.content === undefined || post.content === null) {
          return;
        } else {
          switch (event.target.id) {
            case "all":
              return post;
            case "week":
              return postDate >= weekAgo;
            case "month":
              return postDate >= monthAgo;
            case "favorites":
              return post.favorite === true;
            case "2023":
              return postYear === 2023;
            case "2022":
              return postYear === 2022;
            default:
              return post;
          }
        }
      })
    );
    setTitle(event.target.name);
  };

  /* --- --- --- --- --- MAIN CONTENT FUNCTIONS --- --- --- --- --- --- */

  const addNewPost = (event) => {
    const newDateConv = new Date(newDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const newPost = {
      content: newContent,
      date: newDateConv.toLocaleDateString("en-us", options),
      id: generateId(),
      favorite: false,
    };
    event.preventDefault();

    if (
      posts
        .map(
          (post) =>
            post.date === newDateConv.toLocaleDateString("en-us", options)
        )
        .includes(true)
    ) {
      setMessage(`*There is already an existing entry for this date`);
      setTimeout(() => {
        setMessage(null);
      }, 10000);
    } else if (newContent.length > 100) {
      setMessage(`*Entry must not exceed 100 characters`);
      setTimeout(() => {
        setMessage(null);
      }, 10000);
    } else if (newDateConv > new Date()) {
      setMessage(`*Entry must not be set in the future`);
      setTimeout(() => {
        setMessage(null);
      }, 10000);
    } else {
      setPosts(posts.concat(newPost));
      setCategorized(posts.concat(newPost));
      setTitle("ALL ENTRIES");
      setNewDate("");

      postServices.create(newPost).then((response) => {
        setPosts(posts.concat(response.data));
      });
      setNewContent("");
    }
  };

  const filtered = categorized.filter((post) => {
    if (
      post.content === undefined ||
      filter === undefined ||
      filter === null ||
      post.content === null
    ) {
      return;
    } else {
      return post.content.toLowerCase().includes(filter.toLowerCase());
    }
  });

  const sortOrder = () => {
    setOrder(!order);
    postServices.getAll().then((response) => {
      setPosts(response.data);
    });
  };

  const sorted = filtered.sort((post1, post2) => {
    if (order) {
      return new Date(post1.date) - new Date(post2.date);
    } else {
      return new Date(post2.date) - new Date(post1.date);
    }
  });

  const handleDelete = (event) => {
    const idDelete = Number(event.target.id);
    const postDelete = event.target.name;
    console.log(postDelete);

    if (
      window.confirm(
        `Are you sure you want to delete the entry for ${postDelete}?`
      )
    ) {
      postServices.deletePost(idDelete).then((response) => {
        return response.data;
      });
      postServices.getAll().then((response) => {
        setPosts(response.data);
        setCategorized(categorized.filter((post) => post.id !== idDelete));
      });
    }
  };

  const editPost = (event) => {
    const targetDate = event.target.name;
    const inputContent = prompt("New details for this entry:", targetDate);
    const idEdit = Number(event.target.id);
    const postToChange = posts.find((post) => post.id === idEdit);
    const changedPost = { ...postToChange, content: inputContent };

    if (inputContent) {
      postServices.update(idEdit, changedPost).then((response) => {
        return response.data;
      });
      postServices.getAll().then((response) => {
        setPosts(response.data);
      });
      setCategorized(
        categorized.filter((post) => post.id !== idEdit).concat(changedPost)
      );
    } else {
      return;
    }
  };

  const changeStar = (event) => {
    const idEdit = Number(event.target.id);
    const starEdit = Boolean(event.target.name);
    const postToChange = posts.find((post) => post.id === idEdit);
    const changedPost = { ...postToChange, favorite: !starEdit };

    postServices.update(idEdit, changedPost).then((response) => {
      return response.data;
    });
    postServices.getAll().then((response) => {
      setPosts(response.data);
      setCategorized(
        categorized.filter((post) => post.id !== idEdit).concat(changedPost)
      );
    });
  };

  /* --- --- --- --- --- APP RENDER --- --- --- --- --- --- */

  return (
    <div>
      <div id="header">
        <div className="logo">
          <img src={sun} alt="" id="sun" />
          <h1 className="title">Gratitude Journal</h1>
        </div>
        <Filter filter={filter} handleFilter={handleFilter} />
      </div>
      <div id="main">
        <div id="sidebar">
          <div className="sbHeader">HOME</div>
          <hr />
          <div className="sbitems">
            <img
              src={box}
              alt=""
              className="svgicon"
              onClick={categorizer}
              name="ALL ENTRIES"
            />
            <button id="all" onClick={categorizer} name="ALL ENTRIES">
              ALL ENTRIES
            </button>
          </div>
          <div className="sbitems">
            <img
              src={week}
              alt=""
              className="svgicon"
              onClick={categorizer}
              name="LAST 7 DAYS"
            />
            <button id="week" onClick={categorizer} name="LAST 7 DAYS">
              LAST 7 DAYS
            </button>
          </div>
          <div className="sbitems">
            <img
              src={month}
              alt=""
              className="svgicon"
              onClick={categorizer}
              name="LAST 30 DAYS"
            />
            <button id="month" onClick={categorizer} name="LAST 30 DAYS">
              LAST 30 DAYS
            </button>
          </div>
          <div className="sbitems">
            <img
              src={star}
              alt=""
              className="svgicon"
              onClick={categorizer}
              name="STARRED"
            />
            <button id="favorites" onClick={categorizer} name="STARRED">
              STARRED
            </button>
          </div>
          <br />
          <br />
          <div className="sbHeader">ARCHIVE</div>
          <hr />
          <button
            id="2023"
            className="archiveItems"
            onClick={categorizer}
            name="2023"
          >
            2023
          </button>
          <button
            id="2022"
            className="archiveItems"
            onClick={categorizer}
            name="2022"
          >
            2022
          </button>
        </div>
        <div id="content">
          <div className="titleBox">
            <p>{title}</p>
          </div>
          <Posts
            posts={posts}
            order={order}
            sorted={sorted}
            sortOrder={sortOrder}
            changeStar={changeStar}
            handleDelete={handleDelete}
            editPost={editPost}
          />
          <PostForm
            addNewPost={addNewPost}
            newContent={newContent}
            handleNewPost={handleNewPost}
            newDate={newDate}
            handleNewDate={handleNewDate}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
