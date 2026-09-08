import {
  useMemo,
  useReducer,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
} from 'react';
import { StepBar } from './components/StepBar';
import {
  initialWizardState,
  stepErrors,
  TOTAL_STEPS,
  wizardReducer,
  type WizardAction,
  type WizardValues,
} from './store/wizardReducer';

const INTERESTS = ['前端工程', '后端架构', '移动端', '数据可视化', 'DevOps', 'AI 应用'];

const levelLabel: Record<WizardValues['level'], string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '深入',
};

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 560,
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

const ghostBtn: CSSProperties = {
  ...btn,
  background: '#f1f5f9',
  color: '#334155',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>{label}</span>
      {children}
      {error && (
        <em style={{ display: 'block', color: '#ef4444', fontSize: 13, marginTop: 4, fontStyle: 'normal' }}>
          {error}
        </em>
      )}
    </label>
  );
}

interface StepProps {
  values: WizardValues;
  dispatch: Dispatch<WizardAction>;
  errors: Record<string, string>;
}

function StepOne({ values, dispatch, errors }: StepProps) {
  return (
    <div>
      <Field label="昵称" error={errors.nickname}>
        <input
          style={input}
          value={values.nickname}
          placeholder="怎么称呼你？"
          onChange={(e) => dispatch({ type: 'update', field: 'nickname', value: e.target.value })}
        />
      </Field>
      <Field label="手机号" error={errors.phone}>
        <input
          style={input}
          value={values.phone}
          placeholder="11 位手机号"
          onChange={(e) => dispatch({ type: 'update', field: 'phone', value: e.target.value })}
        />
      </Field>
      <Field label="邮箱" error={errors.email}>
        <input
          style={input}
          value={values.email}
          placeholder="you@example.com"
          onChange={(e) => dispatch({ type: 'update', field: 'email', value: e.target.value })}
        />
      </Field>
    </div>
  );
}

function StepTwo({ values, dispatch, errors }: StepProps) {
  return (
    <div>
      <Field label="感兴趣的方向" error={errors.interests}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {INTERESTS.map((interest) => (
            <label key={interest} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={values.interests.includes(interest)}
                onChange={() => dispatch({ type: 'toggleInterest', interest })}
              />
              {interest}
            </label>
          ))}
        </div>
      </Field>
      <Field label="当前水平">
        <div style={{ display: 'flex', gap: 14 }}>
          {(Object.keys(levelLabel) as WizardValues['level'][]).map((level) => (
            <label key={level} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                name="level"
                checked={values.level === level}
                onChange={() => dispatch({ type: 'update', field: 'level', value: level })}
              />
              {levelLabel[level]}
            </label>
          ))}
        </div>
      </Field>
      <Field label="接收上新通知">
        <input
          type="checkbox"
          checked={values.newsletter}
          onChange={(e) =>
            dispatch({ type: 'update', field: 'newsletter', value: e.target.checked })
          }
        />
      </Field>
    </div>
  );
}

function StepThree({ values }: StepProps) {
  return (
    <div style={{ lineHeight: 2 }}>
      <h3 style={{ marginTop: 0 }}>确认信息</h3>
      <p>昵称：{values.nickname || '（空）'}</p>
      <p>手机：{values.phone || '（空）'}</p>
      <p>邮箱：{values.email || '（空）'}</p>
      <p>方向：{values.interests.length > 0 ? values.interests.join('、') : '（未选）'}</p>
      <p>水平：{levelLabel[values.level]}</p>
      <p>通知：{values.newsletter ? '接收' : '不接收'}</p>
      <p style={{ ...muted, fontSize: 13 }}>检查无误后点「提交」完成注册。</p>
    </div>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(wizardReducer, initialWizardState);
  const errors = useMemo(
    () => stepErrors(state.step, state.values),
    [state.step, state.values]
  );
  const errorCount = Object.keys(errors).length;

  if (state.submitted) {
    return (
      <main style={page}>
        <section style={{ ...card, textAlign: 'center' }}>
          <h1>提交成功</h1>
          <div style={{ textAlign: 'left', lineHeight: 2, marginBottom: 16 }}>
            <p>昵称：{state.values.nickname}</p>
            <p>手机：{state.values.phone}</p>
            <p>邮箱：{state.values.email}</p>
            <p>方向：{state.values.interests.join('、')}</p>
            <p>水平：{levelLabel[state.values.level]}</p>
            <p>通知：{state.values.newsletter ? '接收' : '不接收'}</p>
          </div>
          <button style={btn} onClick={() => dispatch({ type: 'restart' })}>
            重新填写
          </button>
        </section>
      </main>
    );
  }

  return (
    <main style={page}>
      <h1>029 · 多步骤表单</h1>
      <p style={muted}>
        reducer 统一管理「步骤」与「数据」，每一步单独校验，全部通过才能继续，提交后一次性汇总
      </p>

      <section style={card}>
        <StepBar step={state.step} total={TOTAL_STEPS} />

        {state.step === 1 && <StepOne values={state.values} dispatch={dispatch} errors={errors} />}
        {state.step === 2 && <StepTwo values={state.values} dispatch={dispatch} errors={errors} />}
        {state.step === 3 && <StepThree values={state.values} dispatch={dispatch} errors={errors} />}

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            style={ghostBtn}
            disabled={state.step === 1}
            onClick={() => dispatch({ type: 'back' })}
          >
            上一步
          </button>
          {state.step < TOTAL_STEPS ? (
            <button
              style={{ ...btn, opacity: errorCount > 0 ? 0.5 : 1 }}
              disabled={errorCount > 0}
              onClick={() => dispatch({ type: 'next' })}
            >
              下一步
            </button>
          ) : (
            <button style={btn} onClick={() => dispatch({ type: 'submit' })}>
              提交
            </button>
          )}
          {errorCount > 0 && (
            <span style={{ color: '#ef4444', fontSize: 13 }}>
              还有 {errorCount} 处未通过校验
            </span>
          )}
        </div>
      </section>
    </main>
  );
}
