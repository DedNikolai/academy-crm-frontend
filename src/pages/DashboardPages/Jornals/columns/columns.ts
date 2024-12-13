import { IStudent } from '../../../../types/student';
import { ITeacher } from '../../../../types/teacher';
import dayjs from 'dayjs';
import { ITicket } from '../../../../types/ticket';
import { Status } from '../../../../types/lesson-status';

interface Column {
    id: 'date' | 'durationMinutes' | 'room' | 'ticket'
    | 'teacher' | 'student' | 'subject' | 'status' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: Function;
  }
  
  const columns: readonly Column[] = [
    { id: 'date', 
      label: "час", 
      minWidth: 50,
      format: (value: Date) => dayjs(value).format('DD/MM/YYYY')
    },
    { id: 'durationMinutes', label: 'Тривалість', minWidth: 50, align: 'left' },
    {
      id: 'room',
      label: 'Кабінет',
      align: 'left',
    },
    {
      id: 'teacher',
      label: 'Вчител',
      align: 'left',
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
    },
    {
      id: 'status',
      label: 'Статус',
      align: 'center',
    },
    {
      id: 'ticket',
      label: 'Статус',
      align: 'center',
      format: (value: ITicket) => {
        return value.lessons?.filter(lesson => lesson.status !== Status.TRANSFERED).length + `/` + value.generalAmount
      }
    },
    {
      id: 'actions',
      label: 'Дії',
      align: 'center',
    },
  ];

  export default columns;