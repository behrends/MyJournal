import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';

const TouchableItem =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

export default TouchableItem;
