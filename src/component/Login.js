import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div className='container'>
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
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login