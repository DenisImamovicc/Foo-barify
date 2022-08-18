import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';

function App() {
  const [inputData, setinputData] = useState("")
  const [outputData, setoutputData] = useState("")

  function ChangeInputData(input) {
    setinputData(()=>input)
  }

  function TextModifier(data) {
    const wordCollection={};
    const wordsRegex=/[A-Za-z\;:!?()"'%\-]+/gi
    const textData=data.match(wordsRegex)
 
    if (!data) {
      return console.log("null data");
    }
        textData.forEach(word => {
        //console.log(word);
          if (wordCollection.hasOwnProperty(word)) {
            wordCollection[word]=wordCollection[word]+1
            //console.log("Add count");
          }else{
            Object.defineProperty(wordCollection, word, {
              value:1,
              writable: true,
              enumerable:true
            });
            //console.log("Add property and count");
          }
      });

      //implement code for situation where no word is mentioned more than others.
      const mostUsedWord=Object.keys(wordCollection).reduce((a, b) => wordCollection[a] > wordCollection[b] ? a : b)
      console.log(wordCollection,mostUsedWord);
      
      const outputRegexWord=`${mostUsedWord}`
      const re=new RegExp(outputRegexWord,"gi")
      const output = data.replace(re, `foo${outputRegexWord}bar`);  
      setoutputData(()=>output)
      console.log(output);
  }


  function HandleSubmit(event) {
    event.preventDefault()
    ChangeInputData(event.target[0].value)
    // console.log(event.target[0].value);
  }

   useEffect(() => {
    TextModifier(inputData);
   }, [inputData])
  


  return (
    <div className="App">
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
      <Form.Control as="textarea" placeholder="" className='textarea' value={outputData} readOnly/>
    </div>
  );
}

export default App;
