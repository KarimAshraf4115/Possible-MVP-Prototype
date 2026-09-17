import { v4 as uuidv4 } from 'uuid';

export const posts = [
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'facebook',
        content: 'Big announcement coming this week 👀 stay tuned!',
        mediaUrls: [],
      },
      {
        platform: 'instagram',
        content: 'Something big is coming 👀 #staytuned',
        mediaUrls: ['/assets/mock/teaser.jpg'],
      },
    ],
    tags: ['announcement'],
    scheduledTime: '2026-09-18T10:00:00',
    status: 'scheduled',
    createdAt: '2026-09-15T14:22:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'facebook',
        content: 'Thanks to everyone who joined our live session today!',
        mediaUrls: [],
      },
    ],
    tags: [],
    scheduledTime: '2026-09-14T18:00:00',
    status: 'published',
    createdAt: '2026-09-14T09:10:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'tiktok', // note: connections.js has TikTok disconnected —
        content: 'Behind-the-scenes of our new product shoot 🎬',
        mediaUrls: ['/assets/mock/bts.mp4'],
      },
    ],
    tags: ['bts'],
    scheduledTime: '2026-09-20T12:00:00',
    status: 'scheduled', // this post exists to test your gray/disabled chip logic
    createdAt: '2026-09-13T11:00:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'instagram',
        content: 'Draft: new collection teaser — need better caption',
        mediaUrls: [],
      },
    ],
    tags: [],
    scheduledTime: null, // drafts have no scheduled time yet
    status: 'draft',
    createdAt: '2026-09-16T08:00:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'facebook',
        content: 'Flash sale ends tonight! Don’t miss out.',
        mediaUrls: [],
      },
    ],
    tags: ['sale'],
    scheduledTime: '2026-09-12T09:00:00',
    status: 'failed', // to test your failure/retry UI
    createdAt: '2026-09-11T16:30:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'facebook',
        content: 'Flash sale ends tonight! Don’t miss out.',
        mediaUrls: [],
      },
    ],
    tags: ['sale'],
    scheduledTime: '2026-09-17T09:00:00',
    status: 'failed', // to test your failure/retry UI
    createdAt: '2026-09-11T16:30:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'facebook',
        content: 'Flash sale ends tonight! Don’t miss out.',
        mediaUrls: [],
      },
    ],
    tags: ['sale'],
    scheduledTime: '2026-09-17T09:00:00',
    status: 'failed', // to test your failure/retry UI
    createdAt: '2026-09-11T16:30:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'facebook',
        content: 'Flash sale ends tonight! Don’t miss out.',
        mediaUrls: [],
      },
    ],
    tags: ['sale'],
    scheduledTime: '2026-09-17T09:00:00',
    status: 'success', // to test your failure/retry UI
    createdAt: '2026-09-11T16:30:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'facebook',
        content: 'Flash sale ends tonight! Don’t miss out.',
        mediaUrls: [],
      },
    ],
    tags: ['sale'],
    scheduledTime: '2026-09-17T09:00:00',
    status: 'failed', // to test your failure/retry UI
    createdAt: '2026-09-11T16:30:00',
  },
  {
    id: uuidv4(),
    platformContent: [
      {
        platform: 'facebook',
        content: 'Flash sale ends tonight! Don’t miss out.',
        mediaUrls: [],
      },
    ],
    tags: ['sale'],
    scheduledTime: '2026-09-17T09:00:00',
    status: 'failed', // to test your failure/retry UI
    createdAt: '2026-09-11T16:30:00',
  },
];