// src/pages/UserPage/UserPage.jsx
import React from 'react';
import UserProfile from '../../components/UserProfile';
import styles from './UserPage.module.css';

export function UserPage() {
  return (
    <div className={styles.container}>
      <UserProfile />
    </div>
  );
}
