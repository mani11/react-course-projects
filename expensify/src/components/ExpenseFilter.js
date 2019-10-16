import React from 'react';
import { connect } from 'react-redux';
import {DateRangePicker} from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount,setStartDate,setEndDate} from '../actions/filters';


class ExpenseFilter extends React.Component{

  state = {
    calendarFocus:null
  }

 onDatesChange = ({startDate,endDate})=>{

  this.props.dispatch(setStartDate(startDate));
  this.props.dispatch(setEndDate(endDate));

  }

  onFocusChange = (calendarFocus) => {
    this.setState(()=> ({calendarFocus}));
  }

  render(){
    return (
    <div>
    <input type="text" value={this.props.filters.text} onChange={(e) => {
        this.props.dispatch(setTextFilter(e.target.value));
    }}></input>
    <select value={this.props.filters.sortBy} onChange={(e)=>{

      if(e.target.value == 'date'){
        this.props.dispatch(sortByDate());
      }
      else{
      this.props.dispatch(sortByAmount());
      }
    }}>
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
    <DateRangePicker
      startDate={this.props.filters.startDate}
      endDate={this.props.filters.endDate}
      onDatesChange={this.onDatesChange}
      focusedInput={this.state.calendarFocus}
      onFocusChange={this.onFocusChange}
      numberOfMonths={1}
      isOutsideRange={()=>false}
      showClearDates={true}
    ></DateRangePicker>
  </div>
    )
  }

}



const mapStateToProps = (state) => {

  return {
    filters:state.filters
  }
  
}

export default connect(mapStateToProps)(ExpenseFilter);