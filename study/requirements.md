# Functional Requirements — Social Media Scheduler (Mockup Prototype)

**Platform:** Web application (Next.js)
**Goal of this phase:** Clickable/mocked prototype to validate UX and idea with real users — no live platform integrations yet. All publishing is simulated via mocked backends (`MockFacebookPublisher`, `MockInstagramPublisher`, `MockTikTokPublisher`).

---

## 1. Account & Platform Connection

**FR-1.1** — User can sign up / log in to the application (mock auth is acceptable for prototype: email + password, no real verification needed).

**FR-1.2** — User can view a list of supported platforms to connect: Facebook, Instagram, TikTok.

**FR-1.3** — User can initiate a "Connect" flow per platform. In the prototype, this is a **simulated OAuth screen** (fake consent screen + fake account picker) — no real Meta/TikTok API call.

**FR-1.4** — After connecting, the platform shows as "Connected" with a mock account name/avatar displayed.

**FR-1.5** — User can disconnect a previously connected platform at any time.

**FR-1.6** — User can see a clear reason if a mock "connection" fails (e.g. simulated expired session), matching the real-world token-expiry scenario this prototype is meant to test UX for.

---

## 2. Post Composer

**FR-2.1** — User can create a new post from a "New Post" action.

**FR-2.2** — User can write post text/caption content.

**FR-2.3** — User can attach media (image/video) to a post — file upload, stored locally/mock for prototype purposes (no real CDN needed).

**FR-2.4** — User can select one or more connected platforms to publish the post to (multi-select: Facebook, Instagram, TikTok).

**FR-2.5** — User can optionally customize post content per platform (i.e. same base post, tailored caption per platform) rather than being forced to post identical content everywhere.

**FR-2.6** — User can pick an exact publish date and time for the post (calendar model — no auto-slotting/queue in this phase).

**FR-2.7** — User can save a post as a Draft without scheduling it.

**FR-2.8** — User can edit a scheduled or draft post before its publish time.

**FR-2.9** — User can delete/cancel a scheduled post before its publish time.

**FR-2.10** — User can preview how a post will actually render on each selected platform (per-platform layout/preview) before publishing — not just a single generic preview.

**FR-2.11** — User can create a "Post Family": select one media + caption (with optional per-platform tweaks) once, and the system publishes it as linked instances across all selected platforms. When editing or deleting a post that belongs to a Post Family, the user sees a selector defaulting to "All," with each individual platform also listed — allowing the user to select any combination of specific platforms (not just one or all), so edits/deletes can apply to the whole family, a single platform, or any chosen subset.

---

## 3. Content Calendar View

**FR-3.1** — User can view all scheduled posts in a calendar layout (month/week view).

**FR-3.2** — Each calendar entry shows: post preview (thumbnail/snippet), scheduled time, and target platform(s) (e.g. small platform icons).

**FR-3.3** — User can click a calendar entry to open/edit that post.

**FR-3.4** — User can visually distinguish post status on the calendar: Scheduled / Published / Failed / Draft (e.g. by color or icon).

---

## 4. Publishing Simulation & Reliability

**FR-4.1** — At the scheduled time, the mocked backend simulates publishing the post to each selected platform independently (each platform can succeed or fail independently — not an all-or-nothing outcome).

**FR-4.2** — The prototype must be able to simulate a **failure state** per platform (e.g. mock "token expired" or "rate limited" errors), configurable for testing purposes.

**FR-4.3** — User receives a visible notification (in-app, e.g. banner or notification center) when a scheduled post succeeds or fails.

**FR-4.4** — On failure, the user can see the specific reason (mocked) and can choose to retry publishing manually.

**FR-4.5** — Published posts move to a "Published" state, visible in a history/log view — not just the calendar.

---

## 5. Post History / Activity Log

**FR-5.1** — User can view a chronological list of all past post activity: what was published, where, when, and whether it succeeded or failed.

**FR-5.2** — User can filter this history by platform and/or status (Published / Failed).

*(Note: cross-platform analytics — likes/comments/shares aggregation — is explicitly out of scope for this prototype; see Section 6.)*

---

## 6. Explicitly Out of Scope for This Prototype

- Real OAuth / live platform API integrations (Meta App Review, TikTok Content Posting API)
- X/Twitter and WhatsApp as platforms
- Recurring/repeating posts
- Bulk scheduling / CSV upload
- Media library (reusable asset storage across posts)
- Best-time-to-post AI suggestions
- Link shortening / click tracking
- Approval workflows / multi-account (agency) management
- Cross-platform analytics dashboard
- Queue/slot-based auto-scheduling
- Real payment integration (EGP pricing/local payment methods — business decision, not needed for a UX-validation prototype)

---

## 7. Non-Functional Notes (prototype-level, not production)

- **NFR-1** — Mocked publishers should be swappable for real publisher implementations later without changing the composer/calendar UI (Open/Closed principle — new platforms or real integrations plug in without rewriting existing code).
- **NFR-2** — Prototype should be usable on both desktop and mobile browser widths, since target users will likely evaluate it on mobile.
- **NFR-3** — No real user credentials for social platforms should ever be requested or stored, even in mock flows — the OAuth simulation should look and behave like the real (password-free) flow to test the right trust signals with users.