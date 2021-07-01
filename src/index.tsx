import {
  requireNativeComponent,
  ViewStyle,
  NativeModules,
  Platform,
  StyleProp,
} from 'react-native';

export interface FaceDetectorProps {
  style?: StyleProp<ViewStyle>;
  /**
   * 预测库耗能模式
   * @default 0
   */
  litePower?: number;
  /**
   * 需要检测的最大人脸数目
   * @default 1
   */
  maxDetectNum?: number;
  /**
   * 需要检测的最小人脸大小
   * @default 40
   */
  minFaceSize?: number;
  /**
   * 人脸置信度阈值
   * @description 检测分值大于该阈值认为是人脸
   * @default 0.5
   */
  notFaceThreshold?: number;
  /**
   * 质量检测遮挡阈值
   * @default 0.5
   */
  occluThreshold?: number;
  /**
   * 质量检测光照阈值
   * @default 100
   */
  illumThreshold?: number;
  /**
   * 质量检测模糊阈值
   * @default 0.5
   */
  blurThreshold?: number;
  /**
   * 姿态检测阈值
   * @default {pitch: 12, yaw: 12, row: 10}
   */
  eulurAngleThrPitch?: Eulur;
  /**
   * 输出图像个数
   * @default 3
   */
  maxCropImageNum?: number;
  /**
   * 输出图像宽，设置为有效值(大于0)则对图像进行缩放，否则输出原图抠图结果
   * @default 480
   */
  cropFaceSizeWidth?: number;
  /**
   * 输出图像高，设置为有效值(大于0)则对图像进行缩放，否则输出原图抠图结果
   * @default 680
   */
  cropFaceSizeHeight?: number;
  /**
   * 输出图像，下巴扩展，大于等于0，0：不进行扩展
   * @default 0.1
   */
  cropChinExtend?: number;
  /**
   * 输出图像，额头扩展，大于等于0，0：不进行扩展
   * @default 0.2
   */
  cropForeheadExtend?: number;
  /**
   * 输出图像，人脸框与背景比例，大于等于1，1：不进行扩展
   * @default 1.5
   */
  cropEnlargeRatio?: number;
  /**
   * 动作超时配置
   */
  conditionTimeout?: number;
  /**
   * 语音间隔提醒配置
   */
  intervalOfVoiceRemind?: number;
  /**
   * 是否开启静默活体
   * @default false
   */
  isCheckSilentLive?: number;
  /**
   * 口罩检测阈值配置
   * @description 大于阈值判定为戴口罩，低于阈值判定为未戴口罩
   * @default 0.8
   */
  mouthMaskThreshold?: number;
  /**
   * 原始图片缩放比例，阈值0~1
   * @default 1
   */
  imageWithScale?: number;
  /**
   * 图片加密类型，type=0 基于base64 加密；type=1 基于百度安全算法加密
   */
  ImageEncrypteWithType?: number;
  /**
   * 人脸过远框比例
   * @default 0.4
   */
  minRect?: number;
  /**
   * 人脸检测完成事件
   */
  onFaceDetected?: (res: any) => void;
}
export interface Eulur {
  pitch: number;
  yaw: number;
  roll: number;
}

export const FaceDetectorView = requireNativeComponent<FaceDetectorProps>(
  'BaiduFaceDetectorView'
);

const { BaiduFaceDetector } = NativeModules;

/**
 * 初始化SDK授权
 * @param appName 应用名称
 */
export async function authorize(appName: string): Promise<boolean>;
/**
 * 初始化SDK授权
 * @param licenseId 证书ID
 * @param licenseName 证书名称
 * @param suffix 后缀
 * @returns 是否授权成功
 */
export async function authorize(
  licenseId: string,
  licenseName: string,
  suffix: string
): Promise<boolean>;
export async function authorize(
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
    if (Platform.OS === 'android') {
      licenseName += '.' + suffix;
    }
    licenseId += '-' + suffix;
  }
  return BaiduFaceDetector.init(licenseId, licenseName, suffix);
}

/**
 * 判断SDK是否准备完成
 * @returns 是否可用
 */
export function isReady(): boolean {
  return BaiduFaceDetector.canWork();
}

/**
 * 初始化SDK
 */
export function init() {
  BaiduFaceDetector.initCollect();
}

/**
 * 释放SDK
 */
export function release() {
  BaiduFaceDetector.uninitCollect();
}

export default FaceDetectorView;
