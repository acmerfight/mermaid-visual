# 架构设计文档

## 核心原则

本项目严格遵循**渲染与状态分离**的架构原则：

1. **React 只负责渲染** - React 组件仅用于 UI 渲染，不包含任何业务逻辑
2. **Jotai 管理所有状态** - 所有应用状态都存储在 Jotai atoms 中
3. **禁止使用 React Hook** - 除了 `useAtom` 和 `useSetAtom` 用于连接 Jotai 状态外，严格禁止使用其他 React Hook

## 架构分层

### 1. 状态层 (Atoms)

所有状态定义在 `src/atoms/` 目录下：

- **只读状态 atoms**: 存储应用状态
- **写操作 atoms**: 定义状态更新逻辑（使用 write-only atoms）

```typescript
// ✅ 正确：只读状态
export const countAtom = atom(0);

// ✅ 正确：写操作，逻辑分离
export const incrementCountAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
});
```

### 2. 渲染层 (Components)

组件只负责渲染，通过 `useAtom` 读取状态，通过 `useSetAtom` 触发更新：

```typescript
// ✅ 正确：只读取状态用于渲染
const [count] = useAtom(countAtom);

// ✅ 正确：使用写操作 atom
const increment = useSetAtom(incrementCountAtom);

// ❌ 错误：禁止在组件中定义状态更新逻辑
const handleClick = () => {
  setCount(count + 1); // 禁止！
};
```

### 3. 工具层 (Utils)

纯函数工具，不包含状态逻辑：

- API 调用函数
- 数据处理函数
- 工具函数

## 禁止事项

### ❌ 禁止使用以下 React Hook

- `useState` - 使用 Jotai atoms 替代
- `useEffect` - 使用 Jotai effects 或 atoms 的 write 函数
- `useCallback` - 逻辑应该在 atoms 中
- `useMemo` - 使用 derived atoms 替代
- `useRef` - 如果需要，使用 Jotai atoms

### ❌ 禁止在组件中

- 定义状态更新逻辑
- 处理异步操作
- 进行数据转换
- 定义事件处理函数（除了直接调用 setAtom）

## 最佳实践

### 1. 状态定义

```typescript
// ✅ 好的做法
export const countAtom = atom(0);
export const incrementAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
});
```

### 2. 异步操作

```typescript
// ✅ 好的做法：异步逻辑在 atom 中
export const fetchDataAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  try {
    const data = await api.fetch();
    set(dataAtom, data);
  } finally {
    set(loadingAtom, false);
  }
});
```

### 3. 组件编写

```typescript
// ✅ 好的做法：组件只负责渲染
export function MyComponent() {
  const [data] = useAtom(dataAtom);
  const [loading] = useAtom(loadingAtom);
  const fetchData = useSetAtom(fetchDataAtom);
  
  return (
    <div>
      {loading ? '加载中...' : <div>{data}</div>}
      <button onClick={() => fetchData()}>加载</button>
    </div>
  );
}
```

## 目录结构

```
src/
├── atoms/           # 状态定义（只读状态 + 写操作）
│   ├── countAtom.ts
│   ├── apiAtom.ts
│   └── index.ts
├── components/      # React 组件（纯渲染）
│   ├── Counter.tsx
│   └── ApiTest.tsx
├── utils/          # 工具函数（纯函数）
│   └── api.ts
└── App.tsx         # 根组件
```

## 优势

1. **可测试性** - 状态逻辑独立，易于单元测试
2. **可维护性** - 清晰的职责分离
3. **可扩展性** - 状态逻辑集中管理
4. **性能优化** - Jotai 的原子化更新机制
5. **类型安全** - TypeScript 完整类型支持

