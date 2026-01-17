---
title: github-copilot反代
published: 2026-01-17
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---

## 起因
up在使用`Claude code`之后，觉得这种CLI工具比IDE中的AI工具更好用一点`(｡･ω･｡)ﾉ♡`，于是就想到了github copilot。

`GitHub copilot`就算是free账户也会有大量的免费的限额，而且up还申请了GitHub Student Pack，可以免费使用GitHub copilot`(≧◡≦) ♡`。

然后就在`GitHub`上找到了`GitHub copilot CLI`这个项目[copilot-api](https://github.com/ericc-ch/copilot-api)

## 简单使用

项目支持docker和本地启动两种方式。项目支持多个参数启动，实现各种额外的功能（例如自定义监听端口，设置发送次数频率上限）

同时，还支持展示`GitHub copilot`的使用情况，例如剩余的请求次数等。

```
copilot-api.cmd check-usage
```

或者访问`https://ericc-ch.github.io/copilot-api?endpoint=http://localhost:4141/usage`查看使用情况。

在`~/.claude`文件夹中的`settings.json`文件中，添加以下配置
```json
    "ANTHROPIC_BASE_URL": "http://localhost:4141",
    "ANTHROPIC_AUTH_TOKEN": "dummy",//任意的“token”都行
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4.5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4.5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4.5",
```
然后就可以愉快地使用`GitHub copilot`反代出来的`claude`了`(≧▽≦)/`

## 疑问╰(*°▽°*)╯
copilot在vscode中的上下文似乎是被限制在了`128K`，那么copilot-api反代出来的claude应该也是有这个限制的`(＃°Д°)`。

> [!important]
> 给项目原作者点个star吧，我只是发现并分享了它`(｡･ω･｡)ﾉ♡`·