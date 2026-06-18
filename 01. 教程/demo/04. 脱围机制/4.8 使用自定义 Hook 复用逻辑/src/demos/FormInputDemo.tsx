import { useFormInput } from '../hooks/useFormInput';

export default function FormInputDemo() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <div className="demo-section">
      <h2>useFormInput - 表单输入</h2>
      <p>两个输入框使用同一个自定义 Hook，但拥有各自独立的 state。</p>
      <div className="demo-box">
        <label>
          First name:
          <input {...firstNameProps} />
        </label>
        <label>
          Last name:
          <input {...lastNameProps} />
        </label>
        <p>
          <b>
            Good morning, {firstNameProps.value} {lastNameProps.value}.
          </b>
        </p>
      </div>
      <div className="code-hint">
        <strong>核心要点：</strong>每次调用 useFormInput 都会创建独立的 state。返回的 inputProps 可以通过展开语法直接传给 input 元素。
      </div>
    </div>
  );
}
