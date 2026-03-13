# arthurfaria.com

A "brainrot portfolio" — a personal portfolio built as an Instagram Reels-style vertical feed. Each section (Welcome, Work Experience, Projects, etc.) is a full-screen snap-scroll reel with looping background videos playing underneath the content.

Built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

## Project Structure

```
arthurfaria.com/
├── app/
│   ├── page.tsx              # Root page — assembles all reels and picks background videos
│   ├── layout.tsx            # Root layout — Sidebar + global font (Roboto)
│   └── api/
│       ├── send/
│       │   └── route.ts      # POST /api/send — forwards contact form to Resend
│       ├── likes/[reelId]/
│       │   └── route.ts      # GET / POST / DELETE — like counts via Supabase
│       └── comments/[reelId]/
│           └── route.ts      # GET / POST — comments via Supabase
├── components/
│   ├── ReelsFeed.tsx         # Snap-scroll container, IntersectionObserver for active reel
│   ├── ReelsContext.tsx      # Context for active reel ID and scrollToReel helper
│   ├── ReelActiveContext.tsx # Context for per-reel active/preload state
│   ├── Reel.tsx              # Individual reel shell with like/comment buttons
│   ├── ReelVideo.tsx         # <video> element that autoplays muted and loops
│   ├── ReelWelcome.tsx       # Welcome/intro reel content
│   ├── ReelExperience.tsx    # Work experience reel content
│   ├── ReelProjects.tsx      # GitHub projects reel content
│   ├── ReelContact.tsx       # Contact form reel (sends email via /api/send)
│   ├── LikeButton.tsx        # Like button with localStorage + Supabase persistence
│   ├── CommentSection.tsx    # Comment overlay with list and submission form
│   └── Sidebar.tsx           # Fixed sidebar with navigation and social links
├── lib/
│   └── supabase.ts           # Supabase client (service role, server-side only)
├── public/
│   └── reels/
│       └── brainrot/         # .mp4 files used as reel backgrounds (gitignored)
└── bin/
    └── download_video        # Python script to download & trim background videos
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `PERSONAL_EMAIL` | Email address that receives contact form submissions |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only, never exposed to the client) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn / pnpm / bun)

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## How Background Videos Work

Each experience reel has a looping background video sourced from `public/reels/brainrot/`. At request time, `app/page.tsx` reads that directory, shuffles all `.mp4` files, and picks 3 at random — one per experience reel. Videos in this folder are gitignored and must be added locally (for now).

## Adding Background Videos

Use the `bin/download_video` script to download a clip from any URL (YouTube, Instagram, etc.), trim it to the segment you want, and drop it directly into `public/reels/brainrot/`.

### Requirements

Install the two system dependencies before running the script:

```bash
# macOS
brew install yt-dlp ffmpeg

# Ubuntu / Debian
sudo apt install yt-dlp ffmpeg
```

### Usage

```bash
./bin/download_video URL [OUTPUT_FILENAME] [START] [END] [--dest DIR]
```

| Argument | Required | Default | Description |
|---|---|---|---|
| `URL` | yes | — | Video URL to download |
| `OUTPUT_FILENAME` | no | `output.mp4` | Name of the trimmed output file |
| `START` | no | `00:00:00` | Trim start timestamp (`HH:MM:SS` or `MM:SS`) |
| `END` | no | `00:00:30` | Trim end timestamp (`HH:MM:SS` or `MM:SS`) |
| `--dest DIR` | no | `public/reels/brainrot/` | Output directory (absolute or relative to project root) |

### Examples

Download the first 30 seconds into the default folder:

```bash
./bin/download_video "https://youtube.com/watch?v=xxx"
```

Download a specific segment with a custom filename:

```bash
./bin/download_video "https://youtube.com/watch?v=xxx" subway_surfers.mp4 00:01:00 00:02:30
```

Save to a different directory:

```bash
./bin/download_video "https://youtube.com/watch?v=xxx" clip.mp4 00:00:10 00:01:10 --dest public/reels/custom
```

### What the script does

1. Downloads the best quality `.mp4` available via `yt-dlp`
2. Trims between `START` and `END` using `ffmpeg -c copy` (fast, no re-encode)
3. Saves the trimmed file to the destination directory
4. Deletes the original full download

After running, the trimmed `.mp4` is immediately available as a reel background on the next page load (if the dest was public/reels/brainrot).

## How Email Sending Works

Contact form submissions (in `ReelContact.tsx`) are delivered via **[Resend](https://resend.com)**, a transactional email API.

### Flow

```
User fills form → POST /api/send → Resend API → your inbox
```

1. The `ReelContact` component collects `name`, `email`, and `message` from the user.
2. On submit it calls `POST /api/send` with those fields as JSON.
3. `app/api/send/route.ts` instantiates the Resend client with `RESEND_API_KEY`, then calls `resend.emails.send()`.
4. The email lands in the inbox configured by `PERSONAL_EMAIL`.
5. On success the form shows a confirmation. On failure it falls back to a LinkedIn link so the user always has a way to reach out.

### API route (`app/api/send/route.ts`)

```ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const { data, error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: [process.env.PERSONAL_EMAIL!],
    subject: `Message from: ${name}`,
    text: message,
  });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
```

The sender domain (`onboarding@resend.dev`) is Resend's shared sandbox domain. To send from a custom domain, verify it in the Resend dashboard and update the `from` field.

## How Supabase Is Used

**[Supabase](https://supabase.com)** provides the PostgreSQL database that stores likes and comments for each reel. All database access happens server-side via the service role key — it is never exposed to the browser.

### Client setup (`lib/supabase.ts`)

```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
```

### Database schema

Two tables are required:

**`reel_likes`**

| Column | Type | Notes |
|---|---|---|
| `reel_id` | `text` | Primary key — matches the reel's identifier |
| `count` | `integer` | Current like count |

Incrementing and decrementing are done through two Supabase RPC functions to avoid race conditions:

```sql
-- increment_like
UPDATE reel_likes SET count = count + 1 WHERE reel_id = p_reel_id;
INSERT INTO reel_likes (reel_id, count)
  SELECT p_reel_id, 1
  WHERE NOT EXISTS (SELECT 1 FROM reel_likes WHERE reel_id = p_reel_id);

-- decrement_like
UPDATE reel_likes SET count = GREATEST(count - 1, 0) WHERE reel_id = p_reel_id;
```

**`reel_comments`**

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key, auto-generated |
| `reel_id` | `text` | Associated reel |
| `username` | `text` | Optional — `null` for anonymous comments |
| `content` | `text` | Comment body |
| `created_at` | `timestamptz` | Auto-set on insert |

### API routes

| Route | Method | What it does |
|---|---|---|
| `/api/likes/[reelId]` | `GET` | Returns `{ count }` from `reel_likes` |
| `/api/likes/[reelId]` | `POST` | Calls `increment_like` RPC |
| `/api/likes/[reelId]` | `DELETE` | Calls `decrement_like` RPC |
| `/api/comments/[reelId]` | `GET` | Returns all comments ordered by `created_at` |
| `/api/comments/[reelId]` | `POST` | Inserts a new comment row |

### Client-side like persistence

To avoid a round-trip on every page load, the `LikeButton` component stores whether the current user has liked a reel in `localStorage` under the key `liked_{reelId}`. The actual count is always fetched from Supabase; localStorage only tracks the liked/not-liked toggle state per device.