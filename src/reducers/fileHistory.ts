import {
  RemoveFileActions,
  REMOVE_FILE_COMPLETED,
  REMOVE_FILE_PENDING,
  REMOVE_FILE_REJECTED,
} from '@/actions/removeFileFromHistory';
import {
  FileHistoryListActions,
  FETCH_FILE_HISTORY_LIST_PENDING,
  FETCH_FILE_HISTORY_LIST_REJECTED,
  FETCH_FILE_HISTORY_LIST_COMPLETED,
} from '../actions/getfileHistory';
import FileHistoryList from '../domain/FileHistoryList';

export interface FileHistoryState {
  isLoading: boolean;
  error: string | null;
  fileHistoryList: FileHistoryList;
}

export const INITIAL_STATE: FileHistoryState = {
  fileHistoryList: [],
  error: null,
  isLoading: false,
};

/**
 * Reducer for fileHistoryList list.
 *
 * @param {FileHistoryState} state
 * @param {BookDetailsActions} action
 * @returns {FileHistoryState}
 */
function reducer(
  state = INITIAL_STATE,
  action: FileHistoryListActions | RemoveFileActions,
): FileHistoryState {
  switch (action.type) {
    case FETCH_FILE_HISTORY_LIST_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_FILE_HISTORY_LIST_COMPLETED:
      return {
        error: null,
        isLoading: false,
        fileHistoryList: action.payload.map((historyItem) => ({
          ...historyItem,
        })),
      };

    case FETCH_FILE_HISTORY_LIST_REJECTED:
      return {
        fileHistoryList: [],
        isLoading: false,
        error: action.payload?.message,
      };

    case REMOVE_FILE_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case REMOVE_FILE_COMPLETED:
      return {
        fileHistoryList: state.fileHistoryList.filter(
          (listItem) => listItem.id !== action.payload,
        ),
        isLoading: false,
        error: null,
      };

    case REMOVE_FILE_REJECTED:
      return {
        ...state,
        error: action.payload?.message,
      };

    default:
      return state;
  }
}

export default reducer;
