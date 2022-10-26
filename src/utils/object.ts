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

// 路径根据规则分割成数组
export function pathToArr(path?: string) {
  return path ? path.replace(/\]$/,'').split(/\.\[|\[\]|\]\[|\[|\]\.|\]|\./g) : [];
}

// 处理将路径中的数组项转换成普通字符串
export function formatName(str: string) {
  return str?.replace(/\[/g, '')?.replace(/\]/g, '');
}

// 根据路径获取目标对象中的值
export function deepGet(obj: object | undefined, keys?: string | string[]): any {
  if(!keys?.length) return
  return (
    (!Array.isArray(keys)
      ? pathToArr(keys)
      : keys
    ).reduce((o, k) => (o)?.[formatName(k)], obj)
  );
}

// 给对象目标属性添加值
export function deepSet(obj: any, path: string | string[], value: any) {
  let temp = deepClone(obj);
  let root = temp;
  const parts = !Array.isArray(path) ? pathToArr(path) : path;
  const length = parts.length;

  for (let i = 0; i < length; i++) {
    const current = parts[i];
    const next = parts[i + 1];
    const currentWithBracket = isNumberStr(current) ? `[${current}]` : undefined
    const nextWithBracket = isNumberStr(next) ? `[${next}]` : undefined
    // 当前字符是否为数组项
    const isListItem = currentWithBracket ? path?.indexOf(currentWithBracket) > -1 : false
    // 下个字段是否为数组项
    const nextIsListItem = nextWithBracket ? path?.indexOf(nextWithBracket) > -1 : false

    // 当传入的值为空赋值初始值
    if (typeof obj !== 'object' && i === 0) {
      if (isListItem) {
        temp = [];
        root = temp;
      } else {
        temp = {};
        root = temp;
      }
    }

    if (i === length - 1) {
      if (value === undefined) {
        if (isListItem) {
          const index = +current;
          temp?.splice(index, 1);
        } else {
          delete temp[current];
        }
      } else {
        temp[current] = value;
      }
    } else if (typeof temp[current] !== 'object' && nextIsListItem) {
      temp[current] = [];
    } else if (typeof temp[current] !== 'object') {
      temp[current] = {};
    }
    temp = temp[current];
  }
  return root;
}
