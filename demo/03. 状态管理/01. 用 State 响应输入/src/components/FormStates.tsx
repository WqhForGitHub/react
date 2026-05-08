import { useState } from 'react';

type Status = 'empty' | 'typing' | 'submitting' | 'success' | 'error';

interface FormProps {
  status: Status;
}

function Form({ status }: FormProps) {
  if (status === 'success') {
    return <h1 style={{ color: '#16a34a' }}>That&apos;s right!</h1>;
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <textarea disabled={status === 'submitting'} />
      <br />
      <button
        disabled={status === 'empty' || status === 'submitting'}
      >
        Submit
      </button>
      {status === 'submitting' && <p className="loading">Loading...</p>}
      {status === 'error' && (
        <p className="Error">Good guess but a wrong answer. Try again!</p>
      )}
    </form>
  );
}

const statuses: Status[] = [
  'empty',
  'typing',
  'submitting',
  'success',
  'error',
];

const statusLabels: Record<Status, string> = {
  empty: '空值状态',
  typing: '输入中',
  submitting: '提交中',
  success: '成功',
  error: '失败',
};

export default function FormStates() {
  const [activeStatus, setActiveStatus] = useState<Status>('empty');

  return (
    <div className="form-states">
      <h3>视图状态一览（Living Styleguide）</h3>
      <p className="description">
        同时展示组件的所有视图状态，方便快速迭代和调试。
      </p>

      <div className="states-grid">
        {statuses.map((status) => (
          <section
            key={status}
            className={`state-card ${activeStatus === status ? 'active' : ''}`}
            onClick={() => setActiveStatus(status)}
          >
            <h4>
              {statusLabels[status]}（{status}）
            </h4>
            <Form status={status} />
          </section>
        ))}
      </div>
    </div>
  );
}
