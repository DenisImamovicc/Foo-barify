import Alert from 'react-bootstrap/Alert';

export default function ErrAlertMssg({ status,show,setShow }) {

    if (show) {
        return (
            <Alert variant="danger" id="alert" onClose={()=>setShow(!show)} dismissible>
                <Alert.Heading>{status && status}</Alert.Heading>
            </Alert>
        );
    }
}
