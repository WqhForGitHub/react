import { useState } from 'react';

interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

export default function FormDynamicDemo() {
  const [person, setPerson] = useState<Person>({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="form-demo">
      <p className="demo-hint">
        使用 <code>[e.target.name]</code> 动态属性名，一个事件处理函数即可更新多个字段。
      </p>
      <div className="form-fields">
        <label>
          First name:
          <input
            name="firstName"
            value={person.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last name:
          <input
            name="lastName"
            value={person.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            value={person.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <p className="person-info">
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
      <pre className="code-block">{`// 使用动态属性名，一个处理函数搞定
function handleChange(e) {
  setPerson({
    ...person,
    [e.target.name]: e.target.value
  });
}`}</pre>
    </div>
  );
}
