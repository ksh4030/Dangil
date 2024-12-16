import { Pressable, Text } from 'react-native';

interface LogoProp {
  onPress: () => void;
}

function Logo({ onPress }: LogoProp) {
  return (
    <Pressable onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'title', fontSize: 38 }}>당일</Text>
    </Pressable>
  );
}

export default Logo;
