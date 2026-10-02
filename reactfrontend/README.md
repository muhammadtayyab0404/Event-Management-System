# RH Nexus Events · React

The public website is now built with React 19, React Router and Vite. All six
pages retain the existing dark design, green brand accents, images and content.
The home hero uses the newly supplied `Render me!_1.mp4`, optimized to a silent
1080p MP4 for background playback. Its full duration is retained. Other videos
retain the previous company sample.

## Run in VS Code on Ubuntu

Extract the ZIP, open the `rh-nexus-react` folder in VS Code, and open its terminal:

```bash
npm install
npm run dev
```

Open the Local URL printed in the terminal, normally http://127.0.0.1:5173/.
Node 22.12 or later is required. Your Node 22.23.3 is suitable. Keep the terminal
running. Press Ctrl+C to stop. Run these commands in the root folder, not backend.

## Build and serve

```bash
npm run build
npm run preview
```

The build creates `dist/`. Deploy its contents to a static web host. Hash routes
work without server rewrite rules. Legacy URLs such as events.html redirect to
the matching React route. Source is included; generated builds and dependencies
are excluded from the ZIP to avoid duplicating large media files.

## Preserved interactions

- Responsive navigation and mobile menu, circular favicon and floating WhatsApp.
- Home photo gallery, complimentary offer and background videos.
- Events hover details, centred video modal, description, background blur,
  Escape/backdrop/Close dismissal and focus restoration.
- Meeting calendar with Pakistan dates/times, and contact/vendor validation.
- CRM Login/Sign Up tabs and the existing optional Laravel auth adapter.
- Subtle reveals, reduced-motion support, and offscreen video pausing.

## Existing integration status

Contact/meeting forms prepare an email for the visitor to review and send.
A preferred date is not a confirmed booking. Vendor Apply registration prepares
an email excluding bank details and documents; these remain on the device.
The frontend does not save form submissions to a database.

The included `backend/` is the original Laravel backend, unchanged. Configure
and run it separately for live authentication. Set `VITE_CRM_BASE_URL` in a root
`.env` copied from `.env.example`, or `crmBaseUrl` in `public/site-config.js`.
The adapter uses `/sanctum/csrf-cookie`, `/login` and `/register`, credentials and
an XSRF token. Configure its database, CORS, cookies and Sanctum domains. No new
CRM dashboard or account permissions are added by this frontend conversion.

All public pages and components are React; no Vue runtime is required.
Real team photos/names have not been supplied, so existing placeholders remain.
The office map requires internet and uses the supplied address.

## Editing and checks

- `src/views/`: six React pages.
- `src/components/`: navigation, media, gallery, dialog and calendar.
- `src/hooks/useForm.js`: form state, validation and email preparation.
- `src/utils/validation.js`: field and document validation.
- `src/data/events.js`: gallery data.
- `public/assets/`: existing CSS/media and the new home video.

```bash
npm test
npm run build
```

Backend authentication requires separate integration testing against your server.
