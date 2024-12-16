import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';
import { DiaryData } from '../types/datatype';

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

type Actions =
  | {
      type: 'CREATE';
      diarys: DiaryData[];
      page: number;
    }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

export interface DiaryListState {
  diarys: DiaryData[];
  page: number;
}

export const DiaryListContext = createContext<DiaryListState | undefined>(undefined);
export const DiaryActionsContext = createContext<Dispatch<Actions> | undefined>(undefined);

const diaryReducer = (state: DiaryListState, action: Actions) => {
  switch (action.type) {
    case 'CREATE':
      return {
        ...state,
        diarys: [...state.diarys, ...action.diarys],
        page: action.page,
      };

    case 'TOGGLE':
      return {
        ...state,
        diarys: state.diarys.map(diary => (diary.id === action.id ? { ...diary, status: 2 } : diary)),
      };

    case 'REMOVE':
      return {
        ...state,
        diarys: state.diarys.filter(diary => diary.id !== action.id),
      };

    default:
      return state;
  }
};

export function DiaryListProvider({ children }: { children: ReactNode }) {
  const [diarys, dispatch] = useReducer(diaryReducer, {
    diarys: [],
    page: 0,
  });

  return (
    <DiaryActionsContext.Provider value={dispatch}>
      <DiaryListContext.Provider value={diarys}>{children}</DiaryListContext.Provider>
    </DiaryActionsContext.Provider>
  );
}

// 유효성 체크
export function useDiaryListContext() {
  const state = useContext(DiaryListContext);
  if (!state) throw new Error('Provider is not found');
  return state;
}

export function useDiaryListDispatchContext() {
  const dispatch = useContext(DiaryActionsContext);
  if (!dispatch) throw new Error('Provider is not found');
  return dispatch;
}
