# GLM Claude Assistant 设置指南

这个项目配置了自定义的GitHub Actions工作流，使用GLM-4.6 API来实现在GitHub Issue和PR中通过@claude与AI助手对话的功能。

## 功能特性

- 🤖 在Issue或PR评论中使用`@claude`触发AI回复
- 🔍 自动获取项目上下文（README、CLAUDE.md、最近的代码变更）
- 💬 支持连续对话和上下文理解
- ⚡ 基于GLM-4.6模型的快速响应

## 配置步骤

### 1. 设置GitHub Secrets

在仓库设置中添加以下Secrets：

1. `GLM_API_KEY`: 您的GLM-4.6 API密钥
2. `GLM_BASE_URL`: GLM API的基础URL（可选，默认为智谱AI官方API）

### 2. 配置API密钥

1. 访问您的GLM API提供商获取API密钥
2. 在GitHub仓库中，进入 `Settings` > `Secrets and variables` > `Actions`
3. 点击 `New repository secret`
4. 添加以下secrets：
   - **GLM_API_KEY**: 您的GLM API密钥
   - **GLM_BASE_URL**: GLM API端点（如果需要自定义）

### 3. 工作流配置

工作流文件位于 `.github/workflows/claude-glm.yml`，配置了：

- 触发条件：Issue评论、PR评论
- 权限设置：读取内容、写入评论
- 参数配置：最大token数、温度等

### 4. 项目规范文件（可选）

在项目根目录创建`CLAUDE.md`文件，定义：

```markdown
# 项目规范

## 代码风格
- 使用TypeScript
- 遵循ESLint规则
- 使用Prettier格式化

## 提交规范
- 使用Conventional Commits格式
- feat: 新功能
- fix: Bug修复
- docs: 文档更新

## 项目结构
- src/: 源代码
- tests/: 测试文件
- docs/: 文档

## 开发指南
- 先写测试，再写实现
- 代码覆盖率要求80%以上
```

## 使用方法

1. 在任何Issue或PR中发表评论，包含`@claude`
2. 等待几秒钟，AI助手会自动回复
3. 可以继续对话，助手会理解上下文

### 示例用法

```
@claude 这个函数有什么问题吗？请帮我检查一下代码质量
```

```
@claude 能帮我写一个单元测试吗？测试这个组件的渲染功能
```

```
@claude 我遇到了一个bug，页面在移动端显示不正常，你能帮我看看吗？
```

## 工作流逻辑

1. **触发检测**: 监听Issue和PR的评论事件
2. **内容过滤**: 检查评论是否包含@claude
3. **上下文收集**:
   - 读取README文件
   - 读取CLAUDE.md项目规范
   - 获取最近的代码变更（如果是PR）
   - 获取最近的评论历史
4. **API调用**: 将上下文和用户问题发送给GLM-4.6
5. **回复发布**: 将AI回复发布到评论中

## 自定义配置

可以修改 `.github/workflows/claude-glm.yml` 中的参数：

```yaml
env:
  MAX_TOKENS: 2000      # 最大生成token数
  TEMPERATURE: 0.7      # 生成随机性（0-1）
  GLM_BASE_URL: ''      # 自定义API端点
```

## 故障排除

### 1. 工作流没有触发
- 检查评论中是否包含`@claude`
- 确认GitHub Actions权限设置正确
- 查看Actions页面的错误日志

### 2. API调用失败
- 验证GLM_API_KEY是否正确设置
- 检查API密钥是否有足够的配额
- 确认GLM_BASE_URL是否正确（如果自定义了）

### 3. 权限错误
- 确认GITHUB_TOKEN有写入评论的权限
- 检查仓库的Actions权限设置

## 高级功能

### 支持的触发事件
- `issue_comment`: Issue评论
- `pull_request_review_comment`: PR代码评论
- `pull_request`: PR打开或更新

### 自动回复格式
助手会自动在回复前添加：
- 🤖 **@claude 回复** 标识
- 由 GLM-4.6 提供支持 的说明

这样可以清楚地标识这是AI助手的回复。

## 安全注意事项

- API密钥通过GitHub Secrets安全存储
- 工作流只能读取仓库内容和写入评论
- 不会泄露任何敏感信息给第三方服务

## 成本控制

- 设置合理的MAX_TOKENS限制
- 调整TEMPERATURE参数控制输出质量
- 监控API使用情况避免超限

---

现在您就可以在GitHub Issue和PR中使用`@claude`来获得AI助手的帮助了！