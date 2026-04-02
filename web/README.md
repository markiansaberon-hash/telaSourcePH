# FabricHub PH — Web App

## Setup

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google Sheets Integration

1. Create a Google Cloud project
2. Enable the Google Sheets API
3. Create a Service Account and download the JSON key
4. Share your Google Sheet with the service account email (Editor access)
5. Create a `.env.local` file:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id-from-the-url
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import in Vercel
3. Add the environment variables above
4. Deploy — done
