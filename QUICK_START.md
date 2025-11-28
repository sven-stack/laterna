# 🚀 Quick Start Guide - Your Action Items

I've built your Laterna gallery! Now **YOU** need to do these steps (I can't do them because they require your personal accounts):

---

## ✅ Step 1: Create GitHub Account & Repo (5 min)

### If you don't have GitHub:
1. Go to **[github.com/signup](https://github.com/signup)**
2. Enter your email, create password, choose username
3. Verify email

### Create your repository:
1. Click the **"+"** icon (top right) → **"New repository"**
2. **Repository name**: `laterna` (or anything you want)
3. Leave **Public** selected (or Private if you prefer)
4. **IMPORTANT**: Do NOT check "Initialize with README" (we already have files)
5. Click **"Create repository"**

### Push your code:
After creating the repo, GitHub shows you commands. **Come back here and tell me your GitHub username**, and I'll help you push the code!

Or you can run these commands yourself (replace `YOUR-USERNAME` with your actual GitHub username):

```bash
git remote add origin https://github.com/YOUR-USERNAME/laterna.git
git branch -M main
git push -u origin main
```

When prompted, use your GitHub credentials (or personal access token if you have 2FA enabled).

---

## ✅ Step 2: Create Vercel Account (2 min)

1. Go to **[vercel.com/signup](https://vercel.com/signup)**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. Done! You're logged into Vercel

---

## ✅ Step 3: Deploy to Vercel (3 min)

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repos - find **"laterna"**
3. Click **"Import"**
4. Vercel auto-detects Next.js - just click **"Deploy"**
5. Wait 1-2 minutes while it builds
6. You'll get a URL like: `laterna-abc123.vercel.app`

**🎉 Your site is now live!** (But it won't work yet - needs database)

---

## ✅ Step 4: Add Database (Vercel Dashboard)

Still in Vercel, in your project:

1. Click the **"Storage"** tab (top navigation)
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Choose any region close to you
5. Click **"Create"**

Vercel automatically adds these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- And a few others

---

## ✅ Step 5: Add Image Storage (Vercel Dashboard)

Still in the **Storage** tab:

1. Click **"Create Database"** again (yes, again!)
2. This time select **"Blob"**
3. Click **"Create"**

Vercel automatically adds: `BLOB_READ_WRITE_TOKEN`

---

## ✅ Step 6: Add Auth Secret (Vercel Dashboard)

1. Go to **"Settings"** tab → **"Environment Variables"**
2. Click **"Add New"**
3. Add these details:
   - **Name**: `AUTH_SECRET`
   - **Value**: Copy this random string:
     ```
     RUN THIS COMMAND TO GENERATE:
     openssl rand -base64 32
     ```
   - Leave environment as "All"
4. Click **"Save"**

### Don't have `openssl`? Use this instead:
Just use this pre-generated one for testing (change it later!):
```
kJ8n3mP9qR2sT5vX7yZ0aB4cD6eF1gH3iJ5kL7mN9oP2qR4sT6uV8wX0yZ2aB4c
```

---

## ✅ Step 7: Redeploy (Vercel Dashboard)

After adding environment variables:

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** menu → **"Redeploy"**
4. Click **"Redeploy"** again to confirm
5. Wait ~1 minute

---

## ✅ Step 8: Create Your Admin Account

Now your site is fully working! But you need an admin account.

### Option A: Use the browser tool (EASIEST)

1. **Copy this entire code** and save as `create-admin.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Create Admin - Laterna</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f5f5f5;
        }
        .container {
            background: rgba(26, 26, 46, 0.8);
            border: 2px solid rgba(245, 158, 11, 0.3);
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 0 30px rgba(245, 158, 11, 0.2);
        }
        h1 {
            color: #fbbf24;
            margin-bottom: 10px;
            font-size: 2em;
        }
        p {
            color: #9ca3af;
            margin-bottom: 30px;
            font-size: 0.9em;
        }
        label {
            display: block;
            color: #d1d5db;
            margin-bottom: 8px;
            font-size: 0.9em;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 15px;
            margin-bottom: 20px;
            background: rgba(22, 33, 62, 0.6);
            border: 2px solid rgba(245, 158, 11, 0.3);
            border-radius: 10px;
            color: #f5f5f5;
            font-size: 16px;
            transition: all 0.3s;
        }
        input:focus {
            outline: none;
            border-color: #fbbf24;
            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
        }
        button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #f59e0b, #fbbf24);
            border: none;
            border-radius: 10px;
            color: #1a1a2e;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(245, 158, 11, 0.4);
        }
        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        #result {
            margin-top: 25px;
            padding: 20px;
            border-radius: 10px;
            display: none;
            animation: slideIn 0.3s ease;
        }
        #result.show {
            display: block;
        }
        #result.success {
            background: rgba(16, 185, 129, 0.1);
            border: 2px solid rgba(16, 185, 129, 0.3);
            color: #10b981;
        }
        #result.error {
            background: rgba(239, 68, 68, 0.1);
            border: 2px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
        }
        .success-link {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background: rgba(245, 158, 11, 0.2);
            border: 1px solid #f59e0b;
            border-radius: 8px;
            color: #fbbf24;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
        }
        .success-link:hover {
            background: rgba(245, 158, 11, 0.3);
            transform: translateX(5px);
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .hint {
            font-size: 0.85em;
            color: #6b7280;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏮 Create Laterna Admin</h1>
        <p>Set up your admin account to start managing your gallery</p>

        <form id="signupForm">
            <label for="url">Your Vercel URL</label>
            <input
                type="text"
                id="url"
                placeholder="my-app.vercel.app or laterna-abc123.vercel.app"
                required
            >
            <div class="hint" style="margin-top: -15px; margin-bottom: 20px;">
                Find this in your Vercel dashboard (don't include https://)
            </div>

            <label for="username">Admin Username</label>
            <input
                type="text"
                id="username"
                placeholder="admin"
                required
            >

            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                placeholder="Min 8 characters"
                minlength="8"
                required
            >

            <button type="submit" id="submitBtn">
                Create Admin Account
            </button>
        </form>

        <div id="result"></div>
    </div>

    <script>
        const form = document.getElementById('signupForm');
        const resultDiv = document.getElementById('result');
        const submitBtn = document.getElementById('submitBtn');

        form.onsubmit = async (e) => {
            e.preventDefault();

            resultDiv.className = '';
            resultDiv.classList.add('show');
            resultDiv.innerHTML = '⏳ Creating your admin account...';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating...';

            try {
                const url = document.getElementById('url').value.replace(/^https?:\/\//, '').replace(/\/$/, '');
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                const response = await fetch(`https://${url}/api/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    resultDiv.className = 'show success';
                    resultDiv.innerHTML = `
                        <strong>✅ Success!</strong><br>
                        Admin account created: <strong>${data.username}</strong><br>
                        <a href="https://${url}/admin/login" class="success-link">
                            Go to Admin Login →
                        </a>
                    `;
                    form.reset();
                } else {
                    resultDiv.className = 'show error';
                    resultDiv.innerHTML = `
                        <strong>❌ Error</strong><br>
                        ${data.error || 'Failed to create account'}
                    `;
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Create Admin Account';
                }
            } catch (error) {
                resultDiv.className = 'show error';
                resultDiv.innerHTML = `
                    <strong>❌ Connection Error</strong><br>
                    ${error.message}<br><br>
                    <small>Make sure your URL is correct and your site is deployed!</small>
                `;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Admin Account';
            }
        };
    </script>
