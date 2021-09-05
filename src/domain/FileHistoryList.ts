import Mapping from './Mapping';

export interface FileHistory extends Mapping<string | number> {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  lastModified: string;
  createdAt: string;
  updatedAt: string;
}
export type NewFile = Omit<FileHistory, 'id' | 'createdAt' | 'updatedAt'>;

type FileHistoryList = FileHistory[];

export default FileHistoryList;
