# A0 MSS KPI Dashboard — Security Operations Console

An enterprise-grade, high-contrast SOC cybersecurity operations dashboard for tracking, visualizing, and reporting Monthly Managed Security Services (MSS) KPIs.

---

## ⚡ Quick Start

### Local Running
Requirement: [Node.js](https://nodejs.org) (v18+)

```bash
node server.js
```
Then open `http://localhost:4321` in your browser.

### Default Operator Credentials
- **Username**: `Jeeva`
- **Password**: `0123`

---

## 🌐 1-Click Free Cloud Deployment (Render / Railway)

### Deploy to Render.com (Free)
1. Fork or push this repository to your GitHub account.
2. In [Render.com](https://render.com), click **New +** → **Web Service**.
3. Select this repository.
4. Render automatically detects `render.yaml`:
   - **Runtime**: `Node`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`
5. Click **Deploy Web Service** to receive your public HTTPS URL!

### Deploy via Docker
```bash
docker build -t a0-mss-dashboard .
docker run -p 4321:4321 a0-mss-dashboard
```

---

## 🛡️ Key Features

- **Ultra-Dynamic "A0" Brand Menu**: Slide-out drawer navigation toggled by the signature A0 cyber-ring button.
- **Dynamic Cybersecurity Login Screen**: 360° tactical radar scanner sweep, interactive digital shockwaves, floating telemetry streams, and 3D card perspective tilt.
- **Overview & Interactive Status History**: Multi-month timeline bars with click-to-switch period navigation and instant RAG distribution donut.
- **Executive Summary & Published Briefing**: Auto-formatted executive cards (Top Risks, Delivered Improvements, Strategic Next Actions) with Print/PDF generation.
- **Metric History & Reversion**: Audit trail for all changes with one-click **↺ Restore** and **🗑 Delete** buttons.
- **Value Micro-Steppers**: Tactile Up (▲) and Down (▼) steppers on all numeric fields.
- **Zero External Dependencies**: Powered purely by Node.js standard library (`http`, `fs`, `path`, `crypto`, `url`).

