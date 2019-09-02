const os = require("./func/pcOrphone.js")
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

let swRegistration, isSubscribed;
const applicationServerPublicKey = 'BJ-3UKBbC70fBJtDE5yka32ZG62YFSh5-twjju8H7zxFxXhBx75kkhufxkmbU3cejjmIwAf-RsX5fvQXxNLGoLY';
const notice = document.getElementById('notice');
const noticeYes = document.getElementById('noticeYes');
const noticeNo = document.getElementById('noticeNo');


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
        askPermission();
        if (os.os.isPhone || os.os.isAndroid) {
          console.log("手机");
        } else if (os.os.isTablet) {
          console.log("平板");
        } else if (os.os.isPc) {
          console.log("电脑");
        }
      }
    });
}

// 订阅用户
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function (subscription) {
      console.log('User is subscribed:', subscription);
      isSubscribed = true;
      notice.display = 'block';
      notice.style.display = 'block';
      noticeYes.addEventListener('click', function (e) {
        // 
        var title = 'Yay a message.';
        var body = '您已开启chrome通知';
        var icon = '/img/hp.png';
        var tag = 'simple-push-demo-notification-tag';
        var data = {
          doge: {
            wow: 'such amaze notification data'
          }
        };
        const notification = new Notification("Hi，恭喜哟", {
          body: body,
          icon: icon,
          tag: tag,
          data: data
        });
        notification.onclick = function () {
          notification.close();
          notice.display = 'none';
          notice.style.display = 'none';
        };

      })

    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err);
    });
}


// 显示推送提示
function askPermission() {
  // Notification.requestPermission(function (permission) {
  //   // 用户同意使用通知
  //   if (!('permission' in Notification)) {
  //     Notification.permission = permission;
  //   }
  //   if (permission === "granted") {
  //     // 创建 Notification
  //     var notification = new Notification("Hey guy!");
  //   }
  // });

  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then(function (permissionResult) {
      console.log(permissionResult)
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
      else {
        subscribeUser();
      }
    });
}



export function register(config) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    if ('actions' in Notification.prototype) {
      // Action buttons are supported
      console.log('Notification can work')
    }
    else {
      // Action buttons are NOT supported
      console.log('Notification can work')
    }



    // install app
    let deferredPrompt;
    const addBtn = document.getElementById('btn-install-app')

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      deferredPrompt = e
      addBtn.addEventListener('click', e => {
        deferredPrompt.prompt()
        deferredPrompt.userChoice
          .then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
              console.log('user accepted A2HS prompt')
            } else {
              console.log('user dismissed A2HS prompt')
            }
            deferredPrompt = null
          })
      })
    })
    // 
    window.addEventListener('offline', function () {
      Notification.requestPermission().then(grant => {
        if (grant !== 'granted') {
          return;
        }
        const notification = new Notification("Hi，网络不给力哟", {
          body: '您的网络貌似离线了，不过在志文工作室里访问过的页面还可以继续打开~',
          icon: './img/hp.png'
        });
        notification.onclick = function () {
          notification.close();
        };
      });
    });

    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });


      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }

    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {

      console.log('Service Worker is registered', registration);
      swRegistration = registration;

      initialiseUI();
      // // 
      // window.addEventListener('push', function (event) {
      //   var title = 'Yay a message.';
      //   var body = 'We have received a push message.';
      //   var icon = '/img/hp.png';
      //   var tag = 'simple-push-demo-notification-tag';
      //   var data = {
      //     doge: {
      //       wow: 'such amaze notification data'
      //     }
      //   };
      //   event.waitUntil(
      //     window.registration.showNotification(title, {
      //       body: body,
      //       icon: icon,
      //       tag: tag,
      //       data: data
      //     })
      //   );
      // });


      // registration.showNotification('Simple Title', {
      //   body: 'Simple piece of body text.\nSecond line of body text :)'
      // });

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
      console.warn('Push messaging is not supported');
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {

      response.showNotification('Hello World2!');
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
