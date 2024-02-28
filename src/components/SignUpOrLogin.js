import React, { useState } from 'react';
import style from './SignUpOrLogin.module.css';
import { useNavigate } from 'react-router-dom';

function SignUpOrLogin(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [registerColor, setRegisterColor] = useState(true);
  const [loginColor, setLoginColor] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [credentialsReg, setcredentialsReg] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();

  const toggleFormToLogin = () => {
    setIsLogin(true);
    setLoginColor(true);
    setRegisterColor(false);
  };

  const toggleFormToRegister = () => {
    setIsLogin(false);
    setRegisterColor(true);
    setLoginColor(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentialsReg)
      });
      const json = await response.json();

      if (json.success) {
        localStorage.setItem('token', json.token);
        props.ShowToast("Account Created Successfully", "success")
        navigate('/Notes');
      } else {
        props.ShowToast("Invalid Details", "danger");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error gracefully (e.g., show error message to the user)
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
      });
      const json = await response.json();

      if (json.success) {
        localStorage.setItem('token', json.token);
        props.ShowToast("Logged in Successfully", "success")
        navigate('/Notes');

      } else {
        props.ShowToast("Invalid Details", "danger");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error gracefully (e.g., show error message to the user)
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  const handleSignupChange = (e) => {
    setcredentialsReg({
      ...credentialsReg,
      [e.target.name]: e.target.value
    });
  }
  return (
    <>
      <div className={`row m-0 vh-100 text-white ${style.main}`}>
        <div className={`col-md-6 ${style.leftside}`}>
          <h1 className="text-center fw-bold mb-4">PocketNote</h1>
          <div className={`${style.imagep}`}>
            <img src="https://i.pinimg.com/originals/1d/72/9d/1d729dd9bc486d066585f06a6b5ecda5.png" alt="this is a cloud" className={`${style.imagep}`} />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center fs-5">Welcome to PocketNote, your cloud-based notes platform. With PocketNote, you can access your notes from anywhere, collaborate with others, and stay organized.</p>
            <p className="text-center fs-5">Whether you're a student, professional, or just someone who loves to stay organized, PocketNote is the perfect tool for you.</p>
            <hr />
          </div>
        </div>
        <div className={`col-md-6 p-0 ${style.rightside}`}>
          <button className={`btn ${registerColor ? 'bg-success text-white' : 'bg-white text-dark'} w-50 rounded-0`} onClick={toggleFormToRegister}>Register</button>
          <button className={`btn ${loginColor ? 'bg-primary text-white' : 'bg-white text-dark'} w-50 rounded-0`} onClick={toggleFormToLogin}>Login</button>
          <div className="container flex-row justify-content-center">
            <div className="d-flex flex-column align-items-center">
              {isLogin ? (
                <form className="pt-5 pb-5 bg-dark text-white" onSubmit={handleLoginSubmit}>
                  <h2>Login</h2>
                  <div className="mb-3 pt-4">
                    <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name="email" id="exampleInputEmail2" onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp2" className="form-text text-white">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name="password" onChange={handleChange} id="exampleInputPassword2" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3 flex">Login</button>
                </form>
              ) : (
                <form className="pt-5 pb-5 bg-dark text-white" style={{ backgroundColor: "green" }} onSubmit={handleSignupSubmit}>
                  <h2>Register</h2>
                  <div className="">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentialsReg.name} name="name" id="exampleInputName" onChange={handleSignupChange} minLength={1} required />
                  </div>
                  <div className="mb-3 pt-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentialsReg.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleSignupChange} minLength={11} required />
                    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentialsReg.password} name="password" id="exampleInputPassword1" onChange={handleSignupChange} minLength={5} required />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Register</button>
                </form>
              )}
              <hr className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpOrLogin;
