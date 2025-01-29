import React, { useState } from 'react'
import './contact.css'

const Contact = () => {
  function myFunction() {
    alert("I am an alert box!");
  }

  return (
    <section className='contact'>
      <form>
        <h2>Contact Form</h2>
        <div className='input-box'>
          <label>Full Name</label>
          <input type='text' className='field' placeholder='Enter your name' required />
        </div>
        <div className='input-box'>
          <label>Email Address</label>
          <input type='email' className='field' placeholder='Enter your email' required />
        </div>
        <div className='input-box'>
          <label>Your message</label>
          <textarea id='' name='' className='field mess' placeholder='write your message here....' required></textarea>
        </div>
        <button type='submit'onclick={() => myFunction()}>Send Message</button>
        <div>
        </div>


      </form>
    </section>
  )
}

export default Contact