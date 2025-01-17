import { IStudent } from '../../../../types/student';
import dayjs from 'dayjs';
import { Subjects } from '../../../../types/subjects';

interface Column {
    id: 'title' | 'startDate' | 'endDate' | 'student' 
        | 'teacher' | 'price' | 'subject' | 'generalAmount' 
        | 'usedAmount' | 'transferred' | 'actions' | 'isPaid';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: Function;
  }
  
  const columns: readonly Column[] = [
    { id: 'title', label: "Назва"},
    { id: 'startDate', 
      label: 'Початок', 
      align: 'center',
      format: (value: Date) => dayjs(value).format('DD/MM/YYYY')
    },
    { id: 'endDate', 
      label: 'Кінець', 
      align: 'center',
      format: (value: Date) => dayjs(value).format('DD/MM/YYYY')
    },
    {
      id: 'student',
      label: 'Студент',
      align: 'center',
      format: (value: IStudent) => value.fullName
    },
    { id: 'price', label: "Вартість", align: 'center'},
    { 
      id: 'subject', 
      label: "Предмет", 
      align: 'center',
      format: (value: string) => Subjects[value as keyof typeof Subjects]
    },
    { id: 'generalAmount', label: "Всього", align: 'center'},
    { id: 'usedAmount', 
      label: "Використані", 
      align: 'center'
    },
    { id: 'transferred', label: "Пееренесені", minWidth: 50, align: 'center'},
    {
      id: 'isPaid',
      label: 'Оплата',
      align: 'center',
    },
    {
      id: 'actions',
      label: 'Дії',
      align: 'center',
    },
  ];

  export default columns;