"use client";

import { Form, Input, Button, Checkbox } from "@heroui/react";
import { useFormStatus } from "react-dom";
import { createTodo, toggleTodo, deleteTodo, findTodo } from "@/lib/serverFunctions";
import { useState, useEffect } from "react";

interface Props {
  params: { id: string };
}

export default function TodosPage({ params }: Props) {
  const userId = params.id;
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    findTodo(userId).then(setTodos);
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Todos</h1>

      <Form action={createTodo} className="flex gap-3 mb-12">
        <input type="hidden" name="userId" value={userId} />
        <Input
          name="title"
          placeholder="What needs to be done?"
          className="flex-1"
          isRequired
          validationBehavior="native"
          size="lg"
        />
        <AddButton />
      </Form>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-5 bg-white border rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-4 flex-1">
              <Form action={toggleTodo}>
                <input type="hidden" name="todoId" value={todo.id} />
                <input type="hidden" name="userId" value={userId} />
                <Checkbox defaultSelected={todo.completed} />
                <span className={todo.completed ? "line-through text-gray-500" : ""}>
                  {todo.title}
                </span>
              </Form>
            </div>

            <Form action={deleteTodo}>
              <input type="hidden" name="todoId" value={todo.id} />
              <input type="hidden" name="userId" value={userId} />
              <Button type="submit" color="danger" variant="light" size="sm">
                Delete
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

// Loading button
function AddButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      color="primary"
      size="lg"
      isDisabled={pending}
      className="min-w-[110px]"
    >
      {pending ? "Adding..." : "Add"}
    </Button>
  );
}