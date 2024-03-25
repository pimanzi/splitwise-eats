import React, { useState } from 'react';
/* eslint-disable */
const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [billName, setBillName] = useState('a friend');
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onclick={setBillName} />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onclick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add'}
        </Button>
      </div>
      <FormSplitBill billName={billName} />
    </div>
  );
}

function FriendList({ friends, onclick }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onclick={onclick} />
      ))}
    </ul>
  );
}
function Button({ children, onclick }) {
  return (
    <button className="button" onClick={onclick}>
      {children}
    </button>
  );
}

function Friend({ friend, onclick }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.balance} {friend.name}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onclick={() => onclick(friend.name)}>Select</Button>
    </li>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newItem = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    handleAddFriend(newItem);
  }
  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🙍Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage('https://i.pravatar.cc/48')}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ billName }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {billName}</h2>

      <label>💰Bill Value</label>
      <input type="text"></input>

      <label>🧍 Your expense</label>
      <input type="text"></input>

      <label>🧑‍🤝‍🧑 {billName} expense</label>
      <input type="text" disabled></input>

      <label>🤑Who is paying</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{billName}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
