import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import FaceDetectorView, { isReady } from 'react-native-baidu-face-detector';

export default function App() {
  if (!isReady()) {
    return null;
  }
  return (
    <View style={styles.container}>
      <FaceDetectorView style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'red',
    width: 240,
    height: 240,
    borderRadius: 120,
    marginVertical: 20,
  },
});
