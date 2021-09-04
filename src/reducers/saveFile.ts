import {
  SaveFileActions,
  SAVE_FILE_PENDING,
  SAVE_FILE_REJECTED,
  SAVE_FILE_COMPLETED,
} from '../actions/addFileToHistory';

export interface SaveFileState {
  isLoading: boolean;
  error: string | null;
}

export const INITIAL_STATE: SaveFileState = {
  error: null,
  isLoading: false,
};

/**
 * Reducer for SaveFileList list.
 *
 * @param {SaveFileState} state
 * @param {BookDetailsActions} action
 * @returns {SaveFileState}
 */
function reducer(
  state = INITIAL_STATE,
  action: SaveFileActions,
): SaveFileState {
  switch (action.type) {
    case SAVE_FILE_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case SAVE_FILE_COMPLETED:
      return {
        error: null,
        isLoading: false,
      };

    case SAVE_FILE_REJECTED:
      return {
        isLoading: false,
        error: action.payload?.message,
      };

    default:
      return state;
  }
}

export default reducer;
