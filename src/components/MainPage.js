import React ,{useState,useRef} from 'react'
import SideCrumbs from './SideCrumbs'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from './NavBar';
import ExpenseItems from './ExpenseItems';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const MainPage = () => {
  const [expenses, setExpenses] = useState([]);
  const amountRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleAddExpense = () => {
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;
    const description = descriptionRef.current.value;

  const newExpense = {
    amount,
    category,
    description
  };
  setExpenses([...expenses, newExpense]);
  axios.post('https://expense-tracker-54bba-default-rtdb.firebaseio.com/expenses.json', newExpense)
    .then(response => {
      console.log('item added');
    })
    .catch(error => {
      console.error('Error adding expense:', error.message);
    });
 };
  return (<>
        <SideCrumbs/>
  <Navbar/>
    <div style={{backgroundColor:'beige',height:'60vh',width:'100%',paddingTop:'60px'}}>
      <Container>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid black', padding:'5vh',borderRadius:'30px',boxShadow: '8px 8px 8px 1px slategrey',}}>
        <Container>
        <div style={{paddingTop:'1vh'}}><h3>Enter your Expense</h3></div>
        <br></br>
        <InputGroup className="mb-3">
        <InputGroup.Text>INR</InputGroup.Text>
        <Form.Control ref={amountRef} aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>
        <Form.Select ref={categoryRef} aria-label="Default select example">
        <option>Select a Catagory</option>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
        </Form.Select>
        <InputGroup style={{paddingTop:'2vh',paddingBottom:'2vh',}}>
        <InputGroup.Text>Description</InputGroup.Text>
        <Form.Control ref={descriptionRef} as="textarea" aria-label="With textarea" />
        </InputGroup>
        <Button variant="primary" onClick={handleAddExpense}>Add new Expense</Button>
        </Container>
      </div>
      </Container>
    </div>
    <ExpenseItems expenses={expenses}/>
  </>
  )
}

export default MainPage