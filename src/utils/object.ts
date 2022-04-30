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
    ).reduce((o, k) => (o || {})[k?.replace(/\[/g, '').replace(/\]/g, '')], obj)
  );
}

// 给对象目标属性添加值
export function deepSet(obj: any, path: string | string[], value: any) {
  if (typeof obj !== 'object') return obj;
  let temp = klona(obj);
  const root = temp;
  const parts = !Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path;
  const length = parts.length;
  // 过滤出其中的数组项
  const listItems = !Array.isArray(path) ? path.match(/\[(.{1}?)\]/gi) : path;

  for (let i = 0; i < length; i++) {
    const p = parts[i];
    const next = parts[i + 1];
    // 下个字段是否为数组项
    const isListItem = listItems?.some((item) => {
      const listItem = item?.replace(/\[/g, '').replace(/\]/g, '')
      return listItem === next;
    });

    if (i === length - 1) {
      if (value === undefined) {
        delete temp[p];
      } else {
        temp[p] = value;
      }
    } else if (typeof temp[p] !== 'object' && isListItem) {
      temp[p] = [];
    } else if (typeof temp[p] !== 'object') {
      temp[p] = {};
    }
    temp = temp[p];
  }
  return root;
}