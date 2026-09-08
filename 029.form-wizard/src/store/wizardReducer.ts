export interface WizardValues {
  nickname: string;
  phone: string;
  email: string;
  interests: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  newsletter: boolean;
}

export const initialWizardValues: WizardValues = {
  nickname: '',
  phone: '',
  email: '',
  interests: [],
  level: 'beginner',
  newsletter: true,
};

export type WizardAction =
  | { type: 'update'; field: keyof WizardValues; value: string | boolean | string[] }
  | { type: 'toggleInterest'; interest: string }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'submit' }
  | { type: 'restart' };

export interface WizardState {
  step: number;
  values: WizardValues;
  submitted: boolean;
}

export const TOTAL_STEPS = 3;

export const initialWizardState: WizardState = {
  step: 1,
  values: initialWizardValues,
  submitted: false,
};

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value } as WizardValues,
      };
    case 'toggleInterest': {
      const has = state.values.interests.includes(action.interest);
      return {
        ...state,
        values: {
          ...state.values,
          interests: has
            ? state.values.interests.filter((i) => i !== action.interest)
            : [...state.values.interests, action.interest],
        },
      };
    }
    case 'next':
      return { ...state, step: Math.min(TOTAL_STEPS, state.step + 1) };
    case 'back':
      return { ...state, step: Math.max(1, state.step - 1) };
    case 'submit':
      return { ...state, submitted: true };
    case 'restart':
      return initialWizardState;
    default:
      return state;
  }
}

export function stepErrors(step: number, values: WizardValues): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 1) {
    if (values.nickname.trim().length < 2) {
      errors.nickname = '昵称至少 2 个字符';
    }
    if (!/^1\d{10}$/.test(values.phone)) {
      errors.phone = '请输入 11 位手机号';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = '邮箱格式不正确';
    }
  }
  if (step === 2 && values.interests.length === 0) {
    errors.interests = '至少选择一个感兴趣的方向';
  }
  return errors;
}
