import { Dispatch } from 'react';
import { AxiosError } from 'axios';

import { Action, ActionWithPayload } from '../domain/Action';

import { removeFile } from '../services/file';

export const REMOVE_FILE_PENDING = 'REMOVE_FILE_PENDING';
export const REMOVE_FILE_REJECTED = 'REMOVE_FILE_REJECTED';
export const REMOVE_FILE_COMPLETED = 'REMOVE_FILE_COMPLETED';

type RemoveFilePending = Action<typeof REMOVE_FILE_PENDING>;
type RemoveFileCompleted = ActionWithPayload<
  typeof REMOVE_FILE_COMPLETED,
  Number
>;
type RemoveFileRejected = ActionWithPayload<
  typeof REMOVE_FILE_REJECTED,
  AxiosError
>;

export type RemoveFileActions =
  | RemoveFileCompleted
  | RemoveFilePending
  | RemoveFileRejected;

/**
 * Action to remove list of file history.
 *
 * @param bookId
 * @param dispatch
 */
export function removeFileFromHistory(
  fileId: number,
  dispatch: Dispatch<RemoveFileActions>,
) {
  dispatch({ type: REMOVE_FILE_PENDING });

  return removeFile(fileId)
    .then((data) => dispatch({ type: REMOVE_FILE_COMPLETED, payload: fileId }))
    .catch((e) => dispatch({ type: REMOVE_FILE_REJECTED, payload: e }));
}
