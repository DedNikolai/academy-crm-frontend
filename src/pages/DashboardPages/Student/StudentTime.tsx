import { FC, useState } from "react";
import { IStudent } from "../../../types/student";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import StudentTimeItem from './StudentTimeItem';
import { Divider } from '@mui/material';
import {Grid2, Button} from '@mui/material';
import CreateStudentTime from "./CreateStudentTime";
import { ITeacher } from "../../../types/teacher";

const StudentTime: FC<{student: IStudent, teachers: ITeacher[]}>= ({student, teachers}) => {
    const theme = useTheme();
    const [addIsOpen, setAddIsOpen] = useState<boolean>(false); 

    return (
        <Card sx={{boxShadow: 'none'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.status.success }}>
                        <EditIcon />
                    </Avatar>
                }
                title={`Графік відвідувань: ${student.fullName}`}
            />
            <CardContent sx={{padding: '0'}}>
                <Grid2 container spacing={2} alignItems='flex-end' sx={{padding: '0 20px'}}>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>День</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>Початок уроку</Grid2>
                    <Grid2 size={1} sx={{textAlign: 'center'}}>Тривалість</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>Вчитель</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>Предмет</Grid2>
                    <Grid2 size={1} sx={{textAlign: 'center'}}>Клас</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>Дії</Grid2>
                </Grid2>
                <Divider sx={{marginBottom: '15px'}}/>   
                {
                    student.lessontimes?.map(item => <StudentTimeItem 
                                                        key={item._id} 
                                                        data={item} 
                                                        student={student} 
                                                        allTeachers={teachers}
                                                        />)
                }
                {
                    addIsOpen &&
                    <CreateStudentTime closeForm={setAddIsOpen} student={student} allTeachers={teachers}/>
                }
                <Grid2 sx={{padding: '20px', textAlign: 'right'}}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setAddIsOpen(true)}
                        sx={{bgcolor: theme.status.success, width: theme.button.width}}
                    >
                        Додати
                    </Button>
                </Grid2>
            </CardContent>          
        </Card>
    )
}

export default StudentTime;