import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="dashboard-title">Register</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="form-control"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="form-control"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="form-control"
        />
        <button className="form-button" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
