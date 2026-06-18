import { useEffect, useRef } from 'react';

function submitForm(answer: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === 'istanbul') {
        resolve();
      } else {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      }
    }, 1500);
  });
}

function hide(el: HTMLElement) {
  el.style.display = 'none';
}

function show(el: HTMLElement) {
  el.style.display = '';
}

function enable(el: HTMLButtonElement | HTMLTextAreaElement) {
  el.disabled = false;
}

function disable(el: HTMLButtonElement | HTMLTextAreaElement) {
  el.disabled = true;
}

export default function ImperativeForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loadingRef = useRef<HTMLParagraphElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const form = formRef.current!;
    const textarea = textareaRef.current!;
    const button = buttonRef.current!;
    const loadingMessage = loadingRef.current!;
    const errorMessage = errorRef.current!;
    const successMessage = successRef.current!;

    async function handleFormSubmit(e: Event) {
      e.preventDefault();
      disable(textarea);
      disable(button);
      show(loadingMessage);
      hide(errorMessage);
      try {
        await submitForm(textarea.value);
        show(successMessage);
        hide(form);
      } catch (err: any) {
        show(errorMessage);
        errorMessage.textContent = err.message;
      } finally {
        hide(loadingMessage);
        enable(textarea);
        enable(button);
      }
    }

    function handleTextareaChange() {
      if (textarea.value.length === 0) {
        disable(button);
      } else {
        enable(button);
      }
    }

    form.onsubmit = handleFormSubmit;
    textarea.oninput = handleTextareaChange;

    return () => {
      form.onsubmit = null;
      textarea.oninput = null;
    };
  }, []);

  return (
    <div className="imperative-form">
      <h3>命令式 UI（Imperative）</h3>
      <p className="description">
        直接操作 DOM 元素：显示/隐藏、启用/禁用，一步一步地告诉计算机如何更新 UI。
      </p>
      <form ref={formRef} id="form">
        <h2>City quiz</h2>
        <p>What city is located on two continents?</p>
        <textarea ref={textareaRef} id="textarea" />
        <br />
        <button ref={buttonRef} id="button" disabled>
          Submit
        </button>
        <p ref={loadingRef} id="loading" style={{ display: 'none' }}>
          Loading...
        </p>
        <p
          ref={errorRef}
          id="error"
          style={{ display: 'none', color: 'red' }}
        ></p>
      </form>
      <h1
        ref={successRef}
        id="success"
        style={{ display: 'none' }}
      >
        That&apos;s right!
      </h1>
    </div>
  );
}
