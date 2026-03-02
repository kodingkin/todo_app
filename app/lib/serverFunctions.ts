"use server"

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface FormDataType {
  name: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Creating user:", { name, email, password });

  const id = "TEST";

  redirect(`/sign-up/${id}`);
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const id = "TEST";

  redirect(`/list/${id}`);
}

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title?.trim()) throw new Error("Title required");

  await prisma.todo.create({
    data: { title, completed: false },
  });

  revalidatePath("/todos"); // ← instant UI refresh
}

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });
  revalidatePath("/todos");
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/todos");
}