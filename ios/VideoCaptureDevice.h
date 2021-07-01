#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@protocol CaptureDataOutputProtocol;
@interface VideoCaptureDevice : NSObject
@property (nonatomic, readwrite, weak) id<CaptureDataOutputProtocol> delegate;

@property (nonatomic, readwrite, assign) BOOL runningStatus;

@property (nonatomic, readwrite, assign) AVCaptureDevicePosition position;

- (void)startSession;

- (void)stopSession;

- (void)resetSession;

@end

@protocol CaptureDataOutputProtocol <NSObject>

- (void)captureOutputSampleBuffer:(UIImage *)image;

- (void)captureError;

@end
