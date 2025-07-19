import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  // Get all posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/post");
      setPosts(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts/create", form);
      setForm({ title: "", content: "" });
      fetchPosts();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/post/${id}`);
      fetchPosts();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Update post (simple version – prompt)
  const handleUpdate = async (post) => {
    const title = prompt("New title", post.title);
    const content = prompt("New content", post.content);
    if (title && content) {
      try {
        await API.put(`/posts/post/${post._id}`, { title, content });
        fetchPosts();
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Posts</h2>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Post</button>
      </form>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <small className="post-author">By {post.author?.name}</small> <br />
            <div className="post-actions">
              <button
                className="post-button"
                onClick={() => handleUpdate(post)}
              >
                Edit
              </button>
              <button
                className="post-button"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
