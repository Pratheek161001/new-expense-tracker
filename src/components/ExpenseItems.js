import React, { useEffect,useState, useRef  } from 'react'
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';

const  ExpenseItems= ({ expenses, onValuesUpdate,currentTheme,onpremium }) => {

    const [expenseData, setExpenseData] = useState([]);
    const selectedExpenseKey = useRef(null);
    const [totalexpense,settotalexpense]=useState(0)
    const [isPremiumActivated, setIsPremiumActivated] = useState(false);
    const [downloadbtn, setdownloadbtn] = useState(false);

    useEffect(()=>{
      axios.get('https://expense-tracker-54bba-default-rtdb.firebaseio.com/expenses.json')
    .then(response => {
      setExpenseData(response.data);
      calculateTotalExpense(response.data);
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
      settotalexpense(totalexpense+expenseData[key].amount)
      console.log(totalexpense)
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
    const calculateTotalExpense = data => {
      let total = 0;
      for (const key in data) {
        total += parseFloat(data[key].amount);
      }
      settotalexpense(total);

    };
    const activatePremium = () => {
      setIsPremiumActivated(true);
      alert('ENJOY YOUR PREMIUM MEMBERSHIP')
      setdownloadbtn(true)
    };
    const downloadexpenses=()=>{
      console.log(expenseData)
      const createCsv = () => {
        let csvContent = 'Category,Description,Amount\n'; 
        if (typeof expenseData === 'object' && expenseData !== null) {
          const dataArray = Object.values(expenseData); 
          dataArray.forEach(item => {
            const row = `${item.category},${item.description},${item.amount}\n`;
            csvContent += row;
          });
        } else {
          console.error('error-something happened');
          return ''; 
        }
      
        return csvContent;
      };
    
      const csvContent = createCsv();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'expenses.csv');
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(link);

    }

  return (

    <div style={currentTheme === 'light' ? {backgroundColor:'beige',height:'100%',width:'100%'} : {backgroundColor:'rgb(24,25,26)',height:'100%',width:'100%'}}>
        <Container>
          <h2 style={currentTheme === 'light' ?{paddingBottom:'3vh',textShadow:'1px 1px 3px slategrey',color:'black'}:{paddingBottom:'3vh',textShadow:'1px 1px 3px slategrey',color:'white'}}>Entered expenses here...</h2>
          {!isPremiumActivated && totalexpense >= 10000 && <Button variant="primary" onClick={activatePremium} style={{marginBottom:'3vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Activate Premium</Button>}
          {downloadbtn && <Button variant="success" onClick={downloadexpenses} style={{marginBottom:'3vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Download expenses</Button>}
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