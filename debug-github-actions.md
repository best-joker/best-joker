# GitHub Actions 错误排查指南

## 🚨 常见错误类型

### 1. 权限错误
**错误信息**: `Resource not accessible by integration`

**解决方案**:
```yaml
permissions:
  contents: read
  issues: write        # 如果需要在Issue中回复
  pull-requests: write # 如果需要在PR中回复
```

### 2. Secrets 配置错误
**错误信息**: `API key not found or invalid`

**检查方法**:
```yaml
- name: Debug Secrets
  run: |
    if [ -n "${{ secrets.ANTHROPIC_API_KEY }}" ]; then
      echo "✅ API Key is set"
    else
      echo "❌ API Key is missing"
    fi
```

### 3. Action 版本问题
**错误信息**: `Action not found` 或 `Invalid version`

**解决方案**:
```yaml
# 使用具体版本而不是latest
- uses: anthropics/claude-code-action@v1
# 而不是
- uses: anthropics/claude-code-action@latest
```

### 4. 触发条件不匹配
**错误信息**: 工作流不触发

**调试方法**:
```yaml
- name: Print Event Context
  run: |
    echo "Event: ${{ github.event_name }}"
    echo "Action: ${{ github.event.action }}"
    echo "Ref: ${{ github.ref }}"
```

### 5. 网络连接问题
**错误信息**: `Timeout`, `Connection refused`

**测试方法**:
```yaml
- name: Test Network
  run: |
    curl -I https://api.anthropic.com
    curl -I https://github.com
```

## 🔧 调试技巧

### 1. 使用 continue-on-error
```yaml
- name: Risky Step
  uses: some/action@v1
  continue-on-error: true
```

### 2. 输出环境信息
```yaml
- name: Environment Info
  run: |
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    echo "Working directory: $(pwd)"
    echo "Files: $(ls -la)"
```

### 3. 分步调试
```yaml
- name: Step 1 - Basic Setup
  run: echo "Setup complete"

- name: Step 2 - Test Connection
  run: curl -I https://api.anthropic.com

- name: Step 3 - Run Claude Code
  uses: anthropics/claude-code-action@v1
```

## 📋 调试清单

### 触发前检查:
- [ ] 工作流文件语法正确
- [ ] 分支名称匹配（main vs master）
- [ ] 事件类型正确
- [ ] 权限配置充分

### 运行时检查:
- [ ] Secrets 正确配置
- [ ] Action 版本存在
- [ ] 网络连接正常
- [ ] 依赖项可用

### 结果检查:
- [ ] 查看完整日志
- [ ] 检查exit code
- [ ] 验证输出内容
- [ ] 确认副作用（评论、PR等）

## 🚀 快速调试命令

### 查看最近的运行:
```bash
gh run list --limit 5
```

### 查看特定运行的日志:
```bash
gh run view <run-id> --log
```

### 重新运行失败的工作流:
```bash
gh run rerun <run-id>
```

### 取消运行中的工作流:
```bash
gh run cancel <run-id>
```