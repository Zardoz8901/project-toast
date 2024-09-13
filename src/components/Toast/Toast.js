import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ message, notification, visible, setVisible }) {
  const IconComponent = ICONS_BY_VARIANT[notification];
  const toastContent = (
    <div className={`${styles.toast} ${styles[notification]}`}>
      <div className={styles.iconContainer}>
        {IconComponent && <IconComponent size={24} />}
      </div>
      <p className={styles.content}>{message}</p>
      <button className={styles.closeButton} onClick={() => setVisible(false)}>
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );

  return visible ? (
    toastContent
  ) : (
    <VisuallyHidden>{toastContent}</VisuallyHidden>
  );
}

export default Toast;
