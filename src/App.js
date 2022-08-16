import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';

function App() {
  const [inputData, setinputData] = useState("")

  function ChangeInputData(input) {
    setinputData(()=>input)
  }


  function HandleSubmit(event) {
    event.preventDefault()
    ChangeInputData(event.target[0].value)
    // console.log(event.target[0].value);
  }

  // useEffect(() => {
  //   console.log(inputData);
  // }, [inputData])
  


  return (
    <div className="App">'
    <h1 className='text-center'>Text-replacer</h1>
      <Form className="Form" onSubmit={HandleSubmit}>
          <Form.Label>Enter content of file here:</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control as="textarea" placeholder="" className='textarea'/>
        </Form.Group>
        <Button variant="primary" type="submit" value="submit">
          Submit
        </Button>
      </Form>
      <h2 className='text-center'>Results:</h2>
      <Form.Control as="textarea" placeholder="" className='textarea' value={inputData} readOnly/>

    </div>
  );
}

export default App;
