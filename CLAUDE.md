# 项目规范 - Best Joker Blog

## 项目概述
这是一个基于Astro框架的个人博客项目，部署在GitHub Pages上。

## 技术栈
- **框架**: Astro 4.x
- **包管理器**: pnpm
- **Node.js版本**: 22, 23
- **部署**: GitHub Pages
- **代码质量**: Biome
- **样式**: Tailwind CSS

## 项目结构
```
best-joker-blog/
├── src/
│   ├── components/     # Astro组件
│   ├── content/        # Markdown内容
│   ├── layouts/        # 页面布局
│   └── pages/          # 页面文件
├── public/             # 静态资源
├── docs/               # 文档
└── .github/            # GitHub配置
```

## 代码风格
- 使用TypeScript进行类型安全
- 遵循Biome配置的代码格式化规则
- 组件命名使用PascalCase
- 文件命名使用kebab-case

## 提交信息规范
使用Conventional Commits格式：
- `feat:` 新功能
- `fix:` Bug修复
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `chore:` 构建过程或辅助工具的变动

## 内容管理
- 博客文章存放在`src/content/blog/`目录
- 使用Front Matter定义文章元数据
- 支持Markdown和MDX格式

## 性能优化
- 图片使用Astro的Image优化
- 启用代码分割和懒加载
- 优化SEO设置和meta标签

## 安全要求
- 用户输入必须进行验证和清理
- 避免XSS攻击
- 使用HTTPS协议

## 测试要求
- 关键功能需要编写测试
- 确保响应式设计在不同设备上正常工作
- 检查可访问性标准

## 部署流程
1. 推送到master分支触发自动部署
2. GitHub Actions进行构建和测试
3. 自动部署到GitHub Pages

## AI助手回复指南
当用户@claude时，请：
1. 分析用户问题的具体需求
2. 基于项目技术栈提供解决方案
3. 提供可执行的代码示例
4. 考虑项目的最佳实践
5. 保持回复简洁明了

## 常见问题处理
- **构建问题**: 检查Node.js版本和依赖
- **样式问题**: 检查Tailwind配置
- **部署问题**: 查看GitHub Actions日志
- **性能问题**: 使用Astro的优化工具

## 相关链接
- [Astro文档](https://docs.astro.build/)
- [Biome配置](https://biomejs.dev/)
- [GitHub Actions文档](https://docs.github.com/en/actions)