import React, { useState, useEffect } from 'react'

export default function AuthForm() {
   
    const[isLogin, setIsLogin] = useState(true);
  return (
    <div class="container">
        <div class="form-container">
            <div class="form-toggle">
                <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
                <button  className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>Sign up</button>
            </div>
            {isLogin ? <>
            <form>
            <div className='form'>
            <h2>Login Form</h2>
            <input type='email' placeholder='Email' required/>
            <input type='password' placeholder='password'required/>
            <a href='#'>Forgot password?</a>
            <button>Login</button>
           <p>Not a member? <a href='#' onClick={() => setIsLogin(false)} >Signup now</a></p>
            </div></form> </> :
            <>
            <form>
            <div className='form'>
            <h2>Signup Form</h2>
            <input type='email' placeholder='Email' required/>
            <input type='password' placeholder='password' required/>
            <input type='password' placeholder='Confirm password' required/>
            <button>Signup now</button>
           <p>Already a member? <a href='#' onClick={() => setIsLogin(true)}>Login now</a></p>
            </div>
            </form>
            </>}
        </div>
    </div>
  )
}
