import { FC, Fragment } from "react";
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Box, CircularProgress } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import { CardHeader } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import usePayAccounts from "../../api/query/payments/useGetPayAccounts";
import useGetTeachers from '../../api/query/teacher/useGetTeachers';
import { IPayment, PayTypes } from "../../types/payment";
import useGetAllStudents from "../../api/query/student/useGetAllStudents";
import PayAccountItem from "../../components/PayAccountItem";

const Bills: FC = () => {
    const theme = useTheme();
    const {data = [], isLoading} = usePayAccounts();
    const students = useGetAllStudents();
    const teachers = useGetTeachers()
    const balanse = data.reduce((total: number, item: IPayment) => total + item.value, 0);
    const cash = data.length && data.filter((item: IPayment) => item.title === PayTypes.CASH)[0];
    const card = data.length && data.filter((item: IPayment) => item.title === PayTypes.CARD)[0];
    
    
    return (
       <Fragment>
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                {`Рахунки компанії $`}
            </Typography>
            {
            isLoading || students.isLoading || teachers.isLoading ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
            <Grid container spacing={1} alignItems='center'>
                <Grid size={4}>
                    <Card sx={{height: 120}}>
                        <CardHeader
                            avatar={<SavingsIcon sx={{fontSize: 60, color: theme.palette.primary.main }}/> }
                            title={
                                <Fragment>
                                    <Typography sx={{fontSize: 18}}>Баланс</Typography>
                                    <Typography 
                                        component="h2" sx={{fontSize: 32, fontWeight: 'bold'}}
                                    >
                                        {`₴ ${balanse}`}
                                    </Typography>
                                </Fragment>
                            }
                        />
                    </Card>
                </Grid>
                <PayAccountItem  account={cash}/>
                <PayAccountItem account={card} />
            </Grid>
            }
      </Fragment>
    )
};

export default Bills;