import { dayNames } from "../constans/calendar";

export const getNumbersOfDaysInMoth = (year, month) => {
   return new Date(year, month + 1, 0).getDate();
}

export const getSortedDays = (year,month) => {
   const dayIndex = new Date(year, month,1).getDay();
   const firstHalf = dayNames.slice(dayIndex);
   return [...firstHalf,...dayNames.slice(0,dayIndex)]
}

export const range = (start, end) => {
   const length = Math.abs((end - start) / 1);
   const { result } = Array.from({ length }).reduce(
      ({ result, current }) => ({
         result: [...result, current],
         current:current+1,
      }),{result:[],current:start}
   )
   return result
}

export const formatDateString = date => {
  if (date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } else {
    return null; 
  }
};

