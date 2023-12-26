import React from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup';
import { useRef,useContext } from 'react';
import AuthContext from './auth-context';

const Profile = () => {
    const navigate = useNavigate();
    const usernameinputref=useRef();
    const photoinputref=useRef();
    const authcntxt=useContext(AuthContext);
    const storedIdToken = localStorage.getItem('idToken');
    const userdata=JSON.parse(storedIdToken)
    const usertoken=userdata.idToken

    const updatehandler=(event)=>{
        event.preventDefault();
        const enteredusername=usernameinputref.current.value;
        const enteredphoto=photoinputref.current.value; 
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCSQZW4V17ETUf_ri1ZQA0CtAW8Q0vOhDs',
        {
          method:'POST',
          body:JSON.stringify({
                idToken:usertoken,
                displayName:enteredusername,
                photoUrl:enteredphoto,
                returnsecuretoken:true}),
          headers:{'Content-Type':'application/json'}
        })
        .then((res)=>{
          if(res.ok){return res.json()}
          else{
              return res.json().then(data=>{
                let errormessage='authentication failed';
                errormessage=data.error.message;
                throw new Error(errormessage)})}
          })

        .then((data)=>{
            navigate('/mainbody');
            alert('PROFILE SUCCESFULLY UPDATED')})
        .catch((err)=>{alert(err.message)}) 
      }
      const verifymail=(event)=>{
        event.preventDefault()
        alert('Check your entered mail for the verification message')
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSQZW4V17ETUf_ri1ZQA0CtAW8Q0vOhDs',
        {
          method:'POST',
          body:JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken:usertoken,}),
          headers:{'Content-Type':'application/json'}
        })
        .then((res)=>{
          if(res.ok){return res.json()}
          else{
              return res.json().then(data=>{
                let errormessage='authentication failed';
                errormessage=data.error.message;
                throw new Error(errormessage)})}
          })

        .then((data)=>{
            alert('email succesfully verified')})
        .catch((err)=>{alert(err.message)}) 
      }

  return (
    <div style={{height:'100vh',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid black', padding:'5vh',borderRadius:'30px',}}>
        <Container>
            <div><h3>YOUR PROFILE</h3></div>
            <br></br>
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" ref={usernameinputref}>@</InputGroup.Text>
            <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"/>
            </InputGroup>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload a photo here</Form.Label>
            <Form.Control type="file" ref={photoinputref}/>
            </Form.Group>
            <p>verify your account here <Button variant="primary" size="sm" style={{marginBottom:'2vh',}} onClick={verifymail}>verify</Button> </p>
            <br></br>
            <Button variant="primary" onClick={updatehandler} >Update</Button>
            <Button variant="outline-danger" onClick={()=>{navigate('/mainbody')}}>Cancel</Button>
        </Container>
    </div>
    </div>
  )
}

export default Profile