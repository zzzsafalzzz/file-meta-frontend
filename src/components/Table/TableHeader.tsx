import React from 'react';
import styled from 'styled-components';

import Mapping from '@/domain/Mapping';
import { IColumnConfig } from './TableRow';

interface ITable {
  columnConfigMap: Mapping<IColumnConfig>;
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
  columnConfigMap,
}) => {
  return (
    <StyledTableRowHeader>
      {Object.values(columnConfigMap).map((columnConfig, idx) => (
        <StyledTableHeader key={`TABLE-HEADER-${idx}`}>
          {columnConfig.label}
        </StyledTableHeader>
      ))}
      <StyledTableHeader></StyledTableHeader>
    </StyledTableRowHeader>
  );
};
