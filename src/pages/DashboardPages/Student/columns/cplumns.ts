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
      // minWidth: 170,
      align: 'left',
    },
    {
      id: 'teachers',
      label: 'Вчителі',
      // minWidth: 170,
      align: 'left',
      format: (value: ITeacher[]) => value && value.map(teacher => teacher.fullName) ,
    },
    {
      id: 'isActive',
      label: 'Активний',
      // minWidth: 170,
      align: 'center',
    },
    {
      id: 'actions',
      label: 'дії',
      // minWidth: 170,
      align: 'center',
    },
  ];

  export default columns;