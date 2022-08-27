import Alert from 'react-bootstrap/Alert'

export default function ErrAlertMssg ({ errMssg, showComponent,setShowComponent }) {
  if (showComponent) {
    return (
            <Alert variant="danger" id="alert" onClose={() => setShowComponent(!showComponent)} dismissible>
                <Alert.Heading>{errMssg && errMssg}</Alert.Heading>
            </Alert>
    )
  }
}
