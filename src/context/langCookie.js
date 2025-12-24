function getCookie(name) {
  const pattern = new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)');
  const match = typeof document !== 'undefined' ? document.cookie.match(pattern) : null;
  return match ? decodeURIComponent(match[1]) : null;
}

export function getLangCookie() {
  return getCookie('ar_lang');
}

export function setLangCookie(lang) {
  if (lang !== 'ko' && lang !== 'en') return;

  const oneYear = 60 * 60 * 24 * 365;
  const isBrowser = typeof window !== 'undefined' && typeof window.location !== 'undefined';
  const host = isBrowser ? window.location.hostname : '';
  const protocol = isBrowser ? window.location.protocol : '';
  const isAvataroad = isBrowser && /\.avataroad\.com$/.test(host);
  const isHttps = protocol === 'https:';

  const parts = [
    `ar_lang=${encodeURIComponent(lang)}`,
    'Path=/',
    `Max-Age=${oneYear}`,
    'SameSite=Lax',
  ];

  if (isAvataroad) {
    parts.push('Domain=.avataroad.com');
  }
  if (isHttps) {
    parts.push('Secure');
  }

  if (typeof document !== 'undefined') {
    document.cookie = parts.join('; ');
  }
}

export function getNickNameCookie() {
  return getCookie('ar_nickname');
}

export function setNickNameCookie(nickName) {
  if (!nickName) return;

  const oneYear = 60 * 60 * 24 * 365;
  const isBrowser = typeof window !== 'undefined' && typeof window.location !== 'undefined';
  const host = isBrowser ? window.location.hostname : '';
  const protocol = isBrowser ? window.location.protocol : '';
  const isAvataroad = isBrowser && /\.avataroad\.com$/.test(host);
  const isHttps = protocol === 'https:';

  const parts = [
    `ar_nickname=${encodeURIComponent(nickName)}`,
    'Path=/',
    `Max-Age=${oneYear}`,
    'SameSite=Lax',
  ];

  if (isAvataroad) {
    parts.push('Domain=.avataroad.com');
  }
  if (isHttps) {
    parts.push('Secure');
  }

  if (typeof document !== 'undefined') {
    document.cookie = parts.join('; ');
  }
}

export default {
  getLangCookie,
  setLangCookie,
  getNickNameCookie,
  setNickNameCookie,
};


