# react-native-baidu-face-detector

Baidu Face SDK for React Native

## Installation

```sh
yarn add react-native-baidu-face-detector
```

### Android

Add permissions/features to _android/app/src/main/AndroidManifest.xml_

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.hardware.camera.autofocus" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
<uses-permission android:name="android.permission.WRITE_SETTINGS" />

<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.front" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

Add service/receiver to _android/app/src/main/AndroidManifest.xml_

```xml
<application>
  <!-- ... -->
  <receiver android:name="com.baidu.liantian.LiantianReceiver" android:exported="false">
    <intent-filter>
      <action android:name="com.baidu.action.Liantian.VIEW" />
      <category android:name="com.baidu.category.liantian"/>
      <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
    <intent-filter android:priority="2147483647">
      <action android:name="android.intent.action.BOOT_COMPLETED"/>
    </intent-filter>
  </receiver>
  <provider android:authorities="com.mlkit.example.liantian.ac.provider" android:name="com.baidu.liantian.LiantianProvider" android:exported="true"/>
  <service
    android:name="com.baidu.liantian.LiantianService"
    android:exported="false">
    <intent-filter>
      <action android:name="com.baidu.action.Liantian.VIEW" />
      <category android:name="com.baidu.category.liantian"/>
      <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
  </service>
</application>
```

Add _idl-license.face-android_ to _android/app/src/main/assets_

### iOS

Add Camera usage description.

```xml
<dict>
  <key>NSCameraUsageDescription</key>
  <string>Camera Usage</string>
</dict>
```

Add _idl-license.face-ios_ file to xcode project.

## Usage

```jsx
import {
  initLicense,
  FaceDetectorView,
} from 'react-native-baidu-face-detector';

// ...

initLicense('app-name');

const Detector = <FaceDetectorView style={{ flex: 1 }} />;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
