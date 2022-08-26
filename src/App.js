import './App.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useState } from 'react'
import ErrAlertMssg from './components/alert'
function App () {
  const [File, setFile] = useState({ data: '' })
  const [modifiedFile, setmodifiedFile] = useState('Modified text appears here after sucessful submit.')
  const [status, setStatus] = useState('')
  const [errMssg, seterrMssg] = useState('')

  const [isDisabled, setisDisabled] = useState(false)
  const [show, setShow] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', File.data)
    console.log(File.data.size)
    const response = await fetch('http://localhost:5000/Text', {
      method: 'POST',
      body: formData
    }).then((res) => {
      setStatus(res.statusText)
      setisDisabled(true)
      fetchmodifiedData()
    }).catch((err) => {
      console.log(err)
      seterrMssg('Server failed to process the file,please try again later')
      setisDisabled(true)
      setShow(() => !show)
    })
    return response
  }

  const fetchmodifiedData = async () => {
    const modifiedData = await fetch('http://localhost:5000/getmodifedfile')
      .then((response) => response.json())
      .then((data) => {
        return data.text
      }).catch((err) => {
        console.log('Shit aint fetching', err)
        seterrMssg('Client failed to get the modified file,please try again later')
        setisDisabled(true)
        setShow(() => !show)
      })
    return setmodifiedFile(modifiedData)
  }

  const handleFileChange = (e) => {
    const allowedFormatRegex = /(\.txt|\.rtf|\.md|\.file)$/i
    const file = {
      data: e.target.files[0]
    }
    console.log(file.data)
    setShow(() => false)
    if (file.data.size === 0) {
      setisDisabled(true)
      return setStatus('Can not modify a empty file,please choose a non-empty file')
    }
    if (allowedFormatRegex.test(file.data.name)) {
      console.log(file)
      setisDisabled(false)
      setStatus('Supported Text Format :)')
      return setFile(file)
    }
    setisDisabled(true)
    return setStatus('Fileformat not supported.Only textformat files are allowed')
  }

  return (
    <div className="App">
      <ErrAlertMssg errMssg={errMssg} show={show} setShow={setShow} />
      <h1 className='text-center'>Text-replacer</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Insert file you want to modify</Form.Label>
          <Form.Control className='mb-1' type='file' name='file' onChange={handleFileChange} required accept=".txt,.rtf,.md,.file" />
          <Form.Text id="passwordHelpBlock" muted>{status && status}</Form.Text>
          <Button type='submit' disabled={isDisabled} variant="outline-dark" className='Submitbttn'>Submit</Button>
        </Form.Group>
      </form>
      <h2 className='text-center'>Results:</h2>
      <Form.Control as="textarea" placeholder="" className='textarea' value={modifiedFile} readOnly />
    </div>
  )
}

export default App
