import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Simple Vite plugin to emulate Vercel's /api/analyze endpoint during local development
const apiDevPlugin = () => ({
  name: 'api-dev-plugin',
  configureServer(server: any) {
    server.middlewares.use('/api/analyze', async (req: any, res: any, next: any) => {
      if (req.method === 'POST') {
        // Load env vars into process.env so the handler can read GEMINI_API_KEY
        Object.assign(process.env, loadEnv('', process.cwd(), ''));
        
        let body = '';
        req.on('data', (chunk: any) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            req.body = JSON.parse(body || '{}');
          } catch (e) {
            req.body = {};
          }
          
          // Polyfill Vercel's res.status() and res.json()
          res.status = (code: number) => { res.statusCode = code; return res; };
          res.json = (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          try {
            const handler = await import('./api/analyze.ts');
            await handler.default(req, res);
          } catch (err) {
            console.error('Local API Handler Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiDevPlugin()
  ],
  build: {
    outDir: 'build'
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    exclude: ['e2e/**', 'node_modules/**', 'dist/**', '.idea/**', '.git/**', '.cache/**'],
    coverage: {
      provider: 'v8',
      include: ['src/services/**', 'src/pages/**', 'src/components/**'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**'],
    }
  }
})
