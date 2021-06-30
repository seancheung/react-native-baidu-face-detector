import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { authorize } from 'react-native-baidu-face-detector';

authorize('mlkit-example')
  .then((res) => console.log('授权结果', res))
  .catch((e) => console.error('授权异常', e));

AppRegistry.registerComponent(appName, () => App);
