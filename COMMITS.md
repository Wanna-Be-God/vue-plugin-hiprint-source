# Git 提交信息前缀规范

## 提交类型 (Type)

- `feat` (Feature): 新功能的提交
  - 示例：`feat: add user authentication module`
- `fix` (Fix): 修复 bug 或问题
  - 示例：`fix: resolve crash when user submits empty form`
- `docs` (Documentation): 文档更新或修改
  - 示例：`docs: update installation instructions`
- `style` (Style): 样式修改（不影响代码逻辑）
  - 示例：`style: fix indentation in main.js`
- `refactor` (Refactor): 代码重构（不改变功能）
  - 示例：`refactor: simplify logic in data processing module`
- `test` (Test): 测试相关提交
  - 示例：`test: add unit tests for user service`
- `chore` (Chore): 常规任务（如依赖更新等）
  - 示例：`chore: update dependency versions`
- `perf` (Performance): 性能优化提交
  - 示例：`perf: optimize image loading performance`
- `ci` (Continuous Integration): CI/CD 配置相关提交
  - 示例：`ci: add GitHub Actions for continuous deployment`
- `build` (Build): 构建系统相关提交
  - 示例：`build: update webpack config for production mode`
- `release` (Release): 发布版本提交
  - 示例：`release: v1.2.0`

## 提交信息格式

<type>(<scope>): <message>

- **type**: 提交的类型，如 `feat`、`fix`、`docs` 等
- **scope**: 可选，表示修改的范围，如 `auth`、`ui` 等
- **message**: 描述修改的简短说明

### 示例：

feat(auth): add JWT authentication
fix(ui): resolve button hover issue
docs: update API documentation

## 使用规范的好处

- **提高可读性**：快速识别提交目的和内容
- **自动化工具支持**：支持 changelog 生成等自动化工具
- **团队协作**：减少沟通成本，保持一致性

## 常用的提交规范工具

- **Conventional Commits**：规范化提交格式
- **Commitizen**：生成规范提交信息的工具
