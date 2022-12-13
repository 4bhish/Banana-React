import { useEffect, useState } from 'react';
import './App.css';

function App() {
const [userText,setUserText]=useState("");
const [btnStatus,setBtnStatus] = useState(false);
const [outputText,setOutputText] = useState("")
const [errorMsg,setErrorMsg] = useState("")
const fetchUrl =( `https://api.funtranslations.com/translate/minion.json?text=${userText}`);

  function handleChange(event){
    setUserText(event.target.value);
  }

  useEffect(()=>{
    if(btnStatus){
      fetch(fetchUrl)
    .then(res =>  {
      if(!res.ok){
      throw Error("Error: An error occured because busy servers try after some time.")
    } 
    return res.json()})
    .then(data => setOutputText(data.contents.translated))
    .catch(Error => {
      setErrorMsg(Error.message)
    })
    setBtnStatus(false)
    }
  },[btnStatus])

  function handleClick(){
    setBtnStatus(true)
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="heading">Speak Banana</h1>
        <p className="desc">Welcome to Banana Speak</p>
        <textarea onChange={handleChange} type="text"/>
        <button onClick={handleClick}>Translate</button>
        <p>Your Translation will appear here :</p>
        <div className="outputText">{outputText}</div>
        <h4>{errorMsg}</h4>
      </div>
    </div>
  );
}

export default App;
