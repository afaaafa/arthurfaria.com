# arthurfaria.com

A "brainrot portfolio" — a personal portfolio built as an Instagram Reels-style vertical feed. Each section (Welcome, Work Experience, Projects, etc.) is a full-screen snap-scroll reel with looping background videos playing underneath the content.

Built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

## Project Structure

```
arthurfaria.com/
├── app/
│   ├── page.tsx          # Root page — assembles all reels and picks background videos
│   └── layout.tsx        # Root layout — Sidebar + global font (Roboto)
├── components/
│   ├── ReelsFeed.tsx     # Snap-scroll container, IntersectionObserver for active reel
│   ├── ReelsContext.tsx  # Context for active reel ID and scrollToReel helper
│   ├── Reel.tsx          # Individual reel shell with border/shadow styling
│   ├── ReelVideo.tsx     # <video> element that autoplays muted and loops
│   ├── ReelWelcome.tsx   # Welcome/intro reel content
│   ├── ReelExperience.tsx# Work experience reel content
│   ├── Sidebar.tsx       # Fixed sidebar with navigation and social links
│   └── LikeButton.tsx    # Like button on the right edge of each reel
├── public/
│   └── reels/
│       └── brainrot/     # .mp4 files used as reel backgrounds (gitignored)
└── bin/
    └── download_video    # Python script to download & trim background videos
```

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