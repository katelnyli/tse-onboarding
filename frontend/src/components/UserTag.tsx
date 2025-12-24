import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export type UserTagProps = {
  user?: User;
  className?: string;
};

export function UserTag({ user, className }: UserTagProps) {
  let userClass = styles.userContainer;

  if (className) {
    userClass += ` ${className}`;
  }

  if (!user) {
    return <span className={className}>Not assigned</span>;
  }

  return (
    <div className={userClass}>
      {user.profilePictureURL ? (
        <img className={styles.userPicture} src={user.profilePictureURL} />
      ) : (
        <img className={styles.userPicture} src="/userDefault.svg" />
      )}
      <span>{user.name}</span>
    </div>
  );
}
