// 从 Android11 开始，WRITE_EXTERNAL_STORAGE 权限仅能访问指定媒体文件，且以下申明不再有效（该声明可在 Android10 中临时允许访问全部外部存储。

```shell
android:requestLegacyExternalStorage="true"
```

适配方案为：

1. 添加以下权限申请：

<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" /

2. 动态申请权限（需要用户手动授权）：

```java
// Android11 以上需要申请所有文件访问权限
boolean highPermission = Environment._isExternalStorageManager_();
if (!highPermission) {
  Intent intent = new Intent(Settings._ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION_);
  intent.setData(Uri._fromParts_("package", _context_.getPackageName(), null));
  intent.setFlags(Intent._FLAG_ACTIVITY_NEW_TASK_);
  _context_.startActivity(intent);
}
```
