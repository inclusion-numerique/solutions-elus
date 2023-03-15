export const parseArraySearchParam = <T extends string>(
  param?: T | T[],
): T[] => {
  if (Array.isArray(param)) {
    return param
  }

  if (typeof param === 'string') {
    return [param]
  }

  return []
}
