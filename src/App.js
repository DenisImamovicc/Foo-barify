import './App.css'
import { useState } from 'react'
import ErrAlertMssg from './components/alert'
import TextInteract from './components/textinteract'

function App() {
  const [File, setFile] = useState({ data: '' })
  const [modifiedText, setmodifiedText] = useState('Modified text appears here after sucessful submit.')
  const [ClientFilestatus, setClientFileStatus] = useState('')
  const [errMssg, seterrMssg] = useState('')
  const [isDisabled, setDisableUserInput] = useState(false)
  const [showComponent, setShowComponent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', File.data)
    sendUnmodifiedData(formData)
  }

  const handleFileChange = (e) => {
    const allowedFormatRegex = /(\.txt|\.rtf|\.md|\.file)$/i
    const file = {
      data: e.target.files[0]
    }
    setShowComponent(() => false)
    if (file.data.size === 0) {
      setDisableUserInput(true)
      return setClientFileStatus('Can not modify a empty file,please choose a non-empty file')
    }
    if (allowedFormatRegex.test(file.data.name)) {
      setDisableUserInput(false)
      setClientFileStatus('Supported Text Format :)')
      return setFile(file)
    }
    setDisableUserInput(true)
    return setClientFileStatus('Fileformat not supported.Only textformat files are allowed')
  }

  const sendUnmodifiedData = async (data) => {
    await fetch('http://localhost:5000/file', {
      method: 'POST',
      body: data
    }).then((res) => {
      setClientFileStatus(res.ClientFilestatusText)
      setDisableUserInput(true)
      fetchmodifiedData()
    }).catch((err) => {
      console.log(err)
      seterrMssg('Server failed to process the file,please try again later')
      setDisableUserInput(true)
      setShowComponent(() => !showComponent)
    })
  }

  const fetchmodifiedData = async () => {
    const modifiedData = await fetch('http://localhost:5000/modifedfile')
      .then((response) => response.json())
      .then((data) => {
        return data.text
      }).catch((err) => {
        console.log(err)
        seterrMssg('Client failed to get the modified file,please try again later')
        setDisableUserInput(true)
        setShowComponent(() => !showComponent)
      })
    return setmodifiedText(modifiedData)
  }

  return (
    <div className="App">
      <ErrAlertMssg errMssg={errMssg} showComponent={showComponent} setShowComponent={setShowComponent} />
      <h1 className='text-center'>Text-replacer</h1>
      <TextInteract handleSubmit={handleSubmit} handleFileChange={handleFileChange} ClientFilestatus={ClientFilestatus} isDisabled={isDisabled} modifiedText={modifiedText} />
    </div>
  )
}

export default App