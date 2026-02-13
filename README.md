# Productivity Suite Chrome Extension

A **production-ready multi-feature Chrome Extension** built with **Manifest V3, React, and Vite** to enhance user productivity through tab session management, persistent notes, website blocking, and a custom new-tab dashboard.

---

## Features

### 1. Tab Session Management

* Save all open tabs in the current window as a **named session**
* Restore saved sessions in a **new browser window**
* Sessions stored using **chrome.storage.local**

### 2. Persistent Notes

* Write and save quick notes directly from the popup
* Notes persist across popup reopen and browser restarts
* Stored securely in **chrome.storage.local**

### 3. Website Blocker

* Add hostnames to a **blocklist** from the options page
* Blocked sites redirect to a custom **blocked page**
* Blocklist synced across devices using **chrome.storage.sync**

### 4. Custom New Tab Dashboard

* Overrides Chrome’s default new tab
* Displays:

  * Saved notes
  * Saved tab sessions
* Clean, minimal productivity-focused UI

### 5. Context Menu Integration

* Right-click any webpage → **Add page URL to notes**
* Automatically appends URL and title to saved notes

### 6. Keyboard Shortcuts

* **Ctrl + Shift + P** → Open popup
* **Ctrl + Shift + S** → Save current tab session

### 7. Data Export

* Export all stored data as:

```
productivity_suite_export.json
```

Includes:

* sessions
* notes
* blockedSites

---

## Tech Stack

* **Manifest V3**
* **React (Vite build)**
* **Vanilla CSS (custom theme)**
* **Chrome Extension APIs**

  * chrome.tabs
  * chrome.storage
  * chrome.scripting
  * chrome.contextMenus
  * chrome.commands

---

## Project Structure

```
dist/
  manifest.json
  background.js
  blocked.html
  popup.html
  options.html
  newtab.html
  assets/

src-ui/
  src/
    popup/
    options/
    newtab/
```

---

## Installation (Load Unpacked)

1. Clone the repository:

```
git clone https://github.com/kollulohithaalekhya/productivity-suite-extension.git
```

2. Build the React UI:

```
cd src-ui
npm install
npm run build
```

3. Copy required extension files:

```
cp manifest.json dist/
cp background.js dist/
cp blocked.html dist/
```

4. Open Chrome:

```
chrome://extensions
```

5. Enable **Developer mode**

6. Click **Load unpacked** → select the **dist/** folder

---

## Usage Guide

### Save Session

Open popup → click **Save Current Session** → enter session name.

### Restore Session

Click **Restore** beside a saved session → opens all tabs in a new window.

### Add Blocked Website

Open **Options** → enter hostname → click **Add to Blocklist**.

### Export Data

Options page → **Export All Data** → downloads JSON backup.

---