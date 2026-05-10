import { useState } from 'react';

interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

export default function FormSpreadDemo() {
  const [person, setPerson] = useState<Person>({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      lastName: e.target.value,
    });
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      email: e.target.value,
    });
  }

  return (
    <div className="form-demo">
      <p className="demo-hint">
        使用 <code>...</code> 展开语法复制对象中其他字段，只覆盖需要修改的字段。
      </p>
      <div className="form-fields">
        <label>
          First name:
          <input
            value={person.firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <label>
          Last name:
          <input
            value={person.lastName}
            onChange={handleLastNameChange}
          />
        </label>
        <label>
          Email:
          <input
            value={person.email}
            onChange={handleEmailChange}
          />
        </label>
      </div>
      <p className="person-info">
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
      <pre className="code-block">{`// 使用展开语法复制并覆盖
setPerson({
  ...person,          // 复制上一个 person 中的所有字段
  firstName: e.target.value  // 但是覆盖 firstName 字段
});`}</pre>
    </div>
  );
}
