import './custom.css'
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([])
  const[text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([])


  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users');
      // console.log(response.data.data);
      setUsers(response.data.data)
    }
    loadUsers();

  }, [])

  const onSuggestionHandler = (text) =>{
    setText(text);
    setSuggestions([]);
  }

  const onChangeHandler = (text) =>{
    let matches = []
    if(text.length > 0){
      matches = users.filter(user=>{
        const regex = new RegExp(`${text}`, 'gi')   //gi indicated case insensetive
        return user.email.match(regex)
      })
    }
    
    // console.log('matches', matches);
    setSuggestions(matches);
    setText(text)
  }

  return (
    <div className="container">
      {/* <div>{text}</div> */}
      <input type="text"  className="col-md-12 input" style={{marginTop : 10}}
      onChange = {e => onChangeHandler(e.target.value)}
      value = {text}
      onBlur={()=>{
        setTimeout(()=>{
          setSuggestions([])
        }, 200)
      }}
      />
      {suggestions && suggestions.map((suggestion, i) =>
      <div key={i} className = "suggestions col-md-12 justify-content-md-center"
      onClick = {()=> onSuggestionHandler(suggestion.email)}>
        {suggestion.email}
      </div>
      )}
    </div>
  );
}

export default App;
