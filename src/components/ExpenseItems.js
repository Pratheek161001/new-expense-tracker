import React from 'react'
import Container from 'react-bootstrap/esm/Container';

const  ExpenseItems= (props) => {
    const {expenses:expenseItems}  = props;
  return (
    <div style={{backgroundColor:'beige',height:'100vh',width:'100%',}}>
        <Container>
          <h2 style={{paddingBottom:'3vh',textShadow:'1px 1px 3px slategrey',}}>Entered expenses here...</h2>
           {expenseItems && expenseItems.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {expenseItems.map((item, index) => (
                <li key={index}>
                  <div  
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  border: '1px solid black',
                  justifyContent: 'space-between',
                  padding: '5vh',
                  marginBottom:'3vh',
                  borderRadius: '30px',
                  boxShadow: '8px 8px 8px 1px slategrey',
                }}
              >
                  <div><h2>{item.category}</h2>
                  <p>{item.description}</p></div>
                  <div><h1 style={{display: 'flex',alignItems: 'center',justifyContent:'flex-end', marginRight:'1vh',}}>{item.amount} Rs</h1></div>
                  </div>
                </li>   
              ))}
            </ul>)
           : (<p>No expense items to display</p>)}
      </Container>
    </div>
  );
};

export default ExpenseItems;