import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
function createRemoteCollection(fetchEndpoint) {
  let _cache
  return async () => {
    if (_cache)
      return _cache
    const res = await fetch(fetchEndpoint).then(r => r.json())
    _cache = res
    return res
  }
}

export const collections = {
  'fa6-solid': () => require('@iconify-json/fa6-solid/icons.json'),
  'heroicons': () => require('@iconify-json/heroicons/icons.json'),
  'vscode-icons': () => require('@iconify-json/vscode-icons/icons.json'),
}