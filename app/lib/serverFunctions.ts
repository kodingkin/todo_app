"use server";

import { redirect } from "next/navigation";

import { Todo } from "./generated/prisma/client";

import { prisma } from "@/lib/prisma";

export interface FormDataType {
  name: string;
  password: string;
  terms: string;
}

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const passwordHash = formData.get("password") as string;

  await prisma.user.create({
    data: { name, email, passwordHash },
  });

  const id = "TEST";

  redirect(`/sign-up/${id}`);
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user?.passwordHash === password) return;

  const id = "TEST";

  redirect(`/list/${id}`);
}

export async function findTodo(userId: string): Promise<Todo[]> {
  return await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTodo(formData: FormData) {
  const userId = formData.get("userId") as string;
  const title = formData.get("title") as string;

  if (!title?.trim()) throw new Error("Title required");

  await prisma.todo.create({
    data: { title: title.trim(), completed: false, userId },
  });
}

export async function toggleTodo(formData: FormData) {
  const todoId = formData.get("todoId") as string;
  const completed = formData.get("completed") === "true";

  await prisma.todo.update({
    where: { id: todoId },
    data: { completed: !completed },
  });
}

export async function deleteTodo(formData: FormData) {
  const todoId = formData.get("todoId") as string;

  await prisma.todo.delete({ where: { id: todoId } });
}
