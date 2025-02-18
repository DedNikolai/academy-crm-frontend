import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {useParams, Navigate} from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useTeachers from '../../../api/query/teacher/useGetTeachers';
import EditTicket from './EditTicket';
import useTicket from '../../../api/query/ticket/useGetTicket';
import TicketLessons from './TicketsLessons';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TicketPage() {
  const params = useParams<{id: string}>();
  const [value, setValue] = React.useState(0);
  const {data, isLoading, isFetched} = useTicket(params.id);
  const teachersData = useTeachers()


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!data && isFetched) return <Navigate to='/404' />

  if (isLoading || teachersData.isLoading ) {
    return (
      <Card>
         <Box sx={{textAlign: 'center'}}><CircularProgress /></Box>
      </Card>
    )
  }

  return (
    <Card sx={{}}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Дані по абонемнету" {...a11yProps(0)} />
                <Tab label="Заняття по абонементу" {...a11yProps(1)} />
              </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
              <EditTicket ticket={data} teachers={teachersData.data}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TicketLessons ticket={data} />
          </CustomTabPanel>
        </Box>
    </Card>
  );
}
