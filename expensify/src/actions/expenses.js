import uuid from 'uuid';

export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => (
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

export const editExpense = (id,amount) => ({
  type:"EDIT_EXPENSE",
  id,
  amount
})

// REMOVE_EXPENSE

export const removeExpense = ({id} = {} ) =>{
  return{
  type:"REMOVE_EXPENSE",
  id
  }
}