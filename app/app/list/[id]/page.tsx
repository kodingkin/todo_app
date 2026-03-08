"use client";

import { Form, Input } from "@heroui/react";
import { useState, useEffect, use, FormEvent, useRef } from "react";

import {
  createTodo,
  toggleTodo,
  deleteTodo,
  findTodo,
} from "@/lib/serverFunctions";
import { title } from "@/components/primitives";
import { AddButton } from "@/components/addButton";
import TodoCard from "@/components/todoCard";
import { Todo } from "@/lib/generated/prisma/client";

interface Props {
  params: Promise<{ id: string }>;
}

export default function TodosPage({ params }: Props) {
  const userId = use(params).id;
  const [todos, setTodos] = useState<Todo[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    findTodo(userId).then(setTodos);
  }, [userId]);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await createTodo(formData);
      if (formRef.current) {
        formRef.current.reset();
      }
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

      <Form
        ref={formRef}
        className="flex gap-3 flex-row my-12"
        onSubmit={handleCreate}
      >
        <input name="userId" type="hidden" value={userId} />
        <Input
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
          <TodoCard
            key={todo.id}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            todo={todo}
            userId={userId}
          />
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
