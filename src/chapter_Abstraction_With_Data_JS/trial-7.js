export const make = (url) => {
  const data = new URL(url)
  return data
}

export const getProtocol = (data) => {
  return data.protocol
}

export const getHost = (data) => {
  return data.host
}

export const getPath = (data) => {
  return data.pathname
}

export const setProtocol = (data, protocol) => {
  data.protocol = protocol
}

export const setHost = (data, host) => {
  data.host = host
}

export const setPath = (data, path) => {
  data.pathname = path
}

export const getQueryParam = (data, paramName, defaultValue = null) =>
  data.searchParams.get(paramName) || defaultValue

export const setQueryParam = (data, key, value) => {
  data.searchParams.set(key, value)
}

export const toString = (data) => {
  return data.toString()
}
