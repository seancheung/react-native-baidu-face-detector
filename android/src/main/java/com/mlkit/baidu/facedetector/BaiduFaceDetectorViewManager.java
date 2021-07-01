package com.mlkit.baidu.facedetector;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.hardware.Camera;
import android.os.Build;
import android.view.Gravity;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.io.IOException;

public class BaiduFaceDetectorViewManager extends SimpleViewManager<View> implements Camera.PreviewCallback,
SurfaceHolder.Callback {
    public static final String REACT_CLASS = "BaiduFaceDetectorView";

    private SurfaceHolder surfaceHolder;
    private Camera camera;

    @Override
    @NonNull
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    @NonNull
    public View createViewInstance(ThemedReactContext reactContext) {
        SurfaceView surface = new SurfaceView(reactContext);
        FrameLayout frameLayout = new FrameLayout(reactContext);
        frameLayout.setClipChildren(true);
        frameLayout.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(240,240, Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL);
        surface.setLayoutParams(params);
        surfaceHolder = surface.getHolder();
        surfaceHolder.setSizeFromLayout();
        surfaceHolder.addCallback(this);
        if(hasCameraPermissions(reactContext)) {
          camera = Camera.open(0);
        }
        frameLayout.addView(surface);
        return frameLayout;
    }

  @Override
  public void onPreviewFrame(byte[] bytes, Camera camera) {
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {
    try {
      camera.setPreviewDisplay(surfaceHolder);
      camera.setPreviewCallback(this);
      camera.startPreview();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {

  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {

  }

  private boolean hasCameraPermissions(Context context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      int result = ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA);
      return result == PackageManager.PERMISSION_GRANTED;
    } else {
      return true;
    }
  }
}
