require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-baidu-face-detector"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/seancheung/react-native-baidu-face-detector.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"
  s.resources = ["ios/BDFaceSDK/com.baidu.idl.face.faceSDK.bundle", "ios/BDFaceSDK/com.baidu.idl.face.model.faceSDK.bundle", "ios/BDFaceSDK/com.baidu.idl.face.live.action.image.bundle", "ios/BDFaceSDK/idl-key.face-ios"]
  s.vendored_frameworks = "ios/BDFaceSDK/IDLFaceSDK.framework"

  s.dependency "React-Core"
end
