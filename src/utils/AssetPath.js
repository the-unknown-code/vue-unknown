import config, { Variable } from '@/config'

export const getVersioned = (path) => {
  const versionRoot = config.variables[Variable.VERSIONED_STATIC_ROOT]
  return `${versionRoot}${path}`
}

export const getStatic = (path) => {
  const staticRoot = config.variables[Variable.STATIC_ROOT]
  return `${staticRoot}${path}`
}
