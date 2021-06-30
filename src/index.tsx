import { requireNativeComponent, ViewStyle } from 'react-native';

type BaiduFaceDetectorProps = {
  color: string;
  style: ViewStyle;
};

export const BaiduFaceDetectorViewManager = requireNativeComponent<BaiduFaceDetectorProps>(
'BaiduFaceDetectorView'
);

export default BaiduFaceDetectorViewManager;
