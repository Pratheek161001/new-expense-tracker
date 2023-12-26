import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function SideCrumbs() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    setShowToast(false);
  };

    const navigatetoprofilepage=()=>{
        navigate('/profile')
    }

    return (
        <div
      style={{
        position: 'fixed',
        top: '10px', 
        right: '10px', 
        zIndex: '9999', 
      }}
    >
      <div
      style={{
        position: 'fixed',
        top: '10px', 
        right: '10px', 
        zIndex: '9999', 
      }}
    >      <Button variant="outline-danger" onClick={()=>{navigate('/')}}>logout</Button>
    </div>
    <br></br><br></br>
      <Toast show={showToast} onClose={handleClose}>
        <Toast.Header style={{backgroundColor:'lightblue'}}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Your Profile is not completed . A complete Profile has higher chances of landing a job.<p style={{color:'blue'}} onClick={navigatetoprofilepage}>Complete now</p></strong>
        </Toast.Header>
        {/* <Toast.Body >Your Profile is 64% completed . A complete Profile has higher chances of landing a job.<p style={{color:'blue'}}>Complete now</p></Toast.Body> */}
      </Toast>
      </div>
    );
  }
  
  export default SideCrumbs;