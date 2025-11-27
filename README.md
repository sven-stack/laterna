# 🏮 Laterna - Lantern Photography Gallery

A beautiful, modern photography gallery for showcasing lantern photos from around the world. Built with Next.js 14, featuring a stunning dark theme with warm amber accents, image optimization, and a simple admin panel for photo management.

## ✨ Features

- **Beautiful UI**: Dark theme with warm lantern-inspired colors and smooth animations
- **Responsive Design**: Looks great on all devices
- **Admin Dashboard**: Secure admin panel for uploading and managing photos
- **Image Optimization**: Automatic image resizing and thumbnail generation
- **Cloud Storage**: Images stored on Vercel Blob Storage
- **Database**: PostgreSQL for photo metadata and admin authentication
- **Fast & Modern**: Built with Next.js 14 App Router and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A GitHub account
- A Vercel account (free tier works!)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Vercel Project

The easiest way to get started is to deploy to Vercel first, which will automatically set up your database and blob storage:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" and select your GitHub repository
4. Vercel will auto-detect Next.js

### 3. Add Database & Storage

In your Vercel project dashboard:

1. Go to the "Storage" tab
2. Create a **Postgres Database** (free tier)
3. Create a **Blob Store** (free tier)
4. Vercel will automatically add the environment variables to your project

### 4. Add Auth Secret

In your Vercel project settings:

1. Go to "Settings" → "Environment Variables"
2. Add a new variable:
   - Name: `AUTH_SECRET`
   - Value: Generate one with: `openssl rand -base64 32`

### 5. Deploy

Vercel will automatically deploy your app. Once deployed:

1. Visit your site URL
2. Go to `/admin/login`

### 6. Create Your Admin Account

You need to create your first admin user via API:

```bash
curl -X POST https://your-app.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your-secure-password"
  }'
```

Or use this simple HTML form (open in browser):

```html
<!DOCTYPE html>
<html>
<body>
  <h2>Create Admin Account</h2>
  <form id="signupForm">
    <input type="text" id="username" placeholder="Username" required><br><br>
    <input type="password" id="password" placeholder="Password (8+ chars)" required><br><br>
    <button type="submit">Create Account</button>
  </form>
  <div id="result"></div>

  <script>
    document.getElementById('signupForm').onsubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('https://your-app.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
        })
      });
      const data = await response.json();
      document.getElementById('result').innerHTML = JSON.stringify(data);
    };
  </script>
</body>
</html>
```

**Replace `your-app.vercel.app` with your actual Vercel URL!**

### 7. Start Uploading Photos!

1. Log in at `/admin/login` with your credentials
2. Click "Upload New Photo"
3. Fill in the details and upload your first lantern photo
4. View your gallery on the homepage

## 🛠️ Local Development

1. **Clone and install**:
   ```bash
   git clone <your-repo>
   cd Laterna
   npm install
   ```

2. **Get your environment variables from Vercel**:
   ```bash
   vercel env pull
   ```
   This downloads all the environment variables from your Vercel project.

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Laterna/
├── app/
│   ├── page.tsx              # Public gallery homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles with lantern theme
│   ├── admin/
│   │   ├── page.tsx          # Admin dashboard
│   │   └── login/
│   │       └── page.tsx      # Admin login
│   └── api/
│       ├── auth/             # Authentication endpoints
│       └── photos/           # Photo CRUD endpoints
├── components/               # Reusable components
├── lib/
│   ├── db.ts                # Database functions
│   └── auth.ts              # Auth utilities
├── auth.ts                  # NextAuth configuration
├── middleware.ts            # Route protection
└── tailwind.config.ts       # Tailwind with custom colors
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the lantern theme colors:

```typescript
colors: {
  lantern: {
    dark: "#1a1a2e",    // Background
    navy: "#16213e",    // Cards
    amber: "#f59e0b",   // Primary accent
    gold: "#fbbf24",    // Hover states
    glow: "#fcd34d",    // Highlights
  },
}
```

### Site Title & Description

Edit `app/layout.tsx` to change metadata:

```typescript
export const metadata: Metadata = {
  title: "Your Gallery Name",
  description: "Your description",
};
```

## 🔒 Security

- Passwords are hashed with bcryptjs
- Admin routes are protected by middleware
- File uploads are validated and optimized
- Database queries use parameterized statements
- Environment variables keep secrets secure

## 📝 Environment Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `POSTGRES_URL` | Database connection | Vercel Postgres |
| `BLOB_READ_WRITE_TOKEN` | Image storage | Vercel Blob |
| `AUTH_SECRET` | Session encryption | Generate with `openssl rand -base64 32` |
| `ADMIN_SETUP_KEY` | (Optional) Extra security for admin creation | Create your own |

## 🐛 Troubleshooting

### "Error fetching photos"
- Check that your database is connected
- Make sure you ran the database initialization (it happens automatically on first API call)

### "Failed to upload photo"
- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check image file size (keep under 10MB for best results)

### "Unauthorized" when accessing admin
- Make sure you created an admin account
- Clear browser cookies and try logging in again

## 🚢 Deployment

The app is designed to deploy seamlessly on Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add Storage (Postgres + Blob)
4. Add `AUTH_SECRET` environment variable
5. Deploy!

**Cost**: Free tier includes:
- Vercel hosting (free)
- Postgres: 256MB storage, 60 hours compute/month
- Blob Storage: 5GB, 100k reads/month

This is plenty for a personal portfolio!

## 📄 License

MIT - Feel free to use this for your own photography portfolio!

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [Sharp](https://sharp.pixelplumbing.com/) for image processing

---

Made with ✨ and 🏮

Need help? Check the issues or create a new one!
