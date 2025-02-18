import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {useParams, Navigate} from 'react-router-dom';
import EditTeacher from './EditTeacher';
import TeacherWorkTimes from './TeacherWorkTimes';
import useTeacher from '../../../api/query/teacher/useGetTaecher';
import { CircularProgress } from '@mui/material';
import TeacherStudents from './TeacherStudents';
import TeacherShedule from './TeacherShedule';

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

export default function TeacherPage() {
  const params = useParams<{id: string}>();
  const [value, setValue] = React.useState(0);
  const {data, isLoading, isFetched, isFetching} = useTeacher(params.id);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!data && isFetched) return <Navigate to='/404' />

  return (
    <Card sx={{}}>
      {isLoading ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Особисті дані" {...a11yProps(0)} />
              <Tab label="Графік роботи" {...a11yProps(1)} />
              <Tab label="Учні" {...a11yProps(2)} />
              <Tab label="Розклад" {...a11yProps(3)} />
              </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
              <EditTeacher teacher={data}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TeacherWorkTimes teacher={data}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
              <TeacherStudents teacher={data} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
              <TeacherShedule teacher={data}/>
          </CustomTabPanel>
        </Box>
        }
    </Card>
  );
}
