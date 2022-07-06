import { copy } from 'copy-anything';
import compare from 'react-fast-compare';

export function deepClone<T = any>(value: T) {
  return copy(value);
}

// 判断两个值是否相等
export function isEqual(a: any, b: any) {
  return compare(a, b);
}

// 路径根据规则分割成数组
export function pathToArr (path: string) {
  return path?.replace?.(/\[/g, '.')?.replace(/\]/g, '')?.split('.');
}

// 处理将路径中的数组项转换成普通字符串
export function formatPath(str: string) {
  return str?.replace(/\[/g, '')?.replace(/\]/g, '');
}

// 根据路径获取目标对象中的值
export function deepGet(obj: object | undefined, keys: string | string[]): any {
  return (
    (!Array.isArray(keys)
      ? pathToArr(keys)
      : keys
    ).reduce((o, k) => (o)?.[formatPath(k)], obj)
  );
}

// 给对象目标属性添加值
export function deepSet(obj: any, path: string | string[], value: any) {
  let temp = deepClone(obj);
  let root = temp;
  const parts = !Array.isArray(path) ? pathToArr(path) : path;
  const length = parts.length;
  // 过滤出其中的数组项
  const listItems = !Array.isArray(path) ? path.match(/\[(.{1}?)\]/gi) : path;

  for (let i = 0; i < length; i++) {
    const p = parts[i];
    const next = parts[i + 1];
    // 下个字段是否为数组项
    const nextIsListItem = listItems?.some((item) => {
      const listItem = formatPath(item);
      return listItem === next;
    });
    // 当前字段是否为数组项
    const isListItem = listItems?.some((item) => {
      const listItem = formatPath(item);
      return listItem === p;
    });

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
          const index = +p;
          temp?.splice(index, 1);
        } else {
          delete temp[p];
        }
      } else {
        temp[p] = value;
      }
    } else if (typeof temp[p] !== 'object' && nextIsListItem) {
      temp[p] = [];
    } else if (typeof temp[p] !== 'object') {
      temp[p] = {};
    }
    temp = temp[p];
  }
  return root;
}