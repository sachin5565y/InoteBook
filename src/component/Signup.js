import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avataars from "../assets/avataaars.png"
const Signup = (props) => {
  const [credetntials, setCredetntials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credetntials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Successfully created an Account", "success")
    }
    else {
      props.showAlert("invalid credentials", "danger")
    }
  }
  const onChange = (e) => {
    setCredetntials({ ...credetntials, [e.target.name]: e.target.value })
  }
  return (
    <div>

      <div className='container my-5 '>

        <div className="d-flex">
          <div className="col-md-5">
            <img className="img-fluid" src={avataars} alt="register" style={{ width: "100%", height: "75vh", objectFit: "cover" }} />
          </div>

          <div className="col-md-7 ps-5 pe-5 pt-5" style={{ width: "50%" }}>
          <h2 style={{ fontWeight: "Bold" }}>Create a new account</h2>
                    <p className="mb-5">Use your email to create a new account</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
              </div>
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="Email1" name="email" onChange={onChange} aria-describedby="emailHelp" />
              </div>
              <div className="mb-4">
                <label htmlFor="Password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" onChange={onChange} id="password" minLength={5} required />
              </div>
              <div className="mb-4">
                <label htmlFor="cPassword" className="form-label">Conform Password</label>
                <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Signup