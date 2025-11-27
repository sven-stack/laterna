# 🚀 Deployment Guide

Follow these steps to deploy your Laterna gallery to Vercel (completely free!).

## Prerequisites

- [GitHub account](https://github.com)
- [Vercel account](https://vercel.com) (sign up with GitHub)
- Your code pushed to a GitHub repository

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

If you haven't already:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Laterna gallery"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/laterna.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `laterna` repository
4. Vercel will auto-detect Next.js - just click **"Deploy"**

That's it! Your site will be deployed at `https://your-project.vercel.app`

### 3. Add Database (Vercel Postgres)

After deployment:

1. Go to your project dashboard on Vercel
2. Click the **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Click **"Continue"**
6. Choose a region close to you
7. Click **"Create"**

Vercel will automatically add these environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 4. Add Blob Storage (Vercel Blob)

Still in the Storage tab:

1. Click **"Create Database"** again
2. Select **"Blob"**
3. Click **"Continue"**
4. Click **"Create"**

Vercel will automatically add:
- `BLOB_READ_WRITE_TOKEN`

### 5. Add Auth Secret

1. Go to **"Settings"** → **"Environment Variables"**
2. Click **"Add New"**
3. Add:
   - **Name**: `AUTH_SECRET`
   - **Value**: Generate one by running this in your terminal:
     ```bash
     openssl rand -base64 32
     ```
   - Leave "All" environments selected
4. Click **"Save"**

### 6. Redeploy

After adding the environment variables:

1. Go to the **"Deployments"** tab
2. Click the three dots (**...**) on the latest deployment
3. Click **"Redeploy"**
4. Click **"Redeploy"** again to confirm

Wait for the deployment to finish (about 1-2 minutes).

### 7. Create Your Admin Account

Now you need to create your first admin user. Use one of these methods:

#### Option A: Using curl (Terminal/Command Prompt)

```bash
curl -X POST https://your-project.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your-secure-password-here"}'
```

Replace:
- `your-project.vercel.app` with your actual Vercel URL
- `your-secure-password-here` with a strong password (8+ characters)

#### Option B: Using a Browser (Easy Method)

1. Create a file called `signup.html` on your computer:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Create Laterna Admin</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
            background: #1a1a2e;
            color: #f5f5f5;
        }
        input, button {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            box-sizing: border-box;
            border-radius: 8px;
            border: 1px solid #f59e0b;
            background: #16213e;
            color: #f5f5f5;
            font-size: 16px;
        }
        button {
            background: #f59e0b;
            color: #1a1a2e;
            font-weight: bold;
            cursor: pointer;
        }
        button:hover {
            background: #fbbf24;
        }
        #result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            background: #16213e;
            border: 1px solid #f59e0b;
        }
        .success { color: #10b981; }
        .error { color: #ef4444; }
    </style>
</head>
<body>
    <h1>🏮 Create Laterna Admin Account</h1>
    <form id="signupForm">
        <input type="text" id="url" placeholder="Your Vercel URL (e.g., my-app.vercel.app)" required>
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password (8+ characters)" required>
        <button type="submit">Create Account</button>
    </form>
    <div id="result"></div>

    <script>
        document.getElementById('signupForm').onsubmit = async (e) => {
            e.preventDefault();
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = 'Creating account...';

            try {
                const url = document.getElementById('url').value.replace(/^https?:\/\//, '');
                const response = await fetch(`https://${url}/api/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: document.getElementById('username').value,
                        password: document.getElementById('password').value
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    resultDiv.className = 'success';
                    resultDiv.innerHTML = `
                        <strong>✅ Success!</strong><br>
                        Admin account created: ${data.username}<br><br>
                        <a href="https://${url}/admin/login" style="color: #f59e0b;">
                            Go to login page →
                        </a>
                    `;
                } else {
                    resultDiv.className = 'error';
                    resultDiv.innerHTML = `<strong>❌ Error:</strong> ${data.error}`;
                }
            } catch (error) {
                resultDiv.className = 'error';
                resultDiv.innerHTML = `<strong>❌ Error:</strong> ${error.message}`;
            }
        };
    </script>
</body>
</html>
```

2. Open `signup.html` in your browser
3. Enter your Vercel URL, username, and password
4. Click "Create Account"

### 8. Log In and Upload Photos!

1. Visit `https://your-project.vercel.app/admin/login`
2. Enter your username and password
3. Click "Upload New Photo" to add your first lantern photo!

## 🎉 You're Done!

Your gallery is now live and ready to use. Share the URL with friends and family!

## Updating Your Site

Whenever you make changes to your code:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically redeploy your site!

## Free Tier Limits

Vercel's free tier includes:
- ✅ Unlimited bandwidth
- ✅ 100 deployments per day
- ✅ Automatic HTTPS
- ✅ Postgres: 256MB storage, 60 hours compute/month
- ✅ Blob Storage: 5GB storage, 100k reads/month

This is more than enough for a personal portfolio!

## Troubleshooting

### "Database connection error"
- Make sure you created the Postgres database in Vercel
- Verify environment variables are set
- Try redeploying

### "Failed to upload photo"
- Make sure you created the Blob storage
- Check that `BLOB_READ_WRITE_TOKEN` is set
- Images should be under 10MB

### "Unauthorized" at /admin
- Make sure you created an admin account
- Try clearing browser cookies
- Check that `AUTH_SECRET` is set

## Need Help?

Check the main [README.md](README.md) for more details or create an issue on GitHub!
