import Button from '@/components/Button';
import { useDispatch, actions } from '@/store';
import { persistantStorage } from '@/store/persistant';
import { scale } from '@/utils/responsive';
import { StyleSheet, View } from 'react-native';

export default function Scan() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Button
        text="Set Onboarding State To False"
        onPress={() => dispatch(actions.setIsComplete(false))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    justifyContent: 'center',
  },
});
