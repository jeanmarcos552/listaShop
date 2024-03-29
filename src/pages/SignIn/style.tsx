import {Platform} from 'react-native';
import styled from 'styled-components/native';

import {getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  height: 100%;
`;

export const Title = styled.Text`
  font-family: 'Exo-Regular';
  color: #fff;
  font-size: 24px;
  margin: 60px 0 20px;
`;

export const Image = styled.ImageBackground`
  width: 100%;
  height: 45px;
`;

export const ForgetPassword = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const ForgetPasswordText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Exo-Regular';
`;

export const CreatAccount = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  border-top-width: 1px;
  border-color: #029e6a;
  background: #029e6a;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const CreatAccountText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Exo-SemiBold';
`;

export const IconText = styled.View`
  margin-right: 10px;
`;
