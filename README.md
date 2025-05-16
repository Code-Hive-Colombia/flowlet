# Flowlet

> [!NOTE]
> 🌀 A minimal and fluent flow control utility for TypeScript — sync and async steps made clean.

**Flowlet** helps you build elegant, composable flows where each step can be synchronous or asynchronous. With a small API and expressive syntax, it simplifies chaining operations, transforming data, and handling side effects clearly and predictably.

## 🚀 Features

- ✨ Fluent API for chaining logic
- 🔁 Supports both sync and async flows
- 🔍 `tap` for debugging or side effects
- 🔄 `step`, `asyncStep`, `map`, and `await` for maximum clarity
- 🪶 Lightweight and TypeScript-native

## 📦 Installation

```bash
npm install flowlet
```

## 🧩 Basic Usage

```ts
import { Flow } from "flowlet";

const getUser = ({ user }: { user: string }) => ({ password: "123" });
const encryptPassword = ({ password }: { password: string }) => ({
  token: "abc",
});
const writeLog = async ({ token }: { token: string }) => {
  console.log("Writing log...");
  await new Promise((res) => setTimeout(res, 1000));
  return { token };
};

const result = await Flow.start({ user: "admin" })
  .step(getUser)
  .step(encryptPassword)
  .tap(({ token }) => console.log("Token:", token))
  .asyncStep(writeLog)
  .await((pipe) => pipe.step(({ token }) => ({ body: token })));

console.log("Response:", result.end());
```

## 📘 API Reference

| Method             | Description                                                        | Returns            |
| ------------------ | ------------------------------------------------------------------ | ------------------ |
| `Flow.start(data)` | Starts a new flow with the given context.                          | `Flow<T>`          |
| `.step(fn)`        | Applies a synchronous transformation to the flow context.          | `Flow<U>`          |
| `.asyncStep(fn)`   | Applies an asynchronous transformation to the flow context.        | `AsyncFlow<U>`     |
| `.await(fn)`       | Resumes the flow after an async step. Receives a new `Flow`.       | `Promise<Flow<U>>` |
| `.tap(fn)`         | Runs a side-effect or debug function without altering the context. | `Flow<T>`          |
| `.end()`           | Returns the final resolved context from the flow.                  | `T`                |

> [!NOTE]
> Type variables: `T` is the current context type, `U` is the result type after transformation.

## 📘 Why Flowlet?

Traditional chaining often mixes sync and async logic in a way that’s hard to follow. Flowlet brings structure, readability, and elegance to your data processing logic — like a mini pipeline engine, without the overhead.

## 🛠️ License

MIT © CodeHiveColombia
