import { Dispatch } from 'react';
import { AxiosError } from 'axios';

import { NewFile } from '../domain/FileHistoryList';
import { Action, ActionWithPayload } from '../domain/Action';

import { saveFile } from '../services/file';

export const SAVE_FILE_PENDING = 'SAVE_FILE_PENDING';
export const SAVE_FILE_REJECTED = 'SAVE_FILE_REJECTED';
export const SAVE_FILE_COMPLETED = 'SAVE_FILE_COMPLETED';

type SaveFilePending = Action<typeof SAVE_FILE_PENDING>;
type SaveFileCompleted = Action<typeof SAVE_FILE_COMPLETED>;
type SaveFileRejected = ActionWithPayload<
  typeof SAVE_FILE_REJECTED,
  AxiosError
>;

export type SaveFileActions =
  | SaveFileCompleted
  | SaveFilePending
  | SaveFileRejected;

/**
 * Action to save new file to file history.
 *
 * @param file
 * @param dispatch
 * @returns {void}
 */
export function addFileToHistory(
  file: NewFile,
  dispatch: Dispatch<SaveFileActions>,
) {
  dispatch({ type: SAVE_FILE_PENDING });

  return saveFile(file)
    .then((data) => dispatch({ type: SAVE_FILE_COMPLETED }))
    .catch((e) => dispatch({ type: SAVE_FILE_REJECTED, payload: e }));
}
