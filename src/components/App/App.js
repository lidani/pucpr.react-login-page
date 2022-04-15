import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import Home from "../Home/Home";

const App = ({ firebase }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const auth = getAuth(firebase);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user === null) return navigate("/login");
        setUser(user);
        return setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user={user} firebase={firebase} />} />
      </Routes>
    </div>
  );
};

export default App;
