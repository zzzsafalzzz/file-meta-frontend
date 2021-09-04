import React from 'react';
import styled from 'styled-components';

interface Mapping<T> {
  [key: string]: T;
}

export type TRowData = Mapping<string | number | Date>;

interface ITableRowProps {
  columnKeys: string[];
  row: TRowData;
  onRemoveClick?: (row: TRowData) => void;
}

const StyledTableRow = styled.tr`
  background-color: #f6f6f6;
  font-family: Arial;
  color: #2d0d85;
`;

const StyledTableData = styled.td`
  padding: 12px;
  border: none;
`;

export const TableRow: React.FC<ITableRowProps> = ({
  row,
  columnKeys,
  onRemoveClick,
}) => (
  <StyledTableRow>
    {columnKeys.map((column, colIdx) => (
      <StyledTableData key={`TABLE-DATA-${colIdx}`}>
        {row[column]}
      </StyledTableData>
    ))}
    <StyledTableData onClick={() => onRemoveClick && onRemoveClick(row)}>
      <button type="submit">X</button>
    </StyledTableData>
  </StyledTableRow>
);
