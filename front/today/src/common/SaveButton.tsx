// SaveButton.tsx
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components/native';

export type SaveButtonProps = {
  viewShotRef: React.RefObject<any>;
};

const SaveButton = ({ viewShotRef }: SaveButtonProps) => {
  const theme = useTheme();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    // 초기 마운트 시 권한 상태를 확인하고 필요시 요청
    (async () => {
      if (!permissionResponse?.granted) {
        await requestPermission();
      }
    })();
  }, []);

  const handleSavePhoto = async () => {
    // 권한 상태를 다시 확인
    if (permissionResponse?.status !== 'granted') {
      await requestPermission();
    }
    if (permissionResponse?.status === 'granted') {
      try {
        const uri = await viewShotRef.current.capture();
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Diary Images', asset, false);
        Alert.alert('저장 성공', '일기 이미지가 갤러리에 저장되었습니다.');
      } catch (error) {
        console.error('이미지 저장 실패:', error);
        Alert.alert('저장 실패', '이미지 저장에 실패했습니다.');
      }
    } else {
      Alert.alert('저장 실패', '갤러리 접근 권한이 필요합니다.');
    }
  };

  return (
    <TouchableOpacity onPress={handleSavePhoto}>
      <Icon name="save" size={25} />
      {/* <Text style={{ color: 'white', fontWeight: '800' }}>저장</Text> */}
    </TouchableOpacity>
  );
};

export default SaveButton;
