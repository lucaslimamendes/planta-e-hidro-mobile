import dayjs from 'dayjs';

export default date => {
  return dayjs
    .tz(dayjs(date).format('YYYY-MM-DD HH:mm') + '+03:00', 'America/Sao_Paulo')
    .format('HH:mm DD/MM/YYYY');
};
