const queryString = (obj: object) =>
  Object.entries(obj)
    .map(([key, value]) =>
      value ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : null
    )
    .filter(Boolean)
    .join('&');

export default queryString;
