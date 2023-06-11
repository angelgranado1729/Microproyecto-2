// la pagina explota si meto el archivo en la carpeta UserProfile no se porque
import React from 'react';
import { useUserContext } from '../contexts/UserContext';
import { updateUser } from '../firebase/users';
import styles from '../pages/UserPage/UserPage.module.css';

function UserProfile() {
  const { user } = useUserContext();
  const [name, setName] = React.useState(user.name);
  const [age, setAge] = React.useState(user.age);

  const handleUpdateProfile = async () => {
    await updateUser(user.id, { name, age });
  };

  return (
    <div className={styles.userProfile}>
      <h1 className={styles.userPageTitle}>Perfil de usuario</h1>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="age" className={styles.label}>
          Edad:
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={styles.input}
        />
      </div>
      <button onClick={handleUpdateProfile} className={styles.updateButton}>
        Actualizar perfil
      </button>
    </div>
  );
}

export default UserProfile;
