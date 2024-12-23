import {FC, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { Divider } from '@mui/material';
import {Grid2, Button, CircularProgress, Box} from '@mui/material';
import { ITicketFromServer } from '../../../types/ticket';
import LessonItem from './LessonItem';
import { ILesson } from '../../../types/lesson';
import CreateLesson from './CreateLesson';
import useGetLessonsByTicket from '../../../api/query/lesson/useGetLessonsByTicket';
import { Status } from '../../../types/lesson-status';
import dayjs from 'dayjs';

interface ITicketItem {
    ticket: ITicketFromServer
}

const TicketLessons: FC<ITicketItem> = ({ticket}) => {
    const [copy, setCopy] = useState<ILesson | null>(null)
    const theme = useTheme();
    const [addIsOpen, setAddIsOpen] = useState<boolean>(false); 
    const {data = [], isLoading} = useGetLessonsByTicket(ticket._id);

    return (
        <Card sx={{boxShadow: 'none'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: theme.status.success }}>
                        <EditIcon />
                    </Avatar>
                }
                title={
                    <Grid2 container spacing={2}>
                        <Grid2 size={3}>{ticket.title}</Grid2>
                        <Grid2 size={3}>{`Учень: ${ticket.student.fullName}`}</Grid2>
                        <Grid2 size={3}>{`Вчитель: ${ticket.teacher.fullName}`}</Grid2>
                        <Grid2 size={3}>{`Предмет: ${ticket.subject}`}</Grid2>
                    </Grid2>
                }
                subheader={
                    <Grid2 container sx={{marginTop: '10px'}}>
                        <Grid2 size={6}>
                            {`використано / скасовано / перенесено: 
                                ${ticket.generalAmount} / 
                                ${ticket.lessons?.filter(lesson => lesson.status === Status.SUCCESS).length} / 
                                ${ticket.lessons?.filter(lesson => lesson.status === Status.TRANSFERED).length}`
                            }
                        </Grid2>
                        <Grid2 size={3}>{`Початок: ${dayjs(ticket.startDate).format('DD/MM/YYYY')}`}</Grid2>
                        <Grid2 size={3}>{`Кінець: ${dayjs(ticket.endDate).format('DD/MM/YYYY')}`}</Grid2>
                    </Grid2>
                }   
            />
            <CardContent sx={{padding: '0'}}>
                <Grid2 container spacing={2} alignItems='flex-end' sx={{padding: '0 20px'}}>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>Дата</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>День</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>Час</Grid2>
                    <Grid2 size={1} sx={{textAlign: 'center'}}>Тривалість</Grid2>
                    <Grid2 size={1} sx={{textAlign: 'center'}}>Кабінет</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>Статус</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'center'}}>Дії</Grid2>
                </Grid2>
                <Divider sx={{marginBottom: '15px'}}/>   
                {
                    isLoading ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
                     data.map((item: ILesson) => <LessonItem key={item._id} lesson={item} copy={setCopy} addNew={setAddIsOpen}/>)
                }
                {
                    addIsOpen &&
                    <CreateLesson setCopy={setCopy} closeForm={setAddIsOpen} ticket={ticket} lesson={copy}/>
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

export default TicketLessons;