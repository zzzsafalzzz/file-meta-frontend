import { Dispatch } from 'react';
import { AxiosError } from 'axios';

import FileHistoryList from '../domain/FileHistoryList';
import { Action, ActionWithPayload } from '../domain/Action';

import { fetchFileHistoryList } from '../services/file';

export const FETCH_FILE_HISTORY_LIST_PENDING =
  'FETCH_FILE_HISTORY_LIST_PENDING';
export const FETCH_FILE_HISTORY_LIST_REJECTED =
  'FETCH_FILE_HISTORY_LIST_REJECTED';
export const FETCH_FILE_HISTORY_LIST_COMPLETED =
  'FETCH_FILE_HISTORY_LIST_COMPLETED';

type FetchFileHistoryListPending = Action<
  typeof FETCH_FILE_HISTORY_LIST_PENDING
>;
type FetchFileHistoryListCompleted = ActionWithPayload<
  typeof FETCH_FILE_HISTORY_LIST_COMPLETED,
  FileHistoryList
>;
type FetchFileHistoryListRejected = ActionWithPayload<
  typeof FETCH_FILE_HISTORY_LIST_REJECTED,
  AxiosError
>;

export type FileHistoryListActions =
  | FetchFileHistoryListPending
  | FetchFileHistoryListCompleted
  | FetchFileHistoryListRejected;

/**
 * Action to fetch list of file history.
 *
 * @param bookId
 * @param dispatch
 * @returns {void}
 */
export function getFileHistoryList(dispatch: Dispatch<FileHistoryListActions>) {
  dispatch({ type: FETCH_FILE_HISTORY_LIST_PENDING });

  return fetchFileHistoryList()
    .then((data: FileHistoryList) =>
      dispatch({ type: FETCH_FILE_HISTORY_LIST_COMPLETED, payload: data }),
    )
    .catch((e) =>
      dispatch({ type: FETCH_FILE_HISTORY_LIST_REJECTED, payload: e }),
    );
}
