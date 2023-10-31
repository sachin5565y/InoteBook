import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import avataars from "../assets/about-login.svg"
const Login = (props) => {
  const [credetntials, setCredetntials] = useState({email:"",password:""})
  let navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNTdmODU2MTk4ZmYyOTVkZmY5ZTc3In0sImlhdCI6MTY3ODA4Mzc3MH0.VeRFxSOBZXQS3r2MHt8GkE3OWtTDIelej8HRzn0a0Zc"
      },
      body: JSON.stringify({email:credetntials.email,password:credetntials.password})
    });
    const json =await response.json()
    console.log(json);
    if (json.success){
      // saving the auth token redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Successfully Login","success");
      navigate("/");
    }
    else{
      props.showAlert("invalid credentials","danger")
    }
  }
  const onChange = (e)=>{
    setCredetntials({...credetntials, [e.target.name]: e.target.value})
}
  return (
    <div className='container my-5'>
      <div className="d-flex">
          <div className="col-md-5">
            <img className="img-fluid" src={avataars} alt="register" style={{ width: "100%", height: "75vh", objectFit: "cover" }} />
          </div>
          <div className="col-md-7 ps-5 pe-5 pt-5" style={{ width: "50%" }}>
          <h2 style={{ fontWeight: "Bold" }}>Create a new account</h2>
                    <p className="mb-5">Use your email to create a new account</p>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={Credential.email} onChange={onChange} id="Email1" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password" className="form-control" value={Credential.password} onChange={onChange} name="password" id="Password"/>
  </div>
  <button type="submit" className="btn btn-danger">Submit</button>
</form>
    </div>

    </div>
    </div>
  )
}

export default Login