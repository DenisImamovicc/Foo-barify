import './App.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function App() {
  const [File, setFile] = useState({ data: '' })
  const [modifiedFile, setmodifiedFile] = useState("Modified text appears here after sucessful submit.")
  const [status, setStatus] = useState('')
  const [isDisabled, setisDisabled] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', File.data)
    console.log(File.data.size);
    const response = await fetch('http://localhost:5000/Text', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
    setisDisabled(true)
    fetchmodifiedData()
  }

  const fetchmodifiedData = async () => {
    const modifiedData = await fetch('http://localhost:5000/getmodifedfile')
      .then((response) => response.json())
      .then((data) => {
        return data.text
      });
    return setmodifiedFile(modifiedData)
  }

  const handleFileChange = (e) => {
    const allowedFormatRegex=/(\.txt|\.rtf|\.md|\.file)$/i;
    const file = {
      data: e.target.files[0],
    }
    console.log(file.data);

    if (file.data.size === 0) {
      setisDisabled(true)
      return setStatus("Can not modify a empty file,please choose a non-empty file")
    }
    if (allowedFormatRegex.test(file.data.name)) {
      console.log(file);
      setisDisabled(false)
      setStatus("Supported Text Format :)")
      return setFile(file)
    }
    setisDisabled(true)
    return setStatus("Fileformat not supported.Only textformat files are allowed");
  }

  return (
    <div className="App">
      <h1 className='text-center'>Text-replacer</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange} required accept=".txt,.rtf,.md,.file"></input>
        <button type='submit' disabled={isDisabled}>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
      <h2 className='text-center'>Results:</h2>
      <Form.Control as="textarea" placeholder="" className='textarea' value={modifiedFile} readOnly />
    </div>
  );
}

export default App;
