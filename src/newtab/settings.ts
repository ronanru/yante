import { storage } from 'webextension-polyfill';
import { writable } from 'svelte/store';

const defaultSettings = {
    theme: 'light',
    background: 'default',
    blocks: [
      {
        id: '5028306d-a6a9-4068-b6bd-8233f862323f',
        type: 'search',
        settings: {
          provider: 'DuckDuckGo',
          suggestions: true
        }
      },
      {
        id: '48b81ae3-4de7-4399-b32f-abb14ef43213',
        type: 'topSites',
        settings: null
      }
    ]
  },
  settings = writable(defaultSettings);

settings.subscribe(({ theme }) =>
  document.body.classList[theme === 'light' ? 'remove' : 'add']('dark')
);

storage.sync.get().then(s => {
  settings.set(
    Object.fromEntries(
      Object.keys(defaultSettings).map(e => [e, s[e] || defaultSettings[e]])
    ) as any
  );

  settings.subscribe(s => storage.sync.set(s));
});

export default settings;
