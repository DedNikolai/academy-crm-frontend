import { FC, Fragment, useContext } from "react";
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Box, CircularProgress, Grow } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import { CardHeader } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { AuthContext } from "../../components/AuthProvider";
import usePayAccounts from "../../api/query/payments/useGetPayAccounts";
import { IPayment, PayTypes } from "../../types/payment";
import useGetStudents from "../../api/query/student/useGetStudents";
import { PieChart } from '@mui/x-charts/PieChart';
import { Colors } from "../../types/colors";
import useGetAllStudents from "../../api/query/student/useGetAllStudents";
import { IStudent } from "../../types/student";
import { Subjects } from "../../types/subjects";

const Home: FC = () => {
    const theme = useTheme();
    const authContext = useContext(AuthContext);
    const {data = [], isLoading} = usePayAccounts();
    const students = useGetAllStudents();
    const balanse = data.reduce((total: number, item: IPayment) => total + item.value, 0);
    const cash = data.length && data.filter((item: IPayment) => PayTypes[item.title as keyof typeof PayTypes] == PayTypes.cash)[0].value;
    const card = data.length && data.filter((item: IPayment) => PayTypes[item.title as keyof typeof PayTypes] == PayTypes.card)[0].value;
    const vocalCount = students.data && students.data.filter((item: IStudent) => item.subjects.includes(Subjects.VOKAL)).length;
    const pianoCount = students.data && students.data.filter((item: IStudent) => item.subjects.includes(Subjects.FORTEPIANO)).length;
    const guitarCount = students.data && students.data.filter((item: IStudent) => item.subjects.includes(Subjects.GUITAR)).length;
    const drumsCount = students.data && students.data.filter((item: IStudent) => item.subjects.includes(Subjects.DRUMS)).length;
    
    return (
       <Fragment>
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                {`Вітаємо, ${authContext?.user?.fullName} 👋`}
            </Typography>
            {
            isLoading || students.isLoading ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
            <Grid container spacing={1} alignItems='center'>
                <Grid size={3}>
                    <Card>
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
                <Grid size={3}>
                    <Card>
                        <CardHeader
                            avatar={<LocalAtmIcon sx={{fontSize: 60, color: theme.palette.primary.main }}/> }
                            title={
                                <Fragment>
                                    <Typography sx={{fontSize: 18}}>Готівка</Typography>
                                    <Typography 
                                        component="h2" sx={{fontSize: 32, fontWeight: 'bold'}}
                                    >
                                        {`₴ ${cash}`}
                                    </Typography>
                                </Fragment>
                            }
                        />
                    </Card>
                </Grid>
                <Grid size={3}>
                    <Card>
                        <CardHeader
                            avatar={<CreditCardIcon sx={{fontSize: 60, color: theme.palette.primary.main }}/> }
                            title={
                                <Fragment>
                                    <Typography sx={{fontSize: 18}}>Рахунок</Typography>
                                    <Typography 
                                        component="h2" sx={{fontSize: 32, fontWeight: 'bold'}}
                                    >
                                        {`₴ ${card}`}
                                    </Typography>
                                </Fragment>
                            }
                        />
                    </Card>
                </Grid>
                <Grid size={3}>
                    <Card>
                        <CardHeader
                            avatar={<PeopleAltIcon sx={{fontSize: 60, color: theme.palette.primary.main }}/> }
                            title={
                                <Fragment>
                                    <Typography sx={{fontSize: 18}}>Учнів</Typography>
                                    <Typography 
                                        component="h2" sx={{fontSize: 32, fontWeight: 'bold'}}
                                    >
                                        {students.data.length}
                                    </Typography>
                                </Fragment>
                            }
                        />
                    </Card>
                </Grid>
                <Grid size={6}>
                    <Card>
                        <PieChart
                            colors={Object.values(Colors)}
                            series={[
                                {
                                data: [
                                    { id: 0, value: vocalCount, label: 'Вокал', color: Colors['Вокал'] },
                                    { id: 1, value: pianoCount, label: 'Фортепіано', color: Colors['Фортепіано']},
                                    { id: 2, value: guitarCount, label: 'Гітара', color: Colors['Гітара'] },
                                    { id: 3, value: drumsCount, label: 'Барабани', color: Colors['Барабани'] },
                                ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Card>
                </Grid>    
            </Grid>
            }
      </Fragment>
    )
};

export default Home;