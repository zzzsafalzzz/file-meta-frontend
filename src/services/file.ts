import http from '../utils/http';
import Endpoints from '../enums/endpoints';
import FileHistoryList, {
  FileHistory,
  NewFile,
} from '../domain/FileHistoryList';

/**
 * Fetches a list of FileHistory from the API.
 *
 * @returns {Promise<FileHistoryList>}
 */
export async function fetchFileHistoryList(): Promise<FileHistoryList> {
  const { data } = await http.get(Endpoints.FILE_HISTORY);

  return data.data;
}

/**
 * Makes an API request to save a new file.
 *
 * @param {NewFile} file
 * @returns {Promise<FileHistoryList>}
 */
export async function saveFile(file: NewFile): Promise<FileHistory> {
  const { data } = await http.post(Endpoints.FILES, file);

  return data.data;
}

/**
 * Makes an API request to remove file with given id.
 *
 * @param fileId
 * @returns {Promise<FileHistoryList>}
 */
export async function removeFile(fileId: number): Promise<FileHistory> {
  const { data } = await http.delete(`${Endpoints.FILES}/${fileId}`);

  return data.data;
}
