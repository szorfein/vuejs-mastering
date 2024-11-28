## Learned
- Basic use of Supabase https://supabase.com/ - Policy rules (RLS). Tables creation.
- pages/posts/[id].vue can match for localhost:3000/posts/[1,2,3,create,edit,etc...]
- Define for each pages/link, the matching .vue in `pages` dir
- Redirect user to login page (with supabase)
- Use Nuxt useLazyAsyncData for grab posts.
- Use Nuxt-UI toast to display information.

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
