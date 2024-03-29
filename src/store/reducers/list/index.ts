import {PayloadList} from '../../../types/list';

type PropReducer = {
  data: PayloadList[];
  share: boolean;
  newList: boolean;
  refreshing: boolean;
  seeList?: {
    id: number;
    title: string;
  };
  itemToDelete?: number;
};

export const initalList: PropReducer = {
  data: [],
  share: false,
  newList: false,
  refreshing: false,
};

function filterData(state, action) {
  const copyData = {...state.data};
  copyData.data = state.data.data.filter(item => item.id !== action.payload);
  return copyData;
}

function appendData(state, action) {
  const copyData = {...state.data};
  copyData.data = [action.payload, ...copyData.data];
  return copyData;
}

export function reducerList(state: any, action: any) {
  switch (action.type) {
    case 'DATA':
      return {...state, data: action.payload};
    case 'DELETE_LIST':
      return {
        ...state,
        itemToDelete: action.payload,
      };
    case 'REMOVE_ITEM_TO_ITEM':
      return {
        ...state,
        data: filterData(state, action),
        itemToDelete: null,
      };

    case 'ADD_ITEM_TO_LIST':
      return {
        ...state,
        data: appendData(state, action),
        itemToDelete: null,
      };
  }
}
