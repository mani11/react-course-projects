//set text filter

export const setTextFilter = (text = '') => ({
  type:"FILTERBY_TEXT",
  text
});

//SORT
// SORT_BY_DATE

export const sortByDate = () => ({
  type:"SORTBY_DATE",
  sortBy:"date"
});

export const sortByAmount = () => ({
  type:"SORTBY_AMOUNT",
  sortBy:"amount"
});

export const setStartDate = (startDate) => ({

  type:"SET_STARTDATE",
  startDate

});

export const setEndDate = (endDate) => ({

  type:"SET_ENDDATE",
  endDate

});