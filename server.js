const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
    target: 'https://78.47.148.37:2053', // شلیک مستقیم به قلب هتزنر
    changeOrigin: true,
    secure: false, // رد کردن خطای گواهی خودساخته‌ی سرور
    ws: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Host', 'irpubgjim.xyz'); // کلاهبرداری قانونی از DPI!
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Relay active on port ${PORT}`));
