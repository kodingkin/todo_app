import { prisma } from "@/lib/prisma";

export default async function TodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Todos</h1>

      {/* Form at top */}
      <form action={createTodo} className="flex gap-3 mb-10">
        <input
          name="title"
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Todo list */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <form action={toggleTodo.bind(null, todo.id, !todo.completed)}>
                <button type="submit" className="focus:outline-none">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                </button>
              </form>

              <span className={todo.completed ? "line-through text-gray-500" : ""}>
                {todo.title}
              </span>
            </div>

            <form action={deleteTodo.bind(null, todo.id)}>
              <button
                type="submit"
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No todos yet. Add one above!</p>
      )}
    </div>
  );
}