# available-appointment-alarm

> **Archived.** A one-off script from 2021. The booking site and its session URL have most likely changed since then.

Polls the Ausländerbehörde Karlsruhe booking page on [tempus-termine.com](https://tempus-termine.com) every 2 minutes. When a free appointment date turns up in one of the months you're watching, it emails you a direct booking link. You get one email per date, never a repeat.

## Setup

```bash
npm install
```

Create a `.env` file:

```
SENDER_EMAIL_ADDRESS=you@gmail.com
SENDER_EMAIL_PASSWORD=your-gmail-app-password
RECEIVER_EMAIL_ADDRESS=you@example.com
# optional
WANTED_MONTHS=6,7            # 1-12, comma-separated (default: 6,7)
APPOINTMENT_URL=https://...  # day-selection page URL incl. a fresh session (sna=...) token
```

Gmail requires an [app password](https://support.google.com/accounts/answer/185833).

## Run

```bash
node index.js
```
