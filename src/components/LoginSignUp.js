import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from './auth-context';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const emailinputref=useRef();
  const passwordinputref=useRef();
  const authcntxt=useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isloading,setIsLoading]=useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredemail=emailinputref.current.value;
    const enteredpassword=passwordinputref.current.value;
    setIsLoading(true);
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSQZW4V17ETUf_ri1ZQA0CtAW8Q0vOhDs'
    }
    else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSQZW4V17ETUf_ri1ZQA0CtAW8Q0vOhDs'
    }
    fetch(url,
    {
      method:'POST',
      body:JSON.stringify({
        email:enteredemail,
        password:enteredpassword,
        returnsecuretoken:true,
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      setIsLoading(false)
      if(res.ok){
        return res.json()
      }
      else{
        return res.json().then(data=>{
          let errormessage='authentication failed';
           throw new Error(errormessage)
        })
      }
    })
    .then((data)=>{
        const dataString = JSON.stringify(data);
        localStorage.setItem('idToken',dataString);
        authcntxt.login(data.idToken);
        !isLogin && setIsLogin(!isLogin)
        navigate('/mainbody');
    })
    .catch((err)=>{alert(err.message)})
  }
  
  return (
    <div style={{height:'100vh', width:'100%', display:'flex',alignItems:'center',justifyContent:'center', backgroundImage:`url(${require('../assets/pexels-tirachard-kumtanom-733852.jpg')})`,backgroundSize:'cover', backgroundPosition:'center'}}>
        <section className={classes.auth}>
        {/* <Applogo/> */}
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Enter Email</label>
          <input type='email' id='email' required ref={emailinputref}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Enter Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordinputref}
          />
        </div>
        <div className={classes.actions}>
          {!isloading && <button
            type='submit'
            className={classes.toggle}
          >
            {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
          </button>}
          {isloading && <p>sending request</p>}
          </div>

        <div className={classes.actions} >
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
            style={{border:'none',backgroundColor:'transparent',color:'blue'}}
          >
            {isLogin ? 'Dont have account ? sign up here...' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
    </div>
  );
};

export default Login;