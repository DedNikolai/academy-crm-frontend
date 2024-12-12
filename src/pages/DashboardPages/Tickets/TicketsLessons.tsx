import {FC, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { Divider, Typography } from '@mui/material';
import {Grid2, Button, CircularProgress, Box} from '@mui/material';
import { ITicketFromServer } from '../../../types/ticket';
import LessonItem from './LessonItem';
import { ILesson } from '../../../types/lesson';
import CreateLesson from './CreateLesson';
import useGetLessonsByTicket from '../../../api/query/lesson/useGetLessonsByTicket';

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
                    <>
                        <Typography>{ticket.title}</Typography>
                        <Typography>{`Учень: ${ticket.student.fullName}`}</Typography>
                        <Typography>{`Вчитель: ${ticket.teacher.fullName}`}</Typography>
                        <Typography>{`Предмет: ${ticket.subject}`}</Typography>
                    </>
                }
                subheader={
                    `використано / скасовано / перенесено: 
                    ${ticket.generalAmount} / ${ticket.usedAmount} / ${ticket.transferred}`
                }   
            />
            <CardContent sx={{padding: '0'}}>
                <Grid2 container spacing={2} alignItems='flex-end' sx={{padding: '0 20px'}}>
                    <Grid2 size={2}>Дата</Grid2>
                    <Grid2 size={2}>День</Grid2>
                    <Grid2 size={2}>час</Grid2>
                    <Grid2 size={1}>Тривалість</Grid2>
                    <Grid2 size={1}>Кабінет</Grid2>
                    <Grid2 size={2}>Статус</Grid2>
                    <Grid2 size={2} sx={{textAlign: 'right'}}>Дії</Grid2>
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