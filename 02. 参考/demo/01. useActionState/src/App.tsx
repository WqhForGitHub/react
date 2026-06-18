import { useActionState } from "react";
import "./App.css";

type FormState = { message: string; name: string };

async function saveName(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();

  await new Promise((resolve) => setTimeout(resolve, 700));

  if (name.length < 2) {
    return { name, message: "名字至少需要 2 个字符。" };
  }

  return { name, message: "已保存：" + name };
}

function App() {
  const [state, formAction, isPending] = useActionState(saveName, {
    message: "提交表单后，action 会返回新的状态。",
    name: "",
  });

  return (
    <main className="app">
      <header className="hero">
        <h1>useActionState</h1>
        <p className="subtitle">把表单 action 的返回值直接保存为组件状态。</p>
      </header>

      <section className="card stack">
        <form action={formAction} className="stack">
          <label className="stack">
            用户名
            <input
              name="name"
              defaultValue={state.name}
              placeholder="例如 Ada"
            />
          </label>
          <button disabled={isPending}>
            {isPending ? "保存中..." : "保存"}
          </button>
        </form>
        <p className={state.message.startsWith("已保存") ? "success" : ""}>
          {state.message}
        </p>
      </section>
    </main>
  );
}

export default App;
