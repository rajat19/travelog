const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string) {
  if (!path) {
    return path;
  }

  if (/^(?:https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalizedBasePath = rawBasePath.endsWith('/') ? rawBasePath.slice(0, -1) : rawBasePath;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!normalizedBasePath) {
    return normalizedPath;
  }

  if (
    normalizedPath.startsWith(`${normalizedBasePath}/`) ||
    normalizedPath === normalizedBasePath
  ) {
    return normalizedPath;
  }

  return `${normalizedBasePath}${normalizedPath}`;
}
