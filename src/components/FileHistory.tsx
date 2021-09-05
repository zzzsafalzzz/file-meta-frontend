import React, { useEffect } from 'react';

import { Table } from './Table';
import { formatDate } from '@/utils/date';
import { useFileState } from '@/contexts/FileContext';
import { formatFileSize, getFileFormatLabel } from '@/utils/files';
import { FileHistory as FileHistoryEntity } from '@/domain/FileHistoryList';

const FILE_HISTORY_COLUMN_CONFIG_MAP = {
  fileName: { label: `Filename` },
  fileSize: {
    label: `File Size`,
    formatter: (size: number) => formatFileSize(size),
  },
  lastModified: {
    label: `Last Modified`,
    formatter: (lastModified: string) => formatDate(lastModified),
  },
  fileType: {
    label: `File Format`,
    formatter: (type: string) => getFileFormatLabel(type),
  },
};

const FileHistory: React.FC = () => {
  const {
    fileHistory,
    getFileHistoryList,
    removeFileFromHistory,
  } = useFileState();

  useEffect(() => {
    getFileHistoryList();
  }, []);

  const onRemoveClick = async (row: FileHistoryEntity) => {
    await removeFileFromHistory(row.id);
    getFileHistoryList();
  };

  return (
    <Table
      columnConfigMap={FILE_HISTORY_COLUMN_CONFIG_MAP}
      data={fileHistory.fileHistoryList}
      onRemoveClick={onRemoveClick}
    />
  );
};

export default FileHistory;
