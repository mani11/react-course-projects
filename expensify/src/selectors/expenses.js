import moment from 'moment';

const getVisibleExpenses = (expenses,{text,startDate,endDate,sortBy})=>{
     
  return expenses.filter((expense) => {
    const createAtMoment = moment(expense.createAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment,'day'):true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment,'day'):true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;

  }).sort((a,b) => {
     if(sortBy == 'date')
      return a.createAt - b.createdAt;
     return a.amount - b.amount;
  })

}

export default getVisibleExpenses;