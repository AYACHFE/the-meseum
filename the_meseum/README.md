# The Museum

A living gallery for creative minds — upload ideas and pictures, browse other artists, and exhibit work in a textured, artistic space.

Built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, Server Actions, and signed cookie sessions.

## Features

- **Landing page** with gallery atmosphere, manifesto, and palette story
- **Auth** — sign up, log in, log out (bcrypt + HTTP-only session cookies)
- **Gallery feed** — masonry wall of community work
- **Explore** — search + tag filters
- **Upload / Exhibit** — image upload with title, medium, tags, artist statement
- **Artwork detail** — full piece view, likes, palette chips
- **Profiles** — your studio (edit bio) + public artist walls
- **Demo data** — seeded artists and artworks on first run

## Quick start

```bashdddd
cd my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo account

| Field    | Value             |
|----------|-------------------|
| Email    | `luna@museum.art` |
| Password | `museum123`       |

Other seeded artists use the same password: `kai@museum.art`, `noor@museum.art`, `elio@museum.art`.

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing (redirects to gallery when signed in) |
| `/login` · `/signup` | Authentication |
| `/gallery` | Main community feed |
| `/explore` | Search & tags |
| `/upload` | Exhibit a new piece |
| `/artwork/[id]` | Artwork detail |
| `/profile` | Your studio |
| `/profile/[username]` | Public artist wall |

## Stack notes

- **Data**: JSON file store at `data/db.json` (created on first request)
- **Uploads**: saved under `public/uploads/`
- **Auth**: custom sessions via `lib/session.ts` + route protection in `proxy.ts`
- **Secret**: set `SESSION_SECRET` in production (see `.env.example`)

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
```
