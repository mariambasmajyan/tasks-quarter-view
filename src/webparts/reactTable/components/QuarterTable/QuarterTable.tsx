import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Table, TableBody, TableHead, TableRow, Grid, Tooltip } from '@mui/material';
import { useTasksContext } from '../Tasks/TasksContext';
import {
  getDatesArray,
  getQuarterData,
  MONTH_NAMES,
  getTaskColorForWeek,
} from '../../utils/quartetUtils';
import { differenceInCalendarWeeks } from 'date-fns';
import {
  StyledGrid,
  SmallTextTypography,
  SmallButton,
  SmallTableCell,
} from './QuarterTable.styles';
import { formatDate } from '../../utils/utils';

export const QuarterTable = () => {
  const { tasks } = useTasksContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { quarter, year, startDate, endDate } = getQuarterData(currentDate);
  const dates = getDatesArray(startDate, endDate);
  const monthsInQuarter = new Set(dates.map((date) => date.getMonth()));

  const weeksInQuarter = differenceInCalendarWeeks(endDate, startDate) + 1;

  return (
    <StyledGrid container direction="column">
      <Grid container item justifyContent="center" alignItems="center">
        <SmallButton
          onClick={() => setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() - 3)))}
        >
          <ArrowBackIosIcon fontSize="small" />
        </SmallButton>
        <SmallTextTypography variant="h6">
          Quarter {quarter}, {year}
        </SmallTextTypography>
        <SmallButton
          onClick={() => setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() + 3)))}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </SmallButton>
      </Grid>
      <Grid item>
        <Table size="small">
          <TableHead>
            <TableRow>
              {Array.from(monthsInQuarter).map((monthIdx, index) => {
                const weeksPerMonth = Math.floor(weeksInQuarter / monthsInQuarter.size);
                const extraWeeks =
                  index === Array.from(monthsInQuarter).length - 1 &&
                  weeksInQuarter % monthsInQuarter.size;
                const totalWeeks = weeksPerMonth + (extraWeeks ? 1 : 0);
                return (
                  <SmallTableCell key={monthIdx} colSpan={totalWeeks}>
                    {MONTH_NAMES[monthIdx]}
                  </SmallTableCell>
                );
              })}
            </TableRow>
            <TableRow>
              {[...Array(weeksInQuarter)].map((_, idx) => (
                <SmallTableCell key={idx}>{idx + 1}</SmallTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, taskIdx) => (
              <TableRow key={taskIdx}>
                {[...Array(weeksInQuarter)].map((_, weekIdx) => {
                  // @ts-ignore
                  const weekStart = new Date(startDate);
                  weekStart.setDate(startDate.getDate() + weekIdx * 7);
                  // @ts-ignore
                  const weekEnd = new Date(weekStart);
                  weekEnd.setDate(weekStart.getDate() + 6);

                  const taskInfo = `
                      Name: ${task.name}
                      Start Date: ${formatDate(task.startDate)}
                      End Date: ${formatDate(task.endDate)}
                  `;

                  return (
                    <Tooltip title={taskInfo} key={weekIdx}>
                      <SmallTableCell
                        key={weekIdx}
                        style={{
                          backgroundColor: getTaskColorForWeek(weekStart, weekEnd, task),
                          height: '15px',
                        }}
                      />
                    </Tooltip>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </StyledGrid>
  );
};
