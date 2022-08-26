import Alert from 'react-bootstrap/Alert'

export default function ErrAlertMssg ({ errMssg, show, setShow }) {
  if (show) {
    return (
            <Alert variant="danger" id="alert" onClose={() => setShow(!show)} dismissible>
                <Alert.Heading>{errMssg && errMssg}</Alert.Heading>
            </Alert>
    )
  }
}
