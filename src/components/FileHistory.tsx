import React, { useMemo, useEffect } from 'react';

import { Table } from './Table';
import { formatFileSize } from '@/utils/files';
import { useFileState } from '@/contexts/FileContext';
import { FileHistory as FileHistoryEntity } from '@/domain/FileHistoryList';

const FILE_HISTORY_COLUMN_NAME_MAP = {
  fileName: `Filename`,
  fileSize: `File Size`,
  lastModified: `Last Modified`,
  fileType: `File Format`,
};

const FileHistory: React.FC = () => {
  const {
    fileHistory,
    getFileHistoryList,
    removeFileFromHistory,
  } = useFileState();

  const formattedHistory = useMemo(
    () =>
      fileHistory.fileHistoryList.map((historyItem) => ({
        ...historyItem,
        fileSize: formatFileSize(historyItem.fileSize),
      })),
    [fileHistory.fileHistoryList],
  );

  useEffect(() => {
    getFileHistoryList();
  }, []);

  const onRemoveClick = async (row: FileHistoryEntity) => {
    await removeFileFromHistory(row.id);
    getFileHistoryList();
  };

  return (
    <Table
      columnNameMap={FILE_HISTORY_COLUMN_NAME_MAP}
      data={formattedHistory}
      onRemoveClick={onRemoveClick}
    />
  );
};

export default FileHistory;
