import {FC} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { ITeacher } from '../../../types/teacher';
import { useTheme } from '@mui/material/styles';
import WorkTimeItem from './WorktimeItem';

interface ITeacherItem {
    teacher: ITeacher
}

const TeacherWorkTimes: FC<ITeacherItem> = ({teacher}) => {
    const theme = useTheme();

    return (
        <Card sx={{}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.status.success }}>
                        <EditIcon />
                    </Avatar>
                }
                title={`Робочий час: ${teacher.fullName}`}
            />
            <CardContent>   
                {
                    teacher.worktimes?.map(item => <WorkTimeItem key={item._id} data={item}/>)
                }
            </CardContent>          
        </Card>
    )
};

export default TeacherWorkTimes;