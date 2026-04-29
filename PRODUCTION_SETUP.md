# Production Setup Guide

## 🔧 Environment Variables Configuration

### For Live Server - IMPORTANT

You **MUST** set these environment variables on your live server before running the app:

#### 1. **MONGODB_URI** (REQUIRED)
Your MongoDB connection string. Get it from:
- **MongoDB Atlas (Cloud)**: https://www.mongodb.com/cloud/atlas
  ```
  mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
  ```
- **MongoDB Community (Self-hosted)**:
  ```
  mongodb://username:password@host:27017/dbname
  ```

#### 2. **NEXT_PUBLIC_API_URL** (Optional)
Your production domain URL (for client-side API calls)
```
https://yourdomain.com
```

---

## 🚀 How to Deploy with PM2

### 1. Create `.env.production.local` on your server:
```bash
# SSH into your server and create the file
nano .env.production.local
```

Add your variables:
```
MONGODB_URI=mongodb+srv://your-user:your-password@cluster.mongodb.net/prochar?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=https://yourdomain.com
PORT=3000
NODE_ENV=production
```

### 2. Build the app:
```bash
npm run build
```

### 3. Start with PM2:
```bash
# First time setup
npm install -g pm2  # Install PM2 globally
npm run pm2:start   # Start the app

# Check status
pm2 status          # View all running apps
pm2 logs prochar-email-marketing  # View logs

# Common commands
npm run pm2:restart # Restart if you made changes
npm run pm2:stop    # Stop the app
npm run pm2:delete  # Remove from PM2
```

---

## 🔍 Troubleshooting

### Error: "Invalid scheme, expected connection string to start with..."
**Cause**: `MONGODB_URI` is empty or not set  
**Fix**: Add a valid MongoDB connection string to `.env.production.local`

### Error: "Cannot connect to MongoDB"
**Causes**:
1. MongoDB server is down
2. Connection string is wrong
3. IP whitelist issue (MongoDB Atlas)

**Fix**: 
- Verify connection string format
- If using MongoDB Atlas, add your server IP to the IP Whitelist

### Logs aren't working?
```bash
mkdir -p logs  # Create logs directory if it doesn't exist
pm2 start ecosystem.config.cjs
```

---

## 📊 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View all logs
pm2 logs

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

---

## 🔐 Security Tips

1. Never commit `.env.production.local` to git (it's in .gitignore)
2. Use strong MongoDB passwords
3. Whitelist only necessary IPs in MongoDB Atlas
4. Use HTTPS for your domain
5. Keep Node.js and dependencies updated

---

**Need help?** Check:
- MongoDB Atlas docs: https://docs.mongodb.com/atlas/
- PM2 docs: https://pm2.keymetrics.io/docs/
- Next.js deployment: https://nextjs.org/docs/deployment
