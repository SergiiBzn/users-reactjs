import React, { useEffect } from 'react';
import { useState } from 'react';
import { Success } from './components/Succes';
import { Users } from './components/Users';
import './index.scss';

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении пользователей');
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className='App'>
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          invites={invites}
          onClickInvite={onClickInvite}
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
