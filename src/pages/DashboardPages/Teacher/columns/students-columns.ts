import { ITeacher } from '../../../../types/teacher';

interface Column {
    id: 'fullName' | 'phone' | 'subjects' | 'teachers' | 'isActive' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: Function;
  }
  
  const columns: readonly Column[] = [
    { id: 'fullName', label: "Ім'я", minWidth: 50},
    { id: 'phone', label: 'Телефон', minWidth: 100, align: 'left' },
    {
      id: 'subjects',
      label: 'Предменти',
      align: 'left',
      format: (value: string[]) => value.join(', ')
    },
    {
      id: 'teachers',
      label: 'Вчителі',
      align: 'left',
      format: (value: ITeacher[]) => value && value.map(teacher => teacher.fullName).join(', ') ,
    },
    {
      id: 'isActive',
      label: 'Активний',
      align: 'center',
    },
    {
      id: 'actions',
      label: 'дії',
      align: 'center',
    },
  ];

  export default columns;