import React from 'react';
import './styles.css';

const Contact = () => {
    return (
        <div>
            
<h3>Contact Form</h3>

<div className="contactContainer">
  <form >
    <label for="fname">First Name</label>
    <input className="contactinput" type="text" id="fname" name="firstname" placeholder="Your name.." />

    <label for="lname">Last Name</label>
    <input className="contactinput" type="text" id="lname" name="lastname" placeholder="Your last name.." />

    <label for="country">Country Interested In:</label>
    <select id="country" name="country">
      <option value="australia">Australia</option>
      <option value="canada">Canada</option>
      <option value="usa">USA</option>
    </select>

    <label for="subject">Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.."  ></textarea>

    <input className="contactbtn" type="submit" value="Submit" />
  </form>
</div>
        </div>
    )
}

export default Contact
