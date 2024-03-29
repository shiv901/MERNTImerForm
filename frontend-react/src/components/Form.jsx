import { useState } from "react";
import { toast } from 'react-toastify'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect } from "react";


const Form = () => {

  useEffect(()=>{
    loadCaptchaEnginge(6);
  },[])

  const initialState = {
    name: "",
    email: "",
    dob: "",
    address: "",
    ccode: "+91",
    phone: "",
    captcha:""
  };

  const [{ name, email, dob, address, ccode, phone, captcha }, setState] = useState(initialState);

  // Resetting the form
  const clearState = () => {
    toast('Form cleared!')
    setState({ ...initialState });
  };

  // Common function for handling inputs in React Form
  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    // preventing Form from submitting
    e.preventDefault();
    const userData = { name, email, dob, address, ccode, phone, captcha }

    // Basic Frontend Validations
    if (!name || !dob || !address || !email || !ccode || !phone || !captcha) {
      toast.error('All fields are mandatory!')
    } else if (isNaN(phone) || phone.length !== 10) {
      toast.error('Invalid phone number')
    } else if (validateCaptcha(captcha) !== true) {
      loadCaptchaEnginge(6);
      toast.error('Invalid Captcha!')
    } else {
      fetch('http://www.localhost:5000/store-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(res => {
          toast('Form Submitted')
          setState({ ...initialState });
          return res.json()
        })
        .catch(err => console.log({ err }))

    }
  };

  return (
    <form onSubmit={handleSubmit} id='form' className='mx-auto'>
      <div className="row">
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" placeholder="John Smith..." id="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" name="email" id="email" placeholder="John@test.com..." value={email} onChange={onChange} />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" className="form-control" name="dob" id="dob" value={dob} onChange={onChange} />
        </div>
      </div>
      <div className="row">
        <div className="form-group mt-3">
          <label htmlFor="address">Address</label>
          <textarea className="form-control" id="address" name="address" value={address} onChange={onChange}></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="phone">Phone</label>
          <div className="row form-control ms-0">
            <input type="text" className="p-1 border-0 col-2 text-end" placeholder="+91" maxLength='3' name="ccode" id="country-code" value={ccode} onChange={onChange} />|
            <input type="tel" maxLength='10' className="p-1 border-0 col-9" placeholder="999 999 9999" name="phone" id="phone" value={phone} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="captcha-div text-center mt-3">
        <LoadCanvasTemplate />
        <input type="text" id="captcha" className="form-control"  name="captcha" value={captcha} onChange={onChange} placeholder="Enter above Captcha" />
      </div>


      <div className="form-group mt-3 d-flex justify-content-center gap-3 mt-4">
        <button type="submit" className="btn btn-primary">Sign in</button>
        <button type="reset" className="btn btn-warning" onClick={clearState}>Reset</button>
      </div>
    </form>
  );
}

export default Form;
