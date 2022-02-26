import { klona } from 'klona';
// 判断两个值是否相等
export function isObjectEqual(a: any, b: any) {
  if (!(typeof a == 'object' && typeof b === 'object')) {
    return a === b;
  };
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    let propA = a[propName];
    let propB = b[propName];
    if ((typeof (propA) === 'object')) {
      if (!isObjectEqual(propA, propB)) {
        return false;
      }
    } else if (propA !== propB) {
      return false;
    }
  }
  return true;
}

// 根据路径获取目标对象中的值
export function deepGet(obj: object | undefined, keys: string | string[]): any {
  return (
    (!Array.isArray(keys)
      ? keys.replace(/\[/g, '.').replace(/\]/g, '').split('.')
      : keys
    ).reduce((o, k) => (o || {})[k], obj)
  );
}

// 给对象目标属性添加值
export function deepSet(obj: any, path: string | string[], value: any, arraySetPath?: Array<string>) {
  if (typeof obj !== 'object') return obj;
  let temp = klona(obj);
  const root = temp;
  const parts = !Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path;
  const length = parts.length

  for (let i = 0; i < length; i++) {
    const p = parts[i]
    // 该字段是否设置为数组
    const isSetArray = arraySetPath?.some((path) => {
      const end = path?.split('.')?.pop();
      return end === p;
    });
    if (i === length - 1) {
      if (value === undefined) {
        delete temp[p];
      } else {
        temp[p] = value;
      }
    } else if (typeof temp[p] !== 'object' && isSetArray) {
      temp[p] = [];
    } else if (typeof temp[p] !== 'object') {
      temp[p] = {};
    }
    temp = temp[p]
  }
  return root;
}