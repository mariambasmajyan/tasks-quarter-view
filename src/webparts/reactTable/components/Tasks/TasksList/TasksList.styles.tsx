import { styled, TableCell, TableRow, Typography } from '@mui/material';

export const SmallTextTypography = styled(Typography)`
  font-size: 0.8rem;
`;

export const SmallTableCell = styled(TableCell)`
  font-size: 0.8rem;
  padding: 8px 8px;
`;

export const HoverableTableRow = styled(TableRow)({
  '&:hover': {
    cursor: 'pointer',
  },
});
