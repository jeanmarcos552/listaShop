import React, {useCallback, useEffect, useReducer, useState} from 'react';

import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {Alert, RefreshControl, View} from 'react-native';

import moment from 'moment';

import {Button, ProgressBar} from 'react-native-paper';

import Empty from '../../Components/Empty';

import HeaderLayout from '../../Layout/Header';
import TemplateDefault from '../../Layout/Default';

import SkeletonListitem from './skeleton';
import FormList from './FormList';
import ShareList from './AddUserToList';

import {withTheme} from 'styled-components/native';

import {ItemsRequest, ProviderItems} from '../../types/list';

import {
  ContainerList,
  ItemList,
  ShoppingList,
  ValueText,
  ItemListText,
  ContainerText,
  IconText,
  ProgressBarView,
  FooterLoop,
  TextRightFooter,
  ViewDeleteItem,
  TextDeleteItem,
  ViewAction,
  ViewHeader,
  TextHeader,
  ContainerDialog,
} from './style';

import {fetchData} from '../../store/actions/list/fetchData';
import {initalList, reducerList} from '../../store/reducers/list';
import DialogComponent from '../../Components/Dialog';
import {removeList} from '../../store/actions/list/removeList';
import {useAuth} from '../../hooks/auth';

function somaValoresItens(pivot: ProviderItems) {
  if (!pivot) {
    return 0;
  }
  return pivot.itens
    .map((item: ItemsRequest) => item.pivot)
    .map((prev: any) => +prev.qty * +prev.value)
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2)
    .replace('.', ',');
}

function calcItensCheckt(provider: ProviderItems) {
  let itensChecked = provider?.itens?.filter(
    item => item.pivot.status === true,
  );
  return itensChecked.length / provider?.itens?.length || 0;
}

const List = ({theme}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const [{data, refreshing, itemToDelete}, dispatch] = useReducer(
    reducerList,
    initalList,
  );
  const [dialogo, setDialogo] = useState(false);
  const {user} = useAuth();

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  function handleSeeItem(dado: ItemsRequest) {
    navigate.navigate('ItemsList', {
      id: dado.id,
      title: dado.name,
    });
  }

  function DisplayIconsByStatus(provider: ProviderItems) {
    return (
      <IconText
        name={calcItensCheckt(provider) === 1 ? 'check-circle' : 'clock'}
        color={
          calcItensCheckt(provider) !== 1
            ? theme.colors.warning
            : theme.colors.success
        }
        size={18}
      />
    );
  }

  const handleDelete = useCallback(async () => {
    const resp = await removeList(dispatch, itemToDelete);
    Alert.alert('Atenção', String(resp));
  }, [itemToDelete]);

  useEffect(() => {
    setDialogo(!!itemToDelete);
  }, [itemToDelete]);

  useFocusEffect(
    useCallback(() => {
      fetchData(dispatch);
    }, []),
  );

  return (
    <TemplateDefault
      header={<HeaderLayout />}
      loadingComponent={<SkeletonListitem />}
      loading={!data.data}>
      <>
        <DialogComponent
          setVisible={setDialogo}
          visible={dialogo}
          title="Deletar essa lista?">
          <ContainerDialog>
            <Button
              mode="elevated"
              textColor={theme.colors.secondary}
              onPress={() => dispatch({type: 'DELETE_LIST', payload: null})}>
              Não
            </Button>
            <Button
              mode="contained"
              buttonColor={theme.colors.danger}
              textColor="#fff"
              onPress={handleDelete}>
              Sim
            </Button>
          </ContainerDialog>
        </DialogComponent>

        <ShoppingList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} />}
          data={data?.data}
          ListEmptyComponent={
            <Empty
              text="Você ainda não tem nenhuma lista :("
              action={() => setModalVisible(true)}
            />
          }
          ListFooterComponent={<View style={{marginBottom: 80}} />}
          ListHeaderComponent={
            <ViewHeader>
              <TextHeader>Listas</TextHeader>
            </ViewHeader>
          }
          renderItem={({item: provider}: any) => (
            <ContainerList>
              <ItemList onPress={() => handleSeeItem(provider)}>
                <ContainerText>
                  <ItemListText>{provider.name}</ItemListText>
                  <DisplayIconsByStatus {...provider} theme={theme} />
                </ContainerText>
                <ValueText>R$ {somaValoresItens(provider)}</ValueText>
              </ItemList>
              <ProgressBarView>
                <ProgressBar
                  style={{height: 7, borderRadius: 5}}
                  progress={calcItensCheckt(provider)}
                  color={theme.colors.primary}
                />
              </ProgressBarView>
              <FooterLoop>
                <TextRightFooter>
                  {moment(provider.created_at).format('DD/MM')}
                </TextRightFooter>
                {user.id === provider.created_by && (
                  <ViewAction>
                    <ViewDeleteItem
                      onPress={() =>
                        dispatch({type: 'DELETE_LIST', payload: provider.id})
                      }>
                      <TextDeleteItem name="trash" size={18} />
                    </ViewDeleteItem>

                    <ShareList key={provider.id} provider={provider} />
                  </ViewAction>
                )}
              </FooterLoop>
            </ContainerList>
          )}
          keyExtractor={(provider: any) => provider.id.toString()}
        />
        <FormList
          dispatch={dispatch}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </>
    </TemplateDefault>
  );
};

export default withTheme(List);
