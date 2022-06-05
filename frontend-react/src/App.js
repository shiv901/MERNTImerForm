import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from "./components/Form";
import Timer from "./components/Timer";

function App() {

  const [isExpired, setExpired] = useState(false)

  return (
    <div className="App">
      <div className="container">
        {isExpired ? (<div className='text-center'>
          <h1 className="display-1 h1 text-danger text-center" style={{ 'fontWeight': 500 }}>Form Expired!!</h1>
          <h5 className='text-center mt-5'>Press F5 or simply refresh the page manually for resetting the form or Click button down below.</h5>
          <button onClick={() => setExpired(false)} className="btn btn-dark">Reset</button>
        </div>) : (<>
          <h1 className="text-center my-3">React Form</h1>
          <Timer onExpired={() => setExpired(true)} />
          <Form />
        </>)}

      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
