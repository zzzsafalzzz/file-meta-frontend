import Mapping from './Mapping';

export interface FileHistory extends Mapping<string | number | Date> {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  lastModified: Date;
  createdAt: Date;
  updatedAt: Date;
}
export type NewFile = Omit<FileHistory, 'id' | 'createdAt' | 'updatedAt'>;

type FileHistoryList = FileHistory[];

export default FileHistoryList;
