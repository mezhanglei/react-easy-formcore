import { produce } from 'immer';
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
    const ret = produce(obj, (draft: any) => {
        const parts = !Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path;
        const length = parts.length;

        for (let i = 0; i < length; i++) {
            const p = parts[i];
            // 该字段是否设置为数组
            const isSetArray = arraySetPath?.some((path) => {
                const pathArr = path?.split('.');
                const lastPath = pathArr[pathArr?.length - 1];
                return lastPath === p;
            });

            if (i === length - 1) {
                if(value === undefined) {
                    delete draft[p];
                } else {
                    draft[p] = value;
                }
            } else if (typeof draft[p] !== 'object' && isSetArray) {
                draft[p] = [];
            } else if (typeof draft[p] !== 'object') {
                draft[p] = {};
            }
            draft = draft[p];
        }
    });
    return ret;
}
