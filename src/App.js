import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function App() {
  const [Text, setText] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

  // function ChangeInputData(input) {
  //   setinputData(() => input)
  // }

  // function HandleSubmit(event) {
  //   // event.preventDefault()
  //   setinputData(event.target.files[0])
  //   setIsFileUploaded(true)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', Text.data)
    const response = await fetch('http://localhost:5000/Text', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const Text = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setText(Text)
    console.log(Text);
  }

  // useEffect(() => {
  //   //TextModifier(inputData);
  // }, [inputData])

	// async function uploadFile() {
  //   let formData = new FormData(); 
  //   formData.append("fileupload", inputData);
  //     await fetch('http://localhost:800/upload', {
  //     method: "POST", 
  //     body: formData
  //   }); 
  // }

  return (
    <div className="App">
      <h1 className='text-center'>Text-replacer</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
      <h2 className='text-center'>Results:</h2>
      <Form.Control as="textarea" placeholder="" className='textarea' value={"outputData"} readOnly />
    </div>
  );
}

export default App;
