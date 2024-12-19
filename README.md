#### How to run:

create `.env.local` file at the root and create a supabase account then generate an API key.

`NEXT_PUBLIC_SUPABASE_URL` = "Your_URL"
`NEXT_PUBLIC_SUPABASE_ANON_KEY` = "Your_API_Key"

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Or Preferably create a production build by running

```bash
npm run build
```

Then run the build on success with

```bash
npm start
```
