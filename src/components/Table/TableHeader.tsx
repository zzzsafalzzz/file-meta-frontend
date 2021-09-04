import React from 'react';
import styled from 'styled-components';

import Mapping from '@/domain/Mapping';

interface ITable {
  columnNameMap: Mapping<string>;
  columnKeys: string[];
}

type IProps = ITable;

const StyledTableRowHeader = styled.tr`
  background-color: #ffffff;
  font-family: Arial;
  color: #2d0d85;
`;

const StyledTableHeader = styled.th`
  min-width: 150px;
  text-align: left;
  padding: 12px;
`;

export const TableHeader: React.FC<IProps> = ({
  columnKeys,
  columnNameMap,
}) => {
  return (
    <StyledTableRowHeader>
      {columnKeys.map((column, idx) => (
        <StyledTableHeader key={`TABLE-HEADER-${idx}`}>
          {columnNameMap[column]}
        </StyledTableHeader>
      ))}
      <StyledTableHeader></StyledTableHeader>
    </StyledTableRowHeader>
  );
};
