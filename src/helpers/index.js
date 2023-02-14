import format from 'date-fns/format'

export const datePlaceHolder = 'DD/MM/YYYY'
export const timePlaceHolder = 'HH:mm'
export const datePattern =
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19[0-9][0-9]|20[0-9][0-9])$/
export const timePattern = /^([01][0-9]|2[0-3]):[0-5][0-9]$/

export const formatDate = (date) => {
  return format(new Date(date * 1000), 'Pp')
}

// write a function that create a javascript date from a date string in this format yyyy-mm-dd and a number for the hour and a number for the minutes
export const createDateTime = (date, hour, minutes) => {
  return new Date(date + ' ' + hour + ':' + minutes)
}