</body>
</html>
```

2. **Open `create-admin.html` in your browser**
3. **Enter your Vercel URL** (e.g., `laterna-abc123.vercel.app`)
4. **Create username and password**
5. **Click "Create Admin Account"**

### Option B: Use command line

```bash
curl -X POST https://your-app.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password-here"}'
```

---

## ✅ Step 9: Login & Upload Photos! 🎉

1. Go to `https://your-app.vercel.app/admin/login`
2. Login with your username and password
3. Click **"Upload New Photo"**
4. Select a lantern photo, add title/description
5. Click **"Upload Photo"**
6. View your public gallery at `https://your-app.vercel.app`

---

## 📝 Summary - What YOU Need to Do:

- [ ] Create GitHub account (if you don't have one)
- [ ] Create GitHub repository called "laterna"
- [ ] Tell me your GitHub username so I can help push the code
- [ ] Create Vercel account (sign up with GitHub)
- [ ] Deploy the project from Vercel dashboard
- [ ] Add Postgres database in Vercel
- [ ] Add Blob storage in Vercel
- [ ] Add AUTH_SECRET environment variable
- [ ] Redeploy after adding environment variables
- [ ] Create admin account using the HTML tool
- [ ] Login and start uploading photos!

---

## ❓ Need Help?

Just ask me:
- "How do I push to GitHub?"
- "What's my Vercel URL?"
- "The admin creation isn't working"
- etc.

**Tell me when you've created your GitHub repo and I'll help you push the code!** 🚀
