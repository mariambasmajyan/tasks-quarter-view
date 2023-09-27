import React from 'react';
import { MainLayoutStyled } from './MainLayout.styles';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <MainLayoutStyled>
      <main id="content">{children}</main>
    </MainLayoutStyled>
  );
};
