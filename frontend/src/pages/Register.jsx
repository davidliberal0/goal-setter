import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordTwo: "",
  });

  // capture state values
  const { name, email, password, passwordTwo } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // handle changes in form fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, passwordTwo);

    if (password !== passwordTwo) {
      toast.error("passwords do not match");
    } else {
      // if passwords match, register user
      const userData = {
        name,
        email,
        password,
      };
      // dispatch or call the register function
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter a password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="passwordTwo"
              name="passwordTwo"
              value={passwordTwo}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
