import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { FaUser, FaLock, FaBuilding, FaSearch } from 'react-icons/fa'; // אייקונים מתאימים
import { useUser } from './UserContext'; // קונטקסט ניהול משתמש

import '../CSS/Login.css'; // קובץ CSS לעיצוב

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser(); // פונקציית login מהקונטקסט
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (userType) => {
    try {
      let response = await fetch(
        `http://localhost:3001/validate_${userType}?username=${username}&password=${password}`
      );

      if (response.status === 200) {
        let userData = await response.json();

        // מיפוי נתונים על בסיס סוג המשתמש
        let mappedUserData = {
          id: userData[`${userType}_id`],
          name: userData[`${userType}_name`],
          email: userData[`${userType}_email`],
          phone: userData[`${userType}_phone`],
          typeData: userType,
        };

        if (userType === 'seeker') {
          mappedUserData.favorites = userData.seeker_favorites; // מחפש נכס עם מועדפים
        } else if (userType === 'manager') {
          mappedUserData.company_name = userData.manager_company_name; // מנהל נכס עם שם החברה
        }

        login(mappedUserData); // שמירת המשתמש בקונטקסט
        navigate("/Dashboard"); // ניווט ללוח הניהול לאחר ההתחברות
      } else {
        setError("שם המשתמש או הסיסמה אינם נכונים!");
      }
    } catch (error) {
      console.error('שגיאה במהלך האימות:', error);
      setError('אירעה שגיאה בשרת, נסה שוב מאוחר יותר.');
    }
  };

  return (
    <div className='center-container'>
      <div className="login-container">
        <h2>התחברות</h2>
        <form className="login-form">
          <label htmlFor="username">
            <FaUser /> שם משתמש:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">
            <FaLock /> סיסמה:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="button-container">
            <button
              type="button"
              className="login-button"
              onClick={() => handleLogin('manager')}
            >
              <FaBuilding /> אני מנהל נכסים
            </button>

            <button
              type="button"
              className="login-button"
              onClick={() => handleLogin('seeker')}
            >
              <FaSearch /> אני מחפש נכסים
            </button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;