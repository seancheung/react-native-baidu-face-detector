#import "BaiduFaceDetector.h"
#import "IDLFaceSDK/IDLFaceSDK.h"

@implementation BaiduFaceDetector

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(init:(NSString *)licenseId
                 licenseName:(NSString *)licenseName
                 suffix:(NSString *)suffix
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString* licensePath = [[NSBundle mainBundle] pathForResource:licenseName ofType:suffix];
  @try {
    if (![[NSFileManager defaultManager] fileExistsAtPath:licensePath]) {
        reject(@"E_INIT_FAILED", [NSString stringWithFormat:@"The license file does not exists at path `%@`.", licensePath], nil);
    } else {
        [[FaceSDKManager sharedInstance] setLicenseID:licenseId andLocalLicenceFile:licensePath andRemoteAuthorize:true];
        BOOL success = [[FaceSDKManager sharedInstance] canWork];
        resolve(@[@(success)]);
    }
  } @catch (NSException *ex) {
      reject(@"E_INIT_FAILED", [ex description], nil);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(canWork)
{
  return @[@([[FaceSDKManager sharedInstance] canWork])];
}

RCT_EXPORT_METHOD(initCollect)
{
  [[FaceSDKManager sharedInstance] initCollect];
}

RCT_EXPORT_METHOD(uninitCollect)
{
  [[FaceSDKManager sharedInstance] uninitCollect];
}

@end
