import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";

const Home = ({ user, firebase }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const db = getFirestore(firebase);
      const docRef = doc(db, "users", user.uid);
      const userData = await getDoc(docRef);

      setUserData(userData.data());
    })();
  }, [firebase, user.uid]);

  const logout = () => {
    signOut(getAuth(firebase));
  };

  return (
    <div className="App">
      <main style={{ marginTop: "24px" }}>
        {userData ? (
          <table style={{ margin: "0 auto" }}>
            <tbody>
              <tr>
                <td>Nome</td>
                <td>{user.displayName}</td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <td>Nascimento</td>
                <td>
                  {new Date(userData.birthDate).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}

        <button style={{ marginTop: "8px" }} onClick={logout}>
          Sair...
        </button>
      </main>
    </div>
  );
};

export default Home;
