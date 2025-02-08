export const isUndef = (val: any): boolean => typeof val === 'undefined'
export const isDef = (val: any): boolean => typeof val !== 'undefined'
export const isBoolean = (val: any): boolean => typeof val === 'boolean'
export const isTrue = (val: any): boolean => val === true
export const isFalse = (val: any): boolean => val === false
export const isString = (val: any): boolean => typeof val === 'string'
export const isNumber = (val: any): boolean => typeof val === 'number'
export const isSymbol = (val: any): boolean => typeof val === 'symbol'
export const isObject = (val: any): boolean => val !== null && typeof val === 'object'
export const isArray = Array.isArray
export const isFunction = (val: any): boolean => typeof val === 'function'
export const objectToString = Object.prototype.toString
export const toTypeString = (val: any): string => objectToString.call(val)
export const isMap = (val: any): boolean => toTypeString(val) === '[object Map]'
export const isSet = (val: any): boolean => toTypeString(val) === '[object Set]'
export const isDate = (val: any): boolean => toTypeString(val) === '[object Date]'
export const isPromise = (val: any): boolean => isObject(val) && isFunction(val.then) && isFunction(val.catch)
export function isEmpty(val: any): boolean {
  if (val == null)
    return true
  if (typeof val === 'boolean')
    return false
  if (typeof val === 'number')
    return !val
  if (val instanceof Error)
    return val.message === ''
  switch (Object.prototype.toString.call(val)) {
    case '[object String]':
    case '[object Array]':
      return !val.length
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }
  return false
}
export const isEven = (val: any): boolean => val % 2 === 0

export function catchError<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T]
    })
    .catch((error) => {
      if (errorsToCatch == null) {
        return [error]
      }
      if (errorsToCatch.some(e => error instanceof e)) {
        return [error]
      }

      throw error
    })
}
