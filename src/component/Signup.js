import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const [credetntials, setCredetntials] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const {name,email,password}=credetntials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password})
    });
    const json =await response.json()
    console.log(json);
    if (json.success){
      // redirect
      localStorage.setItem('token',json.authtoken);
      navigate("/");
      props.showAlert("Successfully created an Account","success")
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
      <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
      <input type="text" className="form-control"  id="name" name="name" onChange={onChange}aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control"  id="Email1" name="email"onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="Password" className="form-label">Password</label>
      <input type="password" className="form-control"  name="password" onChange={onChange} id="password" minLength={5} required/>
    </div>
    <div className="mb-3">
      <label htmlFor="cPassword" className="form-label">Conform Password</label>
      <input type="password" className="form-control"  name="cpassword" onChange={onChange}id="cpassword" minLength={5} required/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  )
}

export default Signup