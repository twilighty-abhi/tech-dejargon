# Tech De-jargoniser by IDLIStack (T4GC)

> **Translate tech speak into everyday social impact English.**  
> An interactive engagement activity designed for the **IDLIStack Annual Summit 2026**.

![IDLIStack De-jargoniser Logo](assets/logo-black.png)

---

## 🌟 Overview

At non-profit and social sector summits, leaders, program managers, and donors are frequently inundated with technical jargon from developers, vendors, and consultants (*"Just use the API to pull the donor list"*, *"We need to containerize the database in Docker"*, *"The webhook failed"*, etc.).

The **Tech De-jargoniser** bridges this gap through a clean, Google Translate-inspired interface matching **IDLIStack's official brand identity** (`idlistack.com` by Tech4Good Community / T4GC).

---

## ✨ Features Built for the Summit Booth

1. **Google-Translate-Style Split Interface**:
   - **Left Pane (Source Input)**: Type, paste, or select any tech jargon phrase.
   - **Right Pane (De-jargonised Output)**: Instant plain-English explanation using intuitive everyday metaphors (e.g. *API = waiter delivering orders between table and kitchen*, *Docker = standardized shipping containers*, *SSL = wax-sealed tamper-proof envelope*).
   - **Impact Takeaway Badge**: Explains *"What this means for your non-profit / project"*.

2. **Bidirectional Translation (Tech ⇆ Non-Tech)**:
   - **Tech English ➔ Non-Tech English**: De-mystifies developer speak into plain social impact language.
   - **Non-Tech English ➔ Tech English**: Click the **`⇆` Swap** button to turn plain requests (*"How do we automatically email donors on Mondays?"*) into real technical specifications (*"Set up a recurring Cron Job to hit the Listmonk API"*).

3. **Widely Used Phrases Wall**:
   - One-click interactive chips: `Docker`, `SSL Certificate`, `Traffic spike`, `Plugin`, `Cron Job`, `Webhook`, `API`, `Database`, `Open Source`, `CI/CD`, `Cache`, `Microservices`, `Latency`, `2FA`, and more.

4. **"Check Caption" & Downloadable Summit Card**:
   - Clicking **"Check Caption"** opens a branded modal.
   - Generates an instant high-resolution PNG image card with the IDLIStack Summit branding, ready to download or share on LinkedIn/Twitter/WhatsApp.

5. **Booth Engagement Activities**:
   - 🎮 **De-jargon Quiz Challenge**: A 4-question interactive game for summit visitors to test their jargon IQ and win summit swag/stickers.
   - 🎲 **Surprise Me / Jargon Bingo**: Randomly pulls hilarious real-world buzzwords commonly heard in NGO tech meetings.
   - 🎙️ **Voice Input (Speech-to-Text)**: Attendees can tap the microphone and speak jargon directly into the booth mic.
   - 🔊 **Read Aloud (Text-to-Speech)**: Speaks the translation aloud with smooth browser synthesis.
   - 📱 **Mobile QR Code**: Attendees can scan a QR code on the booth screen to run the tool on their own phones.
   - 🖥️ **Fullscreen Kiosk Mode**: One-click fullscreen display for iPad stands or large TV displays.

---

## 🚀 How to Run Locally

Because the project is built with lightweight, zero-dependency HTML5, CSS3, and ES6 JavaScript, you can run it immediately without any build steps:

### Option 1: Python HTTP Server (Recommended)
```bash
python3 -m http.server 4321
```
Then open [http://localhost:4321](http://localhost:4321) in your browser.

### Option 2: Node.js (npx serve)
```bash
npx serve -l 4321
```

### Option 3: Double-Click
Simply open `index.html` directly in Chrome, Safari, Firefox, or Edge.

---

## 📂 Project Structure

```
tech-dejargon/
├── index.html            # Main semantic markup with summit modals & tools
├── css/
│   └── style.css         # IDLIStack branding, pink accents, responsive layout
├── js/
│   ├── dictionary.js     # 60+ curated jargon terms, analogies, & impact notes
│   └── app.js            # Translation engine, TTS/STT, canvas card export, quiz
├── assets/
│   ├── logo-black.png    # Official IDLIStack by T4GC logo
│   └── icon.svg          # Brand icon & favicon
└── README.md             # Documentation and Summit guide
```

---

## 🎨 Branding Alignment with IDLIStack (`idlistack.com`)

| Element | IDLIStack Brand Specification |
|---|---|
| **Primary Color** | `#ED4690` (Signature IDLIStack Hot Pink) |
| **Secondary Color** | `#111827` (Deep Slate / Charcoal) |
| **Card Border** | `2.5px solid #ED4690` with ambient soft pink glow |
| **Typography** | Inter & Manrope (Google Fonts) |
| **Philosophy** | Open-source hosting made effortless for impact organisations (T4GC) |

---

## 🎪 Summit Booth Setup Recommendations

1. **Hardware**: An iPad or touchscreen monitor on a stand at the IDLIStack booth.
2. **Kiosk Mode**: Click the **Kiosk** button in the top right corner to go fullscreen.
3. **Engagement Flow**:
   - Ask visitors: *"What tech word did a developer or vendor say that confused you?"*
   - Let them speak into the mic or type it in.
   - Have them click **"Check Caption"** to download their custom de-jargonised card.
   - Encourage them to try the **4-Question Jargon Quiz** to win IDLIStack stickers!
