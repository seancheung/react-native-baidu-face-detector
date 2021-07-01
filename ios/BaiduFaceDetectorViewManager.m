#import <React/RCTViewManager.h>
#import "VideoCaptureDevice.h"

@interface BaiduFaceDetectorViewManager : RCTViewManager
@property (nonatomic, readwrite, assign) BOOL hasFinished;
@property (nonatomic, readwrite, retain) UIImageView *preview;
@end

@interface BaiduFaceDetectorViewManager () <CaptureDataOutputProtocol>
@property (nonatomic, readwrite, retain) VideoCaptureDevice *videoCapture;
@end

@implementation BaiduFaceDetectorViewManager

RCT_EXPORT_MODULE(BaiduFaceDetectorView)

- (UIView *)view
{
  CGRect rect = CGRectMake(0, 0, 240, 240);
  UIImageView* image = [[UIImageView alloc] initWithFrame:rect];
  image.contentMode = UIViewContentModeScaleAspectFill;
  self.videoCapture = [[VideoCaptureDevice alloc] init];
  self.videoCapture.delegate = self;
  _hasFinished = NO;
  self.videoCapture.runningStatus = YES;
  [self.videoCapture startSession];
  UIView* view = [[UIView alloc] init];
  [view addSubview:image];
  self.preview = image;
  view.clipsToBounds = YES;
  return view;
}

- (void)captureOutputSampleBuffer:(UIImage *)image {
    if (_hasFinished) {
        return;
    }
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        weakSelf.preview.image = image;
    });
    // TODO: process image
}

- (void)captureError {
    NSString *errorStr = @"出现未知错误，请检查相机设置";
    AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if(authStatus == AVAuthorizationStatusRestricted || authStatus == AVAuthorizationStatusDenied){
        errorStr = @"相机权限受限,请在设置中启用";
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        UIAlertController* alert = [UIAlertController alertControllerWithTitle:nil message:errorStr preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction* action = [UIAlertAction actionWithTitle:@"知道啦" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
            NSLog(@"知道啦");
        }];
        [alert addAction:action];
    });
}

@end
