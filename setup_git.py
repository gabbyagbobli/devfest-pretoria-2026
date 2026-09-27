import os
import sys
import zipfile
import urllib.request

mingit_dir = r"C:\Users\SACU\AppData\Local\Programs\MinGit"
os.makedirs(mingit_dir, exist_ok=True)

url = "https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip"
zip_path = os.path.join(mingit_dir, "mingit.zip")

print("Downloading MinGit from GitHub releases...")
urllib.request.urlretrieve(url, zip_path)
print(f"Downloaded {os.path.getsize(zip_path)} bytes. Extracting...")

with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(mingit_dir)

os.remove(zip_path)
git_exe = os.path.join(mingit_dir, "cmd", "git.exe")
print(f"MinGit installed successfully: {os.path.exists(git_exe)} at {git_exe}")
