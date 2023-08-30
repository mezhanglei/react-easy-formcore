import { copy } from 'copy-anything';
import compare from 'react-fast-compare';
import { isNumberStr } from './type';

export function deepClone<T = any>(value: T) {
  return copy(value);
}

// 判断两个值是否相等
export function isEqual(a: any, b: any) {
  return compare(a, b);
}

// 接收路径字符串或数组字符串，返回数组字符串表示路径
export function pathToArr(path?: string | string[]) {
  if (path instanceof Array) return path;
  const parts = typeof path === 'string' && path ? path.replace(/\]$/, '').replace(/^\[/, '').split(/\.\[|\]\[|\[|\]\.|\]|\./g) : []
  return parts;
}

// 提取对象中的部分属性
export const pickObject = <T = any>(obj: T | undefined, keys: string[] | ((key?: string, value?: any) => boolean)) => {
  if (obj === undefined || obj === null) return obj;
  if (keys instanceof Array) {
    return keys.reduce((iter, key) => {
      const item = deepGet(obj as any, key);
      if(item !== undefined) {
        iter[key] = item;
      }
      return iter;
    }, {}) as T;
  } else if (typeof keys === 'function') {
    return Object.keys(obj || {}).reduce((iter, key) => {
      const item = deepGet(obj as any, key);
      if (keys(key, item)) {
        iter[key] = item;
      }
      return iter;
    }, {}) as T;
  }
}

// 根据路径获取目标对象中的单个值或多个值
export function deepGet(obj: object | undefined, keys?: string | string[]): any {
  if (!keys?.length) return
  if (keys instanceof Array) {
    const result = obj instanceof Array ? [] : {}
    for (let key of keys) {
      result[key] = pathToArr(key)?.reduce?.((o, k) => (o)?.[k], obj)
    }
    return result;
  } else {
    return pathToArr(keys)?.reduce?.((o, k) => (o)?.[k], obj)
  }
}

// 给对象目标属性添加值, path：['a', 0] 等同于 'a[0]'
export function deepSet(obj: any, path: string | string[], value: any) {
  let temp = deepClone(obj);
  let root = temp;
  const pathIsArr = Array.isArray(path);
  const parts = pathToArr(path);
  const length = parts.length;

  for (let i = 0; i < length; i++) {
    const current = parts[i];
    const next = parts[i + 1];
    // 当前字符是否为数组索引
    const isIndex = pathIsArr ? isNumberStr(current) : path?.indexOf(`[${current}]`) > -1
    // 下个字符是否为数组索引
    const nextIsIndex = pathIsArr ? isNumberStr(next) : path?.indexOf(`[${next}]`) > -1

    // 当传入的值为空赋值初始值
    if (typeof obj !== 'object' && i === 0) {
      if (isIndex) {
        temp = [];
        root = temp;
      } else {
        temp = {};
        root = temp;
      }
    }

    if (i === length - 1) {
      if (value === undefined) {
        if (isIndex) {
          const index = +current;
          temp?.splice(index, 1);
        } else {
          delete temp[current];
        }
      } else {
        temp[current] = value;
      }
    } else if (typeof temp[current] !== 'object' && nextIsIndex) {
      temp[current] = [];
    } else if (typeof temp[current] !== 'object') {
      temp[current] = {};
    }
    temp = temp[current];
  }
  return root;
}
