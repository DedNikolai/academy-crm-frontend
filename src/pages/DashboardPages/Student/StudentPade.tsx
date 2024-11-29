import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {useParams, Navigate} from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useStudent from '../../../api/query/student/useGetStudent';
import EditStudent from './EditStudent';
import useTeachers from '../../../api/query/teacher/useGetTeachers';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Params = {
    id: string;
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

export default function StudentPage() {
  const params = useParams<Params>();
  const [value, setValue] = React.useState(0);
  const {data, isLoading, isFetched} = useStudent(params.id);
  const teachersData = useTeachers();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!data && isFetched) return <Navigate to='/404' />

  return (
    <Card sx={{}}>
      {isLoading || teachersData.isLoading ? <Box sx={{textAlign: 'center'}}><CircularProgress /></Box> :
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Особисті дані" {...a11yProps(0)} />
              <Tab label="Графік відвідувань" {...a11yProps(1)} />
              <Tab label="учні" {...a11yProps(2)} />
              </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
              <EditStudent student={data} allTeachers={teachersData.data}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
              Item Three
          </CustomTabPanel>
        </Box>
        }
    </Card>
  );
}
