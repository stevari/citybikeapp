import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
function SpinnerLoading() {
  return (
    <Spinner animation="border" role="status" 
    style={{
    color:"orange", 
    position: "fixed", //center of the screen
    top: "50%",
    left: "50%"}}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default SpinnerLoading;