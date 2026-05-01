## 🚀 Features (Both Versions)

- **Full Automation**: Handles all 6 verification steps automatically.
- **Google Search Integration**: Automatically clicks the correct result when redirected to Google Search.
- **Go Home Automation**: Clicks the final "Go Home" button automatically to finish the process.
- **Smart Timer Detection**: Automatically clicks when timers reach zero.
- **Auto-Scroll & Visibility**: Ensures all buttons (Continue, Proceed, Get Link) are visible before clicking.
- **Live Status/Logs**: Provides real-time feedback (UI on browser, Logs on CLI).
- **Clean Scope**: Only activates on verification endpoints; stays hidden on the normal site.

---

## 🛠️ Installation (Recommended: Tampermonkey)

The easiest way to use this bypasser is via the **Tampermonkey** browser extension.

1.  **Install Tampermonkey**: Get it for [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).
2.  **Add Script**:
    - Click the Tampermonkey icon > **Create a new script...**
    - Copy and paste the contents of `StudyStark_Bypasser.user.js` into the editor.
    - Press `Ctrl + S` to save.
3.  **Done!**: Visit [StudyStark Verify Task](https://studystark.com/verify-task/) and watch the magic happen.

---

## 🆘 Troubleshooting (Crucial for Chrome)

If the Bypasser box **does not appear**, you MUST enable these Chrome settings:

### 1. Enable Developer Mode
- Go to `chrome://extensions`
- Toggle **Developer Mode** in the top-right corner to **ON**.
- This is required by Chrome to allow Tampermonkey to inject scripts.

### 2. Allow Access to File URLs
- In `chrome://extensions`, find **Tampermonkey** and click **Details**.
- Scroll down and toggle **Allow access to file URLs** to **ON**.
- This ensures the script can run reliably across redirects.

### 3. Allow User Script Execution
- In the same **Details** page, ensure any setting related to "Allow user scripts" or "Site access" is set to "On all sites".

---

## Video tutorial

https://github.com/user-attachments/assets/eda57e1d-15b8-4fa1-bd39-358fe0aa2666


## 💻 Alternative: Standalone Node.js Script

If you prefer running the bypasser from your terminal:

1.  Ensure you have [Node.js](https://nodejs.org/) installed.
2.  Open the folder in your terminal.
3.  Double-click **`run_bypasser.bat`** (Windows) or run `node bypasser.js`.
    *   *Note: On Windows, the batch file will automatically install dependencies for you on the first run.*
4.  Choose your mode: **Auto**, **Semi-Auto**, or **Manual**.

---

## ⚠️ Disclaimer

This tool is for educational and personal productivity purposes only. Please use it responsibly and respect the website's terms of service.

---

## 👨‍💻 Author

Created by **Stark**
