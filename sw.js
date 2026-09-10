/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-b1bafff1'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "index.html",
    "revision": "6237738ab76458a3cee1b23716a347d4"
  }, {
    "url": "assets/workbox-window.prod.es5-BBnX5xw4.js",
    "revision": null
  }, {
    "url": "assets/sparkles-Cp0bpw_n.js",
    "revision": null
  }, {
    "url": "assets/share-2-D1Cg4Oep.js",
    "revision": null
  }, {
    "url": "assets/search-BwY1JOvv.js",
    "revision": null
  }, {
    "url": "assets/proxy-DrfX3lyj.js",
    "revision": null
  }, {
    "url": "assets/progress-share-D1y4zrpU.js",
    "revision": null
  }, {
    "url": "assets/printer-DYy_h6IW.js",
    "revision": null
  }, {
    "url": "assets/print-BDpl2GLU.js",
    "revision": null
  }, {
    "url": "assets/map-pin-BGqpAl-X.js",
    "revision": null
  }, {
    "url": "assets/lessons-B_NQm9_7.js",
    "revision": null
  }, {
    "url": "assets/jsx-runtime-BhLhZffr.js",
    "revision": null
  }, {
    "url": "assets/index-rrWTCmjz.js",
    "revision": null
  }, {
    "url": "assets/index-Bjfrkpxk.css",
    "revision": null
  }, {
    "url": "assets/house-C9hNqdiP.js",
    "revision": null
  }, {
    "url": "assets/glossary-9CeA4LNS.js",
    "revision": null
  }, {
    "url": "assets/figures-Cw1ZR9oH.js",
    "revision": null
  }, {
    "url": "assets/external-link-B4O05eJO.js",
    "revision": null
  }, {
    "url": "assets/circle-check-WoYz1wM5.js",
    "revision": null
  }, {
    "url": "assets/circle-CRkYOBlL.js",
    "revision": null
  }, {
    "url": "assets/check-DtBBNn75.js",
    "revision": null
  }, {
    "url": "assets/book-open-BdFYsbK6.js",
    "revision": null
  }, {
    "url": "assets/arrow-right-BnBJvd-B.js",
    "revision": null
  }, {
    "url": "assets/arrow-left-B2CyijL0.js",
    "revision": null
  }, {
    "url": "assets/TimelinePage-D0_RGU--.js",
    "revision": null
  }, {
    "url": "assets/ThemePage-DXCKIXtt.js",
    "revision": null
  }, {
    "url": "assets/ShareProgressPage-CLChX-zQ.js",
    "revision": null
  }, {
    "url": "assets/QuizPage-XqI9KTHf.js",
    "revision": null
  }, {
    "url": "assets/PrintPackPage-Dj4kJMp5.js",
    "revision": null
  }, {
    "url": "assets/NotFound-DTZ3dr-H.js",
    "revision": null
  }, {
    "url": "assets/MapPage-Q4s2ZF2G.js",
    "revision": null
  }, {
    "url": "assets/LessonPage-9F5yj0l9.js",
    "revision": null
  }, {
    "url": "assets/LearnPage-DvRmBuk7.js",
    "revision": null
  }, {
    "url": "assets/JourneyPage-BpDJCjt6.js",
    "revision": null
  }, {
    "url": "assets/Home-KJAh25Ka.js",
    "revision": null
  }, {
    "url": "assets/GlossaryPage-BGlqRObo.js",
    "revision": null
  }, {
    "url": "assets/FiguresGallery-CLdDGe-P.js",
    "revision": null
  }, {
    "url": "assets/FigurePortrait-C-bdHj9J.js",
    "revision": null
  }, {
    "url": "assets/FigurePage-PQEhDyLu.js",
    "revision": null
  }, {
    "url": "assets/DiscoverPage-C2EC8Iup.js",
    "revision": null
  }, {
    "url": "assets/ConnectionsPage-_qBfvuKX.js",
    "revision": null
  }, {
    "url": "assets/AppShell-Bz3VGSSt.js",
    "revision": null
  }, {
    "url": "__manus__/debug-collector.js",
    "revision": "45b1e83bacf2dc3d3b20bb18b465abe0"
  }, {
    "url": "manifest.webmanifest",
    "revision": "b066a88a77da96f2e7ef27471aedfbd4"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/index.html")));
  workbox.registerRoute(/^https:\/\/files\.manuscdn\.com\//, new workbox.CacheFirst({
    "cacheName": "revolution-nights-artwork",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 15552000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/\/manus-storage\//, new workbox.CacheFirst({
    "cacheName": "revolution-nights-media",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 80,
      maxAgeSeconds: 7776000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, new workbox.StaleWhileRevalidate({
    "cacheName": "revolution-nights-fonts",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
