package com.mlkit.baidu.facedetector;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.PixelFormat;
import android.graphics.Rect;
import android.hardware.Camera;
import android.os.Build;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.baidu.idl.face.platform.FaceSDKManager;
import com.baidu.idl.face.platform.FaceStatusNewEnum;
import com.baidu.idl.face.platform.IDetectStrategy;
import com.baidu.idl.face.platform.IDetectStrategyCallback;
import com.baidu.idl.face.platform.model.ImageInfo;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.io.IOException;
import java.util.HashMap;

public class BaiduFaceDetectorViewManager extends SimpleViewManager<View> implements Camera.PreviewCallback,
  SurfaceHolder.Callback, IDetectStrategyCallback {
  public static final String REACT_CLASS = "BaiduFaceDetectorView";

  private SurfaceView surfaceView;
  private FrameLayout frameLayout;
  private Camera camera;
  private IDetectStrategy detectStrategy;

  @Override
  @NonNull
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  @NonNull
  public View createViewInstance(ThemedReactContext reactContext) {
    surfaceView = new SurfaceView(reactContext);
    frameLayout = new FrameLayout(reactContext);
    frameLayout.setClipChildren(true);
    frameLayout.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
    SurfaceHolder surfaceHolder = surfaceView.getHolder();
    surfaceHolder.setSizeFromLayout();
    surfaceHolder.addCallback(this);
    frameLayout.addView(surfaceView);
    if (hasCameraPermissions(reactContext)) {
      camera = Camera.open(Camera.CameraInfo.CAMERA_FACING_FRONT);
      surfaceHolder.setKeepScreenOn(true);
    }
    detectStrategy = FaceSDKManager.getInstance().getDetectStrategyModule();
    detectStrategy.setPreviewDegree(90);
    return frameLayout;
  }

  @Override
  public void onPreviewFrame(byte[] bytes, Camera camera) {
    detectStrategy.detectStrategy(bytes);
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {
    if (camera == null) {
      return;
    }
    try {
      camera.setDisplayOrientation(90);
      camera.setPreviewDisplay(surfaceHolder);
      camera.setPreviewCallback(this);
      camera.startPreview();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int format, int width, int height) {
    Camera.Size size = camera.getParameters().getPreviewSize();
    Rect rect = new Rect(0, 0, size.width, size.height);
    detectStrategy.setDetectStrategyConfig(rect, rect, this);
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    surfaceHolder.removeCallback(this);
  }

  private boolean hasCameraPermissions(Context context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      int result = ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA);
      return result == PackageManager.PERMISSION_GRANTED;
    } else {
      return true;
    }
  }

  @Override
  public void onDetectCompletion(FaceStatusNewEnum status, String message, HashMap<String, ImageInfo> crop, HashMap<String, ImageInfo> src) {
    Log.i("detect", String.format("status: %s. message: %s", status, message));
  }
}
