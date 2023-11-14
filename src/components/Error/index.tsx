import { Button } from "antd";
import React from "react";
import styles from "./style.module.css";
const NotFoundPage = () => {
  return (
    <div className={styles.outline}>
      <div className={styles.title}>Not Found Page</div>
      <div className={styles.button}>
        <Button
          onClick={() => {
            window.localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Go back to login
        </Button>
        <Button>Go back to home</Button>
      </div>
    </div>
  );
};
const UnauthoritePage = () => {
  return (
    <div className={styles.outline}>
      <div className={styles.title}>You do not have permission</div>
      <div className={styles.button}>
        <Button
          onClick={() => {
            window.localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Go back to login
        </Button>
        <Button>Go back to home</Button>
      </div>
    </div>
  );
};
const InternalServerPage = () => {
  return (
    <div className={styles.outline}>
      <div className={styles.title}>Internal Server Error</div>
      <div className={styles.button}>
        <Button
          onClick={() => {
            window.localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Go back to login
        </Button>
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go back to home
        </Button>
      </div>
    </div>
  );
};

export { NotFoundPage, UnauthoritePage, InternalServerPage };
