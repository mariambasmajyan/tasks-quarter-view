import { styled, css } from '@mui/material';

export const MainLayoutStyled = styled('div')`
  ${() => css`
    height: 100%;
    width: 100%;
    max-width: 700px;
    padding: 10px;

    #content {
      overflow: auto;
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `}
`;
