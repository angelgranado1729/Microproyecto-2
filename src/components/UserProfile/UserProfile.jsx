import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { updateUser } from '../../firebase/users';
import styles from './UserProfile.module.css';

function UserProfile() {
  const { user } = useUserContext();
  const [name] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [hasUpdatedAge, setHasUpdatedAge] = useState(false);

  useEffect(() => {
    if (user.age > 0) {
      setHasUpdatedAge(true);
    }
  }, [user.age]);

  const handleUpdateProfile = async () => {
    if (!hasUpdatedAge && age > 0) {
      await updateUser(user.id, { age });
      setHasUpdatedAge(true);
    }
  };

  return (
    <div className={styles.userProfile}>
      <h1 className={styles.userPageTitle}>Perfil de usuario</h1>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre:
        </label>
        <span id="name" className={styles.nameDisplay}>
          {name}
          </span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="age" className={styles.label}>
          Edad:
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(Math.max(0, e.target.value))}
          className={styles.input}
          disabled={hasUpdatedAge}
        />
      </div>
      <button onClick={handleUpdateProfile} className={styles.updateButton}>
        Actualizar perfil
      </button>
    </div>
  );
}

export default UserProfile;