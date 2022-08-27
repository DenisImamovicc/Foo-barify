import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function TextInteract({handleSubmit,handleFileChange,ClientFilestatus,isDisabled,modifiedText}) {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Insert file you want to modify</Form.Label>
                    <Form.Control className='mb-1' type='file' name='file' onChange={handleFileChange} required accept=".txt,.rtf,.md,.file" />
                    <Form.Text id="passwordHelpBlock" muted>{ClientFilestatus && ClientFilestatus}</Form.Text>
                    <Button type='submit' disabled={isDisabled} variant="outline-dark" className='Submitbttn'>Submit</Button>
                </Form.Group>
            </form>
            <h2 className='text-center'>Results:</h2>
            <Form.Control as="textarea" placeholder="" className='textarea' value={modifiedText} readOnly />
        </>
    )
}
