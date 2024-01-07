// src/components/headerText.component.tsx

// headerText.component.tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface DynamicHeaderProps {
    as: asTypes;
    children: ReactNode; 
}
  
type asTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// This component will use the headerType prop to determine which header tag to render
const DynamicHeader = styled(({ as, children, ...rest }: DynamicHeaderProps) => 
  React.createElement(as, rest, children)
)`
  display: flex;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.headerText};
`;


// Props type definition
interface HeaderTextProps {
  text: string;
  as: asTypes;
}

//memoizing this component since the props change only on page load and only displays header text

const HeaderText: React.FC<HeaderTextProps> = React.memo(({ text, as }) => {
    return <DynamicHeader as={as}>{text}</DynamicHeader>;
  });
  

export default HeaderText;


