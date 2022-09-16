import { tabs, runtime } from 'webextension-polyfill';

tabs.create({ active: true, url: runtime.getURL('newtab/index.html') }).then(window.close);
