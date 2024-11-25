import {FC, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { ITeacher } from '../../../types/teacher';
import { useTheme } from '@mui/material/styles';
import WorkTimeItem from './WorktimeItem';
import { Divider, Typography } from '@mui/material';
import {Grid2, Button} from '@mui/material';
import CreateWorkTime from './CretaeWorkTime';

interface ITeacherItem {
    teacher: ITeacher
}

const TeacherWorkTimes: FC<ITeacherItem> = ({teacher}) => {
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
                title={`Робочий час: ${teacher.fullName}`}
            />
            <CardContent sx={{padding: '0'}}>
                <Grid2 container spacing={2} alignItems='flex-end' sx={{padding: '0 20px'}}>
                    <Grid2 size={3}>День</Grid2>
                    <Grid2 size={3}>Початок роботи</Grid2>
                    <Grid2 size={3}>Кінець роботи</Grid2>
                    <Grid2 size={3} sx={{textAlign: 'right'}}>Дії</Grid2>
                </Grid2>
                <Divider sx={{marginBottom: '15px'}}/>   
                {
                    teacher.worktimes?.map(item => <WorkTimeItem key={item._id} data={item}/>)
                }
                {
                    addIsOpen &&
                    <CreateWorkTime closeForm={setAddIsOpen} teacher={teacher}/>
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
};

export default TeacherWorkTimes;