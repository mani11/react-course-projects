import moment from 'moment';

const filtersReducerDefaultState = {
  text:'',
  sortBy:'date',
  startDate:moment().startOf('month'),
  endDate:moment().endOf('month')
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

export default filtersReducer;