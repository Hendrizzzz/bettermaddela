import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'BetterAurora.org | Official Portal',
        short_name: 'BetterAurora',
        description: 'Your digital gateway to LGU Aurora services, news, and public information.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0032a0',
        orientation: 'portrait-primary',
        scope: '/',
        lang: 'en',
        dir: 'ltr',
        icons: [
            {
                src: '/assets/images/logo/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/assets/images/logo/icon-192-maskable.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/assets/images/logo/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/assets/images/logo/icon-512-maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        categories: ['government', 'utilities', 'news'],
        screenshots: [
            {
                src: '/assets/images/banners/screenshot-wide.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
            },
            {
                src: '/assets/images/banners/screenshot-narrow.png',
                sizes: '750x1334',
                type: 'image/png',
                form_factor: 'narrow',
            },
        ],
    };
}
