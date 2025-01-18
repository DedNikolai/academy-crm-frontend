import { IStudent } from '../../../../types/student';
import { ITeacher } from '../../../../types/teacher';
import dayjs from 'dayjs';
import { ITicketFromServer } from '../../../../types/ticket';
import { Status } from '../../../../types/lesson-status';
import { IPayment } from '../../../../types/payment';

interface Column {
    id: 'timestamp' | 'payaccount' | 'title' | 'value' | 'actions' ;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: Function;
  }
  
  const columns: readonly Column[] = [
    { id: 'timestamp', 
      label: "Дата", 
      align: 'center',
      format: (value: Date) => dayjs(value).format('DD/MM/YYYY')
    },
    {
      id: 'title',
      label: 'Вчитель',
      align: 'center',
    },
    {
      id: 'payaccount',
      label: 'Тип оплати',
      align: 'center',
      format: (value: IPayment) => value.title,
    },
    {
      id: 'value',
      label: 'Сума',
      align: 'center',
    },
    {
      id: 'actions',
      label: 'Дії',
      align: 'center',
    },
  ];

  export default columns;