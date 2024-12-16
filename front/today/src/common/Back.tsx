// Back.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components/native';

const StyledBtn = styled.TouchableOpacity`
  align-self: center;
  padding: 10px 15px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mainPink};
`;

const StyledText = styled.Text`
  text-align: center;
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSize.medium};
  color: white;
`;

function Back() {
  const navigation = useNavigation();

  return (
    <StyledBtn onPress={() => navigation.goBack()}>
      <StyledText>←</StyledText>
    </StyledBtn>
  );
}

export default Back;
