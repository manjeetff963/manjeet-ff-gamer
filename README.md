# Manjeet FF Gamer

Cloudflare Pages-ready Vite + React starter.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages
1. Upload this project to GitHub.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect Git.
3. Build command: `npm run build`
4. Build output directory: `dist`

Important: The current UPI button opens a UPI payment intent. It does NOT verify payment automatically. For real order fulfilment, add an approved payment gateway/webhook and an authorized top-up supplier workflow.
