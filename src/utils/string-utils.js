import replaceAll from 'replaceall';

export const isEmptyString = s => !(s && s.trim() !== '');
export const isValidString = s => !isEmptyString(s);

export const isLowerCase = s => s && s.trim() === s.trim().toLowerCase();

export const getHttpsGitURL = url => {
  if (url.startsWith('http')) {
    return url.replace('.git', '');
  } else if (url.startsWith('git@')) {
    return url
      .replace(':', '/')
      .replace('git@', 'https://')
      .replace(/.git([^.git]*)$/, '');
  }
  return url;
};

export const includesLowercase = (a, b) => a.toLowerCase().includes(b.toLowerCase());

export const getLastFromString = (str = '', separator, returnPrevIfLastEmpty) => {
  const splitted = str.split(separator);
  let last = splitted[splitted.length - 1];

  if (returnPrevIfLastEmpty && isEmptyString(last)) {
    const beforeLast = splitted[splitted.length - 2];
    if (beforeLast) {
      return beforeLast;
    }
  }

  return last || '';
};

export const cleanString = (str = '') => {
  let s = str.toLowerCase();
  ['-', '_', '.'].forEach(char => {
    s = replaceAll(char, '', s);
  });
  return s;
};

export const compareFuzzy = (a, b) => a.includes(b) || cleanString(a).includes(b);
