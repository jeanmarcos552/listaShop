import {NavigationScreenProp} from 'react-navigation';
import {ApiResponseWithPaginate} from './api';

export type PayloadItem = {
  id: number;
  name: string;
  ativo: true;
  created_at: string;
  updated_at: string;
  un: string;
};

export interface PayloadIndexItem extends ApiResponseWithPaginate {
  data: PayloadItem[];
}

export interface StoreItems {
  name: string;
  un: UnidadeStoreItem;
}

export type UnidadeStoreItem = 'UN' | 'KG' | 'PAR';

export interface PropsComponente {
  route: {
    params: {
      item: {
        id: number;
        title: string;
      };
    };
  };
  navigation: NavigationScreenProp<any, any>;
}
