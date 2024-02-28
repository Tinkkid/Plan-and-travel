import { dayNames, dayNamesFull } from "../constans/calendar";

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

export const getFullNameOfCurrentDay = () => {
   const today = new Date().getDay();
   return dayNamesFull[today];
}

export const formatDate = (inputDate) => {
   if (inputDate) {
      const parts = inputDate.split('.');
      const formattedDate = parts.reverse().join('-');
      return formattedDate
   }
return null
}

export const formatDateDefalult = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getDayOfWeek = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const numberDayOfWeek = date.getDay(); 
    return dayNames[numberDayOfWeek];
}
