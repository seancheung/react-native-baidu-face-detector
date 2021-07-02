import * as React from 'react';

import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FaceDetectorView from 'react-native-baidu-face-detector';
import { check, PERMISSIONS, request } from 'react-native-permissions';

const CameraPermission = Platform.select({
  android: PERMISSIONS.ANDROID.CAMERA,
  default: PERMISSIONS.IOS.CAMERA,
});
type CameraState = 'unavailable' | 'blocked' | 'denied' | 'granted' | 'limited';

const SIZE = 300;

export default function App() {
  const [granted, setGranted] = React.useState<boolean>();

  const handleState = React.useCallback((state: CameraState) => {
    switch (state) {
      case 'blocked':
      case 'unavailable':
        setGranted(false);
        break;
      case 'granted':
      case 'limited':
        setGranted(true);
        break;
      case 'denied':
        request(CameraPermission).then(handleState);
        break;
    }
  }, []);

  React.useEffect(() => {
    check(CameraPermission).then(handleState);
  }, [handleState]);

  if (granted === undefined) {
    return null;
  }
  if (!granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Linking.openSettings()}>
          <Text>开启相机权限</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.clip}>
        <FaceDetectorView
          style={styles.camera}
          onDetect={(e) => {
            console.log(e.nativeEvent);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clip: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  camera: {
    width: SIZE,
    height:
      SIZE *
      Platform.select({
        ios: 4 / 3,
        default: 16 / 9,
      }),
  },
});
