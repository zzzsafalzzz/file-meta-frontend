import React, { useContext, createContext, useReducer } from 'react';

import saveFileReducer, {
  INITIAL_STATE as FILE_INPUT_INITIAL_STATE,
} from '@/reducers/saveFile';
import fileHistoryReducer, {
  INITIAL_STATE as FILE_HISTORY_INITIAL_STATE,
} from '@/reducers/fileHistory';
import { NewFile } from '@/domain/FileHistoryList';
import { addFileToHistory } from '@/actions/addFileToHistory';
import { getFileHistoryList } from '@/actions/getfileHistory';
import { removeFileFromHistory } from '@/actions/removeFileFromHistory';

const FileStateContext = createContext({
  fileInput: FILE_INPUT_INITIAL_STATE,
  fileHistory: FILE_HISTORY_INITIAL_STATE,
  getFileHistoryList: async () => {},
  addFileToHistory: async (file: NewFile) => {},
  removeFileFromHistory: async (fileId: number) => {},
});

const FileStateProvider: React.FC<{}> = ({ children }) => {
  const state = useContext(FileStateContext);

  const [saveFileState, saveFileDispatch] = useReducer(
    saveFileReducer,
    state.fileInput,
  );
  const [historyState, fileHistorydispatch] = useReducer(
    fileHistoryReducer,
    state.fileHistory,
  );

  return (
    <FileStateContext.Provider
      value={{
        fileInput: saveFileState,
        fileHistory: historyState,
        getFileHistoryList: () => getFileHistoryList(fileHistorydispatch),
        addFileToHistory: (file: NewFile) =>
          addFileToHistory(file, saveFileDispatch),
        removeFileFromHistory: (fileId: number) =>
          removeFileFromHistory(fileId, fileHistorydispatch),
      }}
    >
      {children}
    </FileStateContext.Provider>
  );
};

const useFileState = () => {
  const fileState = useContext(FileStateContext);

  if (!fileState) {
    throw new Error('useWordsState must be used within an WordsProvider');
  }

  return fileState;
};

export { FileStateProvider, useFileState };
