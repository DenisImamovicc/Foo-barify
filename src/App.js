import './App.css';
import Form from 'react-bootstrap/Form';
import { useState} from 'react';

function App() {
  const [File, setFile] = useState({data: '' })
  const [modifiedFile, setmodifiedFile] = useState("Modified text appears here after sucessful submit.")
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', File.data)
    console.log(File.data.size);
    if (File.data.size===0) {return setStatus("Can not modify a empty file,please choose a non-empty file")}
    const response = await fetch('http://localhost:5000/Text', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
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
    const file = {
      data: e.target.files[0],
    }
    setFile(file)
    console.log(file);
  }

  return (
    <div className="App">
      <h1 className='text-center'>Text-replacer</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange} required accept=".txt,.rtf,.md"></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
      <h2 className='text-center'>Results:</h2>
      <Form.Control as="textarea" placeholder="" className='textarea' value={modifiedFile} readOnly />
    </div>
  );
}

export default App;
