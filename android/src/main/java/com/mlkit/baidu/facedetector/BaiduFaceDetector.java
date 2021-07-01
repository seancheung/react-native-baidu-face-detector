package com.mlkit.baidu.facedetector;

import androidx.annotation.NonNull;

import com.baidu.idl.face.platform.FaceSDKManager;
import com.baidu.idl.face.platform.listener.IInitCallback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = BaiduFaceDetector.NAME)
public class BaiduFaceDetector extends ReactContextBaseJavaModule {
  public static final String NAME = "BaiduFaceDetector";

  private boolean mReady;

  public BaiduFaceDetector(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void init(String licenseId, String licenseName, String suffix, Promise promise) {
    FaceSDKManager.getInstance().initialize(getReactApplicationContext(), licenseId, licenseName, new IInitCallback() {
      @Override
      public void initSuccess() {
        mReady = true;
        promise.resolve(true);
      }

      @Override
      public void initFailure(int i, String s) {
        mReady = false;
        promise.reject("E_INIT_" + i, s);
      }
    });
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean canWork() {
    return mReady;
  }
}
