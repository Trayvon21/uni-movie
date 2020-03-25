# uni-app 多平台电影预告项目

## 项目简介

- 首页
- 搜索
- 详情页
  - 图片预览
- 我的
  - 登录注册
  - 用户信息管理
    - 头像上传、预览与下载
    - 昵称修改
    - 生日修改
    - 性别修改

## 关键点

- 请求数据的格式化与header内容添加
  > uniapp默认数据类型为`application/json`，如果需要query传参的话需要传入header`'Content-Type': 'application/x-www-form-urlencoded'`

- 实现微信小程序、手机app、H5三平台兼容
  > 主要配置`pages.json`,再利用uni-app的条件编译功能进行多平台兼容
- app端第三方软件授权登录
  > 利用`uni.login`去调取第三方软件的授权，获取头像，名称和id。

- 图片上传、预览与下载
  > `uni.chooseImage`获取相册中的图片，并保存至本地缓存中，再利用`uni.uploadFile`调取图片接口，将图片上传至服务器，
  > 下载图片利用`uni.downloadFile`将图片保存至本地缓存，再使用`uni.saveImageToPhotosAlbum`将本地缓存的照片保存至手机相册

- 自定义导航栏的高度自适应
  > `uni.getSystemInfo`获取当前屏幕的statusBarHeight，来控制自定义导航栏的高度`that.windowHeight = res.windowHeight - res.statusBarHeight - 52`
