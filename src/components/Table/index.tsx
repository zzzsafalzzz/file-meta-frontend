import React from 'react';
import styled from 'styled-components';

import Mapping from '@/domain/Mapping';
import { TableRow, TRowData } from './TableRow';
import { TableHeader } from './TableHeader';

interface ITable {
  columnNameMap: Mapping<string>;
  data: TRowData[];
  onRemoveClick?: (row: any) => void;
}

type IProps = ITable;

const StyledTable = styled.table`
  border: 1px solid #efefef;
  border-radius: 6px;
  border-spacing: 1;
  border-collapse: collapse;
`;

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

export const Table: React.FC<IProps> = ({
  data,
  columnNameMap,
  onRemoveClick,
}) => {
  const columnKeys = Object.keys(columnNameMap);

  return (
    <StyledTable>
      <tbody>
        <TableHeader columnKeys={columnKeys} columnNameMap={columnNameMap} />
        {data.map((row, rowIdx) => (
          <TableRow
            key={`TABLE-ROW-${rowIdx}`}
            row={row}
            columnKeys={columnKeys}
            onRemoveClick={onRemoveClick}
          />
        ))}
      </tbody>
    </StyledTable>
  );
};
