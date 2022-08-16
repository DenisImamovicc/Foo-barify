import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  return (
    <div className="App">'
    <h1 className='text-center'>Text-replacer</h1>
      <Form className="Form">
          <Form.Label>Enter content of file here:</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control as="textarea" placeholder="" className='textarea'/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h2 className='text-center'>Results:</h2>
      <div className='resultarea'>
    
      </div>
    </div>
  );
}

export default App;
