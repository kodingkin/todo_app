"use client";

import { Form, Input, Button, Checkbox } from "@heroui/react";
import { useState, useEffect, use, FormEvent } from "react";
import clsx from "clsx";

import {
  createTodo,
  toggleTodo,
  deleteTodo,
  findTodo,
} from "@/lib/serverFunctions";
import { title } from "@/components/primitives";
import { AddButton } from "@/components/addButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default function TodosPage({ params }: Props) {
  const userId = use(params).id;
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    findTodo(userId).then(setTodos);
  }, [userId]);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await createTodo(formData);
      const updated = await findTodo(userId);

      setTodos(updated);
    } catch {}
  }

  async function handleToggle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await toggleTodo(formData);
    const updated = await findTodo(userId);

    setTodos(updated);
  }

  async function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await deleteTodo(formData);
    const updated = await findTodo(userId);

    setTodos(updated);
  }

  return (
    <div className="w-full mx-auto py-12 px-4">
      <h1 className={title({ size: "sm" })}>My Todos</h1>

      <Form className="flex gap-3 flex-row my-12" onSubmit={handleCreate}>
        <input name="userId" type="hidden" value={userId} />
        <Input
          isRequired
          className="flex-1"
          name="title"
          placeholder="What needs to be done?"
          size="lg"
          validationBehavior="native"
        />
        <AddButton />
      </Form>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="
              flex items-center justify-between p-5
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-xl shadow-sm dark:shadow-gray-900/30
            "
          >
            <div className="flex items-center gap-4 flex-1">
              <Form onSubmit={handleToggle}>
                <input name="todoId" type="hidden" value={todo.id} />
                <input name="userId" type="hidden" value={userId} />
                <input
                  name="completed"
                  type="hidden"
                  value={(!todo.completed).toString()}
                />
                <Checkbox
                  lineThrough
                  defaultSelected={todo.completed}
                  onChange={(e) => {
                    e.target.form?.requestSubmit();
                  }}
                >
                  <span
                    className={clsx(
                      "text-lg",
                      todo.completed
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-gray-100",
                    )}
                  >
                    {todo.title}
                  </span>
                </Checkbox>
              </Form>
            </div>

            <Form onSubmit={handleDelete}>
              <input name="todoId" type="hidden" value={todo.id} />
              <input name="userId" type="hidden" value={userId} />
              <Button
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                color="danger"
                size="sm"
                type="submit"
                variant="light"
              >
                x
              </Button>
            </Form>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
}
