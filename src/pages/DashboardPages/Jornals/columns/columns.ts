import { IStudent } from '../../../../types/student';
import { ITeacher } from '../../../../types/teacher';
import dayjs from 'dayjs';
import { ITicketFromServer } from '../../../../types/ticket';
import { Status } from '../../../../types/lesson-status';
import { Subjects } from '../../../../types/subjects';

interface Column {
    id: 'date' | 'durationMinutes' | 'room' | 'ticket' | 'payout'
    | 'teacher' | 'student' | 'subject' | 'status' | 'actions' | 'isPaid';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: Function;
  }
  
  const columns: readonly Column[] = [
    { id: 'date', 
      label: "Час", 
      align: 'center',
      format: (value: Date) => dayjs(value).format('HH-mm')
    },
    { id: 'durationMinutes', label: 'Тривалість', align: 'center' },
    {
      id: 'room',
      label: 'Кабінет',
      align: 'center',
    },
    {
      id: 'teacher',
      label: 'Вчитель',
      align: 'center',
      format: (value: ITeacher) => value.fullName,
    },
    {
      id: 'student',
      label: 'Студент',
      align: 'center',
      format: (value: IStudent) => value.fullName,
    },
    {
      id: 'subject',
      label: 'Предмет',
      align: 'center',
      format: (value: string) => Subjects[value as keyof typeof Subjects],
    },
    {
      id: 'status',
      label: 'Статус',
      align: 'center',
    },
    {
      id: 'payout',
      label: 'Виплата',
      align: 'center',
    },
    {
      id: 'ticket',
      label: 'Заняття',
      align: 'center',
      format: (value: ITicketFromServer) => {
        return value.lessons?.filter(lesson => Status[lesson.status as keyof typeof Status] !== Status.TRANSFERED && lesson.status).length + `/` + value.generalAmount
      }
    },
    {
      id: 'isPaid',
      label: 'Оплата',
      align: 'center',
    },
    {
      id: 'actions',
      label: 'Абонемент',
      align: 'center',
    },
  ];

  export default columns;