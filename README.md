# Mermaid Visual

基于 React + Jotai + Hono 的现代化全栈项目，使用 pnpm 和 TypeScript。

## 技术栈

- **前端**: React 18 + Vite + TypeScript
- **状态管理**: Jotai
- **后端**: Hono + TypeScript
- **包管理**: pnpm
- **代码规范**: ESLint + Prettier

## 项目结构

```
mermaid_visual/
├── apps/
│   ├── web/          # React 前端应用
│   └── api/          # Hono 后端 API
├── packages/         # 共享包（可选）
├── package.json      # 根 package.json
└── pnpm-workspace.yaml
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

同时启动前端和后端：

```bash
pnpm dev
```

或者分别启动：

```bash
# 前端 (http://localhost:3000)
pnpm --filter web dev

# 后端 (http://localhost:3001)
pnpm --filter api dev
```

### 构建

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
pnpm type-check
```

### 代码格式化

```bash
pnpm format
```

## 开发指南

### 前端开发

前端应用位于 `apps/web/`，使用 Vite 作为构建工具。

- 入口文件: `apps/web/src/main.tsx`
- 主组件: `apps/web/src/App.tsx`
- 状态管理: `apps/web/src/atoms/`

### 后端开发

后端 API 位于 `apps/api/`，使用 Hono 框架。

- 入口文件: `apps/api/src/index.ts`
- API 路由: 在 `apps/api/src/` 中创建路由文件

## 架构原则

本项目严格遵循**渲染与状态分离**的架构：

- **React 只负责渲染** - 组件仅用于 UI 渲染
- **Jotai 管理所有状态** - 所有状态存储在 atoms 中
- **禁止使用 React Hook** - 除了 `useAtom`/`useSetAtom` 外，禁止使用其他 React Hook

详细架构说明请参考 [ARCHITECTURE.md](./ARCHITECTURE.md)

## 最佳实践

1. **严格分离渲染和状态** - React 组件只渲染，状态逻辑在 Jotai atoms 中
2. **类型安全**: 充分利用 TypeScript 的类型系统
3. **代码规范**: 使用 ESLint 和 Prettier 保持代码一致性
4. **状态管理**: 使用 Jotai 的原子化状态管理和 write-only atoms
5. **API 设计**: 遵循 RESTful 设计原则
6. **错误处理**: 实现完善的错误处理机制

## 许可证

MIT

