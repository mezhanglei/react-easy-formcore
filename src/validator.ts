import { TriggerType } from "./item-core";
import { validateTriggerCondition } from "./utils/utils";
import { validatorsMap } from "./validate-rules";
export type FormRule = {
  required?: boolean;
  pattern?: RegExp;
  whitespace?: boolean;
  max?: number;
  min?: number;
  message?: string;
  validator?: FormValidator;
  validateTrigger?: TriggerType;
}
export type FormValidatorCallBack = (message?: string) => void;
export type FormValidator = (value: any, callBack?: FormValidatorCallBack) => any | Promise<any>;

/*Validator类*/
export default class Validator {
  rulesMap: { [path: string]: FormRule[] };
  errorsMap: { [path: string]: string | undefined };
  constructor() {
    this.getError = this.getError.bind(this);
    this.setError = this.setError.bind(this);
    this.resetError = this.resetError.bind(this);
    this.start = this.start.bind(this);
    this.add = this.add.bind(this);
    this.rulesMap = {};
    this.errorsMap = {};
  }

  add(path: string, rules?: FormRule[]) {
    if (rules === undefined) {
      if (this.rulesMap[path]) {
        delete this.rulesMap[path];
      }
    } else {
      this.rulesMap[path] = rules;
    }
  }

  getRulesMap() {
    return this.rulesMap;
  }

  getError(path?: string) {
    if (path) {
      return this.errorsMap[path];
    }
  }

  setError(path: string, msg?: string) {
    if (!path) return;
    if (msg === undefined) {
      delete this.errorsMap[path];
    } else {
      this.errorsMap[path] = msg;
    }
  }

  resetError() {
    this.errorsMap = {};
  }

  async start(path: string, value: any, eventName?: TriggerType | boolean) {
    this.setError(path);
    const rules = this.rulesMap[path];
    if (!(rules instanceof Array)) return;
    for (let i = 0; i < rules?.length; i++) {
      const rule = rules?.[i];
      const { validateTrigger, ...rest } = rule || {};
      // 是否可以触发规则
      const canTrigger = validateTriggerCondition(eventName, validateTrigger);
      if (canTrigger) {
        const message = await handleRule(rest, value);
        if (message) {
          this.setError(path, message);
          return message;
        }
      }
    }
  }
}

// 处理单条规则
const handleRule = async (rule: FormRule | undefined, value: any) => {
  if (!rule) return;
  // 默认消息
  const defaultMessage = rule?.message;
  // 参与校验的字段
  const entries = Object.entries(rule)?.filter(([key]) => key !== 'message');

  for (let [ruleKey, ruleValue] of entries) {
    // 自定义校验
    if (ruleKey === 'validator' && typeof ruleValue === 'function') {
      try {
        let msg;
        await ruleValue?.(value, (err) => {
          msg = err;
        });
        return msg;
      } catch (error: any) {
        if (typeof error === 'string') {
          return error;
        }
        if (typeof error?.message == 'string') {
          return error?.message;
        }
        return defaultMessage;
      }
      // 其他字段的校验，返回true表示报错
    } else if (validatorsMap[ruleKey]?.(ruleValue, value) === true) {
      return defaultMessage;
    }
  }
};
