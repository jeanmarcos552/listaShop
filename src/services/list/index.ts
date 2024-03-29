import {AxiosResponse} from 'axios';
import {PayloadList, PropLista, StoreList, UpdateList} from '../../types/list';
import api, {displayError, mountErro} from '../api';

export async function indexList(): Promise<AxiosResponse<PayloadList>> {
  try {
    const response = await api.get('/lista').catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

export async function showList(id: number): Promise<AxiosResponse<PropLista>> {
  try {
    const response = await api.get(`/lista/${id}`).catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

export async function storeList({body}: StoreList): Promise<PayloadList> {
  try {
    const response = await api.post('/lista', {...body}).catch(erro => {
      throw Error(mountErro(erro));
    });

    return response;
  } catch (error: unknown) {
    return displayError(error);
  }
}

export async function updateList({body, id}: UpdateList): Promise<string> {
  try {
    const {data} = await api.put(`/lista/${id}`, {...body}).catch(erro => {
      throw Error(mountErro(erro));
    });

    return data;
  } catch (error: unknown) {
    return displayError(error);
  }
}

export async function deleteList(id: number): Promise<string> {
  try {
    const {data} = await api.delete(`/lista/${id}`).catch(erro => {
      throw Error(mountErro(erro));
    });

    return data;
  } catch (error: unknown) {
    return displayError(error);
  }
}
