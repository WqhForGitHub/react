import { useState } from 'react';

/**
 * 原则3：避免冗余的 state
 * fullName 可以从 firstName 和 lastName 计算得出，不需要作为 state。
 * 在渲染期间直接计算即可，避免了同步问题。
 */
export default function CheckInForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // fullName 不是 state 变量，而是在渲染期间计算出来的
  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>办理登机手续</h2>
      <label style={{ display: 'block', marginBottom: '8px' }}>
        名：
        <input
          value={firstName}
          onChange={handleFirstNameChange}
          style={{ marginLeft: '8px' }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '8px' }}>
        姓：
        <input
          value={lastName}
          onChange={handleLastNameChange}
          style={{ marginLeft: '8px' }}
        />
      </label>
      <p>
        您的票将发放给：<b>{fullName}</b>
      </p>
    </>
  );
}
