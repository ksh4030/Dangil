import styled from 'styled-components/native';

export const BottomNavContainer = styled.View`
  flex-direction: row;
  height: 65px;
  border-top-width: 1px;
  border-color: #EAEAEA;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const IconContainer = styled.TouchableOpacity`
  width: calc(100% / 3);
  height: 100%;
  justify-content: center;
`;
