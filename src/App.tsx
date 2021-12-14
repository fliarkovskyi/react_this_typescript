import React, {useState} from 'react';
import './App.css';

const App: React.FC = () => {

  interface UserInt{
    firstName:string,
    lastName:string,
    age:string
  }

  interface AllUsersInt{
    currentUser: UserInt;
    allUsers: Array<UserInt>;
  }

  const [usersState, setUsersState] = useState<AllUsersInt> ({
    currentUser: {
      firstName:"",
      lastName:"",
      age:""
    },
    allUsers:[]
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) : void => {
      //console.log(e.target.value)
      setUsersState({
        ...usersState,
        currentUser: {
          ...usersState.currentUser,
          [e.target.name] :e.target.value
        }
      })
   }

   const submitform = (e: React.SyntheticEvent) : void => {
      e.preventDefault();

      setUsersState({
        currentUser: {
          firstName:"",
          lastName:"",
          age:""
        },
        allUsers:[
          ...usersState.allUsers,
          usersState.currentUser
        ]
      })
   }

  const deleteHendler = (index: number): void => {
    const filterUsers =  usersState.allUsers.filter((user, i) => {
        return index !== i 
    })

    setUsersState({
      ...usersState,
      allUsers: filterUsers
    })
  }

  const allUsers = usersState.allUsers.map((user,i) => (
    <div key={i}>
      <h2>{user.firstName}</h2>
      <h2>{user.lastName}</h2>
      <h2>{user.age}</h2>
      <button onClick={() => deleteHendler(i)}>Delete</button>
    </div>
  ))

   console.log(usersState.currentUser)


  return (
    <div className="container">
      <h1>React with Typescript</h1>
      <form onSubmit={submitform}>
        <label htmlFor="userName">First Name:</label>
        <input
          required 
          id="firstName"
          type="text"
          name="firstName"
          value={usersState.currentUser.firstName}
          onChange={onChangeHandler}
        />
        <label htmlFor="userAge">Last Name:</label>
        <input 
          required
          id="lastName"
          type="text"
          name="lastName"
          value={usersState.currentUser.lastName}
          onChange={onChangeHandler}
        />
        <label htmlFor="userJob">Age:</label>
        <input 
          required
          id="userAge"
          type="number"
          name="age"
          value={usersState.currentUser.age}
          onChange={onChangeHandler}
        />
        <button type="submit">Add user</button>
      </form>
      {allUsers}
    </div>
  );
}

export default App;
