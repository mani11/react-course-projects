import { createStore, combineReducers} from "redux";
import uuid from 'uuid';

//Actions
// ADD_EXPENSE

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => (
  {
  type:"ADD_EXPENSE",
  expense:{
    id:uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// EDIT_EXPENSE

const editExpense = (id,amount) => ({
  type:"EDIT_EXPENSE",
  id,
  amount
})

// REMOVE_EXPENSE

const removeExpense = ({id} = {} ) =>{
  return{
  type:"REMOVE_EXPENSE",
  id
  }
}

//set text filter

const setTextFilter = (text = '') => ({
  type:"FILTERBY_TEXT",
  text
});

//SORT
// SORT_BY_DATE

const sortByDate = () => ({
  type:"SORTBY_DATE",
  sortBy:"date"
})

const sortByAmount = () => ({
  type:"SORTBY_AMOUNT",
  sortBy:"amount"
})

const setStartDate = (startDate) => ({

  type:"SET_STARTDATE",
  startDate

})

const setEndDate = (endDate) => ({

  type:"SET_ENDDATE",
  endDate

})

// SORT_BY_AMOUNT
//Filter by date
//filter by test

//Expenses Reducer

const ExpensesReducerDefaultState = []

const expensesReducer = (state = ExpensesReducerDefaultState,action)=>{
  switch(action.type){

    case "ADD_EXPENSE":
      return [
        ...state,
        action.expense
      ];

    case "REMOVE_EXPENSE":
        return state.filter(({id}) => {
          return id !== action.id
        });

    case "EDIT_EXPENSE":
    return state.map(expense => {
      if(expense.id === action.id){
        console.log(expense.description);
        console.log("Hello"+action.amount);
        return {
          ...expense,
          ...action.amount
        }
      }
      else{
        return expense;
      }
    })    

    default:
     return state;

  }
}

const filtersReducerDefaultState = {
  text:'',
  sortBy:'amount',
  startDate:undefined,
  endDate:undefined
}
const filtersReducer = (state=filtersReducerDefaultState,action)=>{
  switch(action.type){
    case "FILTERBY_TEXT":
      return {
        ...state,
        text:action.text
      }

    case "SORTBY_DATE":
      return{
        ...state,
        sortBy:action.sortBy
      }  

    case "SORTBY_AMOUNT":
      return{
        ...state,
        sortBy:action.sortBy
      }
      
    case "SET_STARTDATE":
      return{
        ...state,
        startDate:action.startDate
      }
      
    case "SET_ENDDATE":
      return{
        ...state,
        endDate:action.endDate
      }    
    
    default:
      return state;
  }
}

const getVisibleExpenses = (expenses,{text,startDate,endDate})=>{
     
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate!== 'number' || expense.createdAt>=startDate;
    const endDateMatch = typeof endDate!== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;

  })

}


//store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters:filtersReducer
  })
 );

 store.subscribe(()=>{
  const state = store.getState();
  //console.log(state);
  const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
  console.log(visibleExpenses);
  
 })

const expenseOne = store.dispatch(addExpense({description:'rent',amount:100,createdAt:100}));
const expenseTwo = store.dispatch(addExpense({description:'coffee',amount:300,createdAt:500}));

//  store.dispatch(removeExpense({id:expenseOne.expense.id}));
//  store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}));
store.dispatch(setTextFilter('rent'));
//  store.dispatch(sortByDate());
//  store.dispatch(sortByAmount());

store.dispatch(setStartDate(25));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
