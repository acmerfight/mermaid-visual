import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

const app = new Hono();

// 启用 CORS
app.use('/*', cors());

// 健康检查
app.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'API is running' });
});

// API 路由示例
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Hono API!' });
});

// 404 处理
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// 错误处理
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: 'Internal Server Error' }, 500);
});

const port = 3001;

console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

