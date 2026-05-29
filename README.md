# PersonalCore

PersonalCore is a Tauri + React + TypeScript desktop app foundation for personal development tracking on macOS.

## Stack

- Tauri
- React
- TypeScript
- Tailwind CSS
- Local mock data first
- Supabase placeholder for future cloud sync

## Pages

- Dashboard
- Habits
- Reminders
- Daily Check-in
- Settings

## Setup

Install JavaScript dependencies:

```bash
npm install
```

Run the desktop app:

```bash
npm run tauri dev
```

For frontend-only development:

```bash
npm run dev
```

## Notes

Supabase is not connected yet. The placeholder lives in `src/lib/supabase.ts` so a real client can be added later without changing the page structure.
