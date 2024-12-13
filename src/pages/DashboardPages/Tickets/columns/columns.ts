import { IStudent } from '../../../../types/student';
import dayjs from 'dayjs';

interface Column {
    id: 'title' | 'startDate' | 'endDate' | 'student' 
        | 'teacher' | 'price' | 'subject' | 'generalAmount' 
        | 'usedAmount' | 'transferred' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: Function;
  }
  
  const columns: readonly Column[] = [
    { id: 'title', label: "Назва", minWidth: 50},
    { id: 'startDate', 
      label: 'Початок', 
      minWidth: 50, 
      align: 'center',
      format: (value: Date) => dayjs(value).format('DD/MM/YYYY')
    },
    { id: 'endDate', 
      label: 'Кінець', 
      minWidth: 50, 
      align: 'center',
      format: (value: Date) => dayjs(value).format('DD/MM/YYYY')
    },
    {
      id: 'student',
      label: 'Студент',
      minWidth: 50,
      align: 'center',
      format: (value: IStudent) => value.fullName
    },
    { id: 'price', label: "Вартість", minWidth: 50, align: 'center'},
    { id: 'subject', label: "Предмет", minWidth: 50, align: 'center'},
    { id: 'generalAmount', label: "Всього", minWidth: 50, align: 'center'},
    { id: 'usedAmount', 
      label: "Використані", 
      minWidth: 50, 
      align: 'center'
    },
    { id: 'transferred', label: "Пееренесені", minWidth: 50, align: 'center'},
    {
      id: 'actions',
      label: 'Дії',
      align: 'center',
    },
  ];

  export default columns;