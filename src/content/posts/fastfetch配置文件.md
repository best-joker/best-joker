---
title: fastfetch配置文件
published: 2025-12-21
description: ''
image: ''
tags: [终端,fastfetch,配置]
category: '技术分享'
draft: false 
lang: ''
---

## 配置文件

fastfetch的配置文件位于`~/.config/fastfetch/config.jsonc` `(｡･ω･｡)ﾉ♡`

up使用的是通过winget包管理工具安装的fastfetch。在`C:\Users\用户名\AppData\Local\Microsoft\WinGet\Packages`目录下找到fastfetch的文件，其中有很多自带的样式，大家可以自行尝试查看哪一个适合自己哦~ (≧◡≦)

在`C:\Users\用户名\.config`目录下，创建fastfetch文件夹，将fastfetch的配置文件复制到`C:\Users\用户名\.config\fastfetch\config.jsonc`目录下，即可自定义fastfetch的显示样式。`(≧▽≦)/`

## 小彩蛋`(づ｡◕‿‿◕｡)づ`来喽~

fastfetch的logo支持自定义，例如我的`logo.txt`文件如下：

```
⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⣸⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⠀⠀⠀⠀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⢀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣
```

我将它命名为`logo.txt`,在配置文件中修改logo部分`(✿^‿^)`

```jsonc
"logo": {
    "type": "auto",
    // "source": "arch",
    "source": "C:/Users/17775/.config/fastfetch/logo.txt",
    "color": {
        "1": "magenta"  //使用自定义的logo颜色
    },
    "padding": {
        "left": 2
    }
},
```

然后运行fastfetch，即可看到自定义的logo啦！`(≧◡≦) ♡`