import {
  useActionState,
  useMemo,
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
} from 'react';

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
}

type FieldKey = keyof FormValues;

const initialValues: FormValues = {
  username: '',
  email: '',
  password: '',
  confirm: '',
  agree: false,
};

interface SubmitState {
  ok: boolean;
  message: string;
}

const initialSubmitState: SubmitState = { ok: false, message: '' };

function validate(values: FormValues): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};
  if (!/^\w{3,12}$/.test(values.username)) {
    errors.username = '3-12 位字母、数字或下划线';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '邮箱格式不正确';
  }
  if (values.password.length < 8) {
    errors.password = '密码至少 8 位';
  } else if (!/[a-zA-Z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = '需要同时包含字母和数字';
  }
  if (values.confirm !== values.password) {
    errors.confirm = '两次输入的密码不一致';
  }
  if (!values.agree) {
    errors.agree = '请先勾选用户协议';
  }
  return errors;
}

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 480,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 24,
  borderRadius: 14,
  border: '1px solid #e2e8f0',
  background: '#fff',
  marginTop: 16,
};

const input: CSSProperties = {
  width: '100%',
  padding: '9px 11px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  boxSizing: 'border-box',
};

const btn: CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 13 };

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Field({ label, error, ...rest }: FieldProps) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>{label}</span>
      <input
        style={{ ...input, borderColor: error ? '#ef4444' : '#cbd5e1' }}
        {...rest}
      />
      {error && (
        <em style={{ display: 'block', color: '#ef4444', fontSize: 13, marginTop: 4, fontStyle: 'normal' }}>
          {error}
        </em>
      )}
    </label>
  );
}

export default function App() {
  const [epoch, setEpoch] = useState(0);

  return (
    <main style={page}>
      <h1>009 · 表单校验</h1>
      <p style={muted}>
        错误信息用 useMemo 从表单值派生，配合 touched 记录「碰过」的字段，只有碰过才显示错误
      </p>
      <RegisterForm key={epoch} onRestart={() => setEpoch((e) => e + 1)} />
    </main>
  );
}

function RegisterForm({ onRestart }: { onRestart: () => void }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  const [submitState, submitAction, isPending] = useActionState(
    async (_prevState: SubmitState, _formData: FormData): Promise<SubmitState> => {
      await new Promise((resolve) => setTimeout(resolve, 900));
      return { ok: true, message: `欢迎加入，${values.username}！` };
    },
    initialSubmitState
  );

  const update = (key: Exclude<FieldKey, 'agree'>, value: string) => {
    setValues((prev) => {
      const next = { ...prev };
      next[key] = value;
      return next;
    });
  };

  const markTouched = (key: FieldKey) => setTouched((prev) => ({ ...prev, [key]: true }));

  if (submitState.ok) {
    return (
      <section style={{ ...card, textAlign: 'center' }}>
        <h2 style={{ marginBottom: 8 }}>注册成功</h2>
        <p style={muted}>{submitState.message}</p>
        <button style={btn} onClick={onRestart}>
          再填一次
        </button>
      </section>
    );
  }

  return (
    <form style={card} action={submitAction} noValidate>
      <Field
        label="用户名"
        value={values.username}
        placeholder="如 react_learner"
        error={touched.username ? errors.username : undefined}
        onChange={(e) => update('username', e.target.value)}
        onBlur={() => markTouched('username')}
      />
      <Field
        label="邮箱"
        type="email"
        value={values.email}
        placeholder="you@example.com"
        error={touched.email ? errors.email : undefined}
        onChange={(e) => update('email', e.target.value)}
        onBlur={() => markTouched('email')}
      />
      <Field
        label="密码"
        type="password"
        value={values.password}
        placeholder="至少 8 位，包含字母和数字"
        error={touched.password ? errors.password : undefined}
        onChange={(e) => update('password', e.target.value)}
        onBlur={() => markTouched('password')}
      />
      <Field
        label="确认密码"
        type="password"
        value={values.confirm}
        placeholder="再输入一次密码"
        error={touched.confirm ? errors.confirm : undefined}
        onChange={(e) => update('confirm', e.target.value)}
        onBlur={() => markTouched('confirm')}
      />

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <input
          type="checkbox"
          checked={values.agree}
          onChange={(e) => setValues((prev) => ({ ...prev, agree: e.target.checked }))}
          onBlur={() => markTouched('agree')}
        />
        我已阅读并同意用户协议
      </label>
      {touched.agree && errors.agree && (
        <p style={{ color: '#ef4444', fontSize: 13, margin: '0 0 12px' }}>{errors.agree}</p>
      )}

      <button
        type="submit"
        style={{ ...btn, opacity: isValid ? 1 : 0.5, cursor: isValid ? 'pointer' : 'not-allowed' }}
        disabled={!isValid || isPending}
      >
        {isPending ? '提交中…' : '注册'}
      </button>
      {!isValid && (
        <span style={{ ...muted, marginLeft: 12 }}>把表单填完整就能提交</span>
      )}
    </form>
  );
}
