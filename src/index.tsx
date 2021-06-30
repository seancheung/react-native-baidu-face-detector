import {
  requireNativeComponent,
  ViewStyle,
  NativeModules,
  Platform,
} from 'react-native';

type FaceDetectorProps = {
  color: string;
  style: ViewStyle;
};

export const FaceDetectorView = requireNativeComponent<FaceDetectorProps>(
  'BaiduFaceDetectorView'
);

const { BaiduFaceDetector } = NativeModules;

/**
 * 初始化SDK授权
 * @param appName 应用名称
 */
export async function initLicense(appName: string): Promise<boolean>;
/**
 * 初始化SDK授权
 * @param licenseName 证书名称
 * @param licenseId 证书ID
 * @param suffix 后缀
 * @returns 是否授权成功
 */
export async function initLicense(
  licenseId: string,
  licenseName: string,
  suffix: string
): Promise<boolean>;
export async function initLicense(
  licenseId: string,
  licenseName?: string,
  suffix?: string
): Promise<boolean> {
  if (licenseName === undefined && suffix === undefined) {
    licenseName = 'idl-license';
    suffix = Platform.select({
      android: 'face-android',
      ios: 'face-ios',
    });
    licenseId += '-' + suffix;
  }
  return BaiduFaceDetector.init(licenseId, licenseName, suffix);
}

export default FaceDetectorView;
