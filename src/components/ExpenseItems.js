import React, { useEffect,useState, useRef  } from 'react'
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';

const  ExpenseItems= ({ expenses, onValuesUpdate,currentTheme }) => {
  console.log(currentTheme)

    const [expenseData, setExpenseData] = useState([]);
    const selectedExpenseKey = useRef(null);

    useEffect(()=>{
      axios.get('https://expense-tracker-54bba-default-rtdb.firebaseio.com/expenses.json')
    .then(response => {
      setExpenseData(response.data);
    })
    .catch(error => {
      console.error('Error adding expense:', error.message);
    });
    },[expenseData])

    const edithandler=(event,key)=>{
      event.preventDefault();
      axios.get(`https://expense-tracker-54bba-default-rtdb.firebaseio.com/expenses/${key}.json`)
      .then(response => {
        const values=response.data;
        onValuesUpdate(values);
      })
      .catch(error => {
        console.error('Error adding expense:', error.message);
      });
      
      axios.delete(`https://expense-tracker-54bba-default-rtdb.firebaseio.com/expenses/${key}.json`)
    .then(response => {
      setExpenseData(response.data);
    })
    .catch(error => {
      console.error('Error adding expense:', error.message);
    });
    }

    const deletehandler=(event,key)=>{
      event.preventDefault();
      axios.delete(`https://expense-tracker-54bba-default-rtdb.firebaseio.com/expenses/${key}.json`)
    .then(response => {
      console.log('deleted');
    })
    .catch(error => {
      console.error('Error adding expense:', error.message);
    });

    }
    
  return (
    // <div style={currentTheme === 'light' ? {backgroundColor:'beige',height:'60vh',width:'100%',paddingTop:'60px'} : {backgroundColor:'rgb(58,59,60)',height:'60vh',width:'100%',paddingTop:'60px'}}>

    <div style={currentTheme === 'light' ? {backgroundColor:'beige',height:'100vh',width:'100%'} : {backgroundColor:'rgb(24,25,26)',height:'100vh',width:'100%'}}>
        <Container>
          <h2 style={currentTheme === 'light' ?{paddingBottom:'3vh',textShadow:'1px 1px 3px slategrey',color:'black'}:{paddingBottom:'3vh',textShadow:'1px 1px 3px slategrey',color:'white'}}>Entered expenses here...</h2>
          {expenseData && Object.keys(expenseData).length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {Object.keys(expenseData).map(key => (
                <li key={key}>
                  <div  
                style={currentTheme === 'light' ?
                {  
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  border: '1px solid black',
                  justifyContent: 'space-between',
                  padding: '5vh',
                  marginBottom:'3vh',
                  borderRadius: '30px',
                  boxShadow: '8px 8px 8px 1px slategrey',
                  color:'black'
                }:{backgroundColor:'rgb(58,59,60)',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  border: '1px solid black',
                  justifyContent: 'space-between',
                  padding: '5vh',
                  marginBottom:'3vh',
                  borderRadius: '30px',
                  boxShadow: '8px 8px 8px 1px slategrey',
                  color:"white"
              }}
              >
                  <div>
                    <h2>{expenseData[key].category}</h2>
                    <p>{expenseData[key].description}</p>
                  </div>
                  <div style={{display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'space-between',}}>
                  <h1 style={{display: 'flex',alignItems: 'center',justifyContent:'flex-end', marginRight:'1vh',}}>{expenseData[key].amount} Rs </h1>
                  <div>
                  <Button variant="outline-success" style={{fontSize:'10px'}} onClick={(event) => edithandler(event, key)}>Edit</Button>
                  <Button variant="outline-danger" style={{fontSize:'10px', marginLeft:'3px'}} onClick={(event) => deletehandler(event, key)}>Delete</Button>
                  </div>
                 </div>
                  </div>
                </li>   
              ))}
            </ul>)
           : ( <div  
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              border: '1px solid black',
              justifyContent: 'center',
              padding: '5vh',
              marginBottom:'3vh',
              borderRadius: '30px',
              boxShadow: '8px 8px 8px 1px slategrey',
            }}><p>No expense items to display</p></div>)
           }
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTheme: state.theme,
  };
};
export default connect(mapStateToProps)(ExpenseItems);