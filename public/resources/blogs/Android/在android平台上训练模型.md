# 1 通过 chaquopy 运行 python 代码训练、生成模型

> 训练阶段可行，但在最后通过 sklearn2pmml 生成 pmml 文件阶段因为需要调用命令行 java -cp 命令，而 Android 不支持该命令，故而目前看来不可行。

# 2 通过 tensorflowjs 训练、生成模型

> 初期由于 webview 版本较老，可能 tensorflowjs 不支持导致训练不能进行，后期测试 Android11；Webview 83 平台可以支持，测试设备上可能需要更新 Webview 版本才可正常使用。
> 开展机器学习，loss 为 mse，模型保存为 json 文件。
