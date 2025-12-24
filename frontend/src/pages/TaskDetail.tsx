import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask, type Task } from "src/api/tasks";
import { Page, TaskForm, UserTag } from "src/components";
import { Button } from "src/components/Button";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    getTask(id)
      .then((result) => {
        if (result.success) {
          setTask(result.data);
          document.title = `${result.data.title} | TSE Todos`;
        } else {
          setErrorModalMessage(result.error);
        }
      })
      .catch(setErrorModalMessage);
  }, [id]);

  if (!task && errorModalMessage) {
    return (
      <Page>
        <div className={styles.descContainer}>
          <Link to="/">Back to home</Link>
          <span className={styles.title}>This task doesn't exist!</span>
        </div>
      </Page>
    );
  }

  if (!task) {
    return (
      <Page>
        <p>Loading...</p>
      </Page>
    );
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  function handleSubmit(updatedTask: Task) {
    setIsEditing(false);
    setTask(updatedTask);
  }

  return (
    <Page>
      <p>
        <Link to="/">Back to home</Link>
      </p>
      {isEditing ? (
        <TaskForm mode="edit" task={task} onSubmit={handleSubmit} />
      ) : (
        <div className={styles.descContainer}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{task.title}</span>
            <Button
              kind="primary"
              data-testid="task-edit-button"
              label="Edit task"
              disabled={isEditing}
              onClick={() => setIsEditing(true)}
            />
          </div>

          {task.description ? (
            <span className={styles.description}>{task.description}</span>
          ) : (
            <span className={styles.description}>(No description)</span>
          )}
          <span className={styles.userContainer}>
            <strong className={styles.label}>Assignee</strong>
            {task.assignee ? <UserTag user={task.assignee} /> : "Not assigned"}
          </span>
          <span>
            <strong className={styles.label}>Status</strong>
            {task.isChecked ? "Done" : "Not Done"}
          </span>
          <span>
            <strong className={styles.label}>Date Created</strong>
            {dateFormatter.format(new Date(task.dateCreated))}
          </span>
        </div>
      )}
    </Page>
  );
}
