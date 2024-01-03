import React ,{useState,useRef} from 'react'
import SideCrumbs from './SideCrumbs'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from './NavBar';
import ExpenseItems from './ExpenseItems';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';

const MainPage = ({ currentTheme,onpremium}) => {
  const [expenses, setExpenses] = useState([]);
  const [amountValue, setAmountValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('Select a Catagory');
  const [descriptionValue, setDescriptionValue] = useState('');
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
    setAmountValue('');
    setCategoryValue('Select a Catagory');
    setDescriptionValue('');
 };
 const handleChildValues = (values) => {
    setAmountValue(values.amount);
    setCategoryValue(values.category);
    setDescriptionValue(values.description);
    window.scrollTo(0, 0);
};
 
  return (<>
        <SideCrumbs/>
  <Navbar/>
  <div style={currentTheme === 'light' ? {backgroundColor:'beige',height:'60vh',width:'100%',paddingTop:'60px'} : {backgroundColor:'rgb(24,25,26)',height:'60vh',width:'100%',paddingTop:'60px'}}>
      <Container>
      <div style={currentTheme === 'light' ?{display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid black', padding:'5vh',borderRadius:'30px',boxShadow: '8px 8px 8px 1px slategrey',}:{display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid black', padding:'5vh',borderRadius:'30px',boxShadow: '8px 8px 8px 1px slategrey',backgroundColor:'rgb(58,59,60)'}}>
        <Container>
        <div style={currentTheme === 'light' ?{paddingTop:'1vh',color:'black'}:{paddingTop:'1vh',color:'white'}}><h3>Enter your Expense</h3></div>
        <br></br>
        <InputGroup className="mb-3">
        <InputGroup.Text>INR</InputGroup.Text>
        <Form.Control ref={amountRef} value={amountValue} onChange={(e) => setAmountValue(e.target.value)} aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text >.00</InputGroup.Text>
        </InputGroup>
        <Form.Select ref={categoryRef} value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)} aria-label="Default select example">
        <option>Select a Catagory</option>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
        </Form.Select>
        <InputGroup style={{paddingTop:'2vh',paddingBottom:'2vh',}}>
        <InputGroup.Text>Description</InputGroup.Text>
        <Form.Control ref={descriptionRef} value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.target.value)} as="textarea" aria-label="With textarea" />
        </InputGroup>
        <Button variant="primary" onClick={handleAddExpense}>Add new Expense</Button>
        </Container>
      </div>
      </Container>
    </div>
    <ExpenseItems expenses={expenses} onValuesUpdate={handleChildValues} />
  </>
  )
}
const mapStateToProps = (state) => {
  return {
    currentTheme: state.theme,
  };
};

export default connect(mapStateToProps)(MainPage)