import { Card, CardBody, Form, Button, Checkbox } from "@heroui/react";
import { FormEvent } from "react";
import clsx from "clsx";

import { Todo } from "@/lib/generated/prisma/client";

type Props = {
  userId: string;
  todo: Todo;
  handleToggle: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleDelete: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const TodoCard = (props: Props) => {
  return (
    <Card
      key={props.todo.id}
      className="border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <CardBody className="flex flex-row items-center justify-between p-5">
        <div className="flex items-center gap-4 flex-1">
          <Form onSubmit={props.handleToggle}>
            <input name="todoId" type="hidden" value={props.todo.id} />
            <input name="userId" type="hidden" value={props.userId} />
            <input
              name="completed"
              type="hidden"
              value={(!props.todo.completed).toString()}
            />
            <Checkbox
              lineThrough
              defaultSelected={props.todo.completed}
              onChange={(e) => {
                e.target.form?.requestSubmit();
              }}
            >
              <span
                className={clsx(
                  "text-lg",
                  props.todo.completed
                    ? "text-gray-500 dark:text-gray-400"
                    : "text-gray-900 dark:text-gray-100",
                )}
              >
                {props.todo.title}
              </span>
            </Checkbox>
          </Form>
        </div>

        <Form onSubmit={props.handleDelete}>
          <input name="todoId" type="hidden" value={props.todo.id} />
          <input name="userId" type="hidden" value={props.userId} />
          <Button
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            color="danger"
            size="sm"
            type="submit"
            variant="ghost"
          >
            delete
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default TodoCard;
