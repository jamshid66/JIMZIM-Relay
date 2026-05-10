const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');

const app = express();

// مقصد اصلی: سرور آلمان تو
const target = 'https://78.47.148.37:2053'; 

app.use('/', createProxyMiddleware({
    target: target,
    changeOrigin: true,
    secure: false, // چون گواهی سرور خودساخته است
    ws: true,      // پشتیبانی از وب‌ساکت و استریم XHTTP
    
    // 👑 شاه‌کلید حل مشکل: ارسال SNI به سرور آلمان
    agent: new https.Agent({
        servername: 'irpubgjim.xyz', 
        rejectUnauthorized: false
    }),

    onProxyReq: (proxyReq, req, res) => {
        // تنظیم هدر برای عبور از فیلترینگ
        proxyReq.setHeader('Host', 'irpubgjim.xyz');
    },
    
    onProxyRes: (proxyRes, req, res) => {
        // اطمینان از اینکه پاسخ‌ها بدون دستکاری برمی‌گردند
        proxyRes.headers['X-Relay'] = 'JIMZIM-Cloud-Bridge';
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 JIMZIM Relay is Live on Port ${PORT}`));
