import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Input = () => {
  const [emails, setEmail] = useState([ { id: uuidv4(),  email: '' }]);
  const [randomNumber, setRandomNumber] = useState(-1)
  const [name, setName] = useState(['']);
  const [data, setData] = useState([]);
  var intArray = []
 

  useEffect(() => {

    const fetchData = async () => {
      // get the data from the api
      const response = await fetch('http://localhost:3001/unique');
      const json = await response.json();
      const data = JSON.stringify(json)   
      const array = data.split(',');
       for(var k = 0; k<array.length; k++){
           if (!array[k].includes('[') && !array[k].includes(']')){
               intArray.push(parseInt(array[k]))
       }
     }
     setData(intArray)
     }
    fetchData();
    }, [])

const generateUniqueRandom = async () => {
    //Generate random number
     let random = Number((Math.random() * 1000000000).toFixed())

    if(!data.includes(random)) {
        setRandomNumber(random)
        console.log('random', random);
        console.log('randomNumber state value', randomNumber);
    } else {
        if(data.length < maxNr) {
          //Recursively generate number
         return  generateUniqueRandom();
        } else {
          console.log('No more numbers available.')
          return false;
        }
    }
}

  const handleChangeInput = (id, e) => {
    generateUniqueRandom();
    const newInputFields = emails.map(i => {
      if(id === i.id) {
        i[e.target.name] = e.target.value
      }
      return i;
    })
    
    setEmail(newInputFields);
    console.log(emails);
  }

  const handleAddFields = () => {
    setEmail([...emails, { id: uuidv4(),  email: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...emails];
    values.splice(values.findIndex(value => value.id === id), 1);
    setEmail(values);
  }
 
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const submitRequest = async (e) => {
  e.preventDefault();
  const questions = [`What your favorite story about ${name}?`, `What is your favorite memory of you and ${name}?`]
  var resultsArray = [];
  var snippets = [];
  const dbPost = async () => {
    const responseEmail =  await fetch("http://localhost:3001/bundle", { 
        method: 'POST', 
        headers: { 
          'Content-type': 'application/json'
         }, 
        body: JSON.stringify({
          unique_id: randomNumber,
          name: name
        }) 
        }); 
      const rData = await responseEmail.json(); 
      if (rData.status === 'success'){
       alert("Message Sent."); 
        this.resetForm()
       }else if(rData.status === 'fail'){
         alert("Message failed to send.")
       }
      }

 dbPost();

      try{
       for(var i = 0; i<questions.length; i++){
          for(var j=0; j<emails.length; j++){
            if(emails[j]){
              (async function(i, j){
              console.log('this should be sent twice very quickly, every 1 minute')
              const response =  await fetch("http://localhost:3001/email", { 
                method: 'POST', 
                headers: { 
                  'Content-type': 'application/json'
                 }, 
                body: JSON.stringify({
                  question: questions[i],
                  email: emails[j].email,
                  unique_id: randomNumber,
                  name: name
                }) 
                }); 
              const resData = await response.json(); 
              if (resData.status === 'success'){
               alert("Message Sent."); 
                this.resetForm()
               }else if(resData.status === 'fail'){
                 alert("Message failed to send.")
               }
              console.log('j' + j);
              })(i, j);
            }
          }
       await timeout(10000);

      };
      console.log('before second await timout')
      await timeout(10000);
      console.log('after second await timoeout -- ideally 24 hours after the emails all send')

      // get the message ids for a particular unique ID
      const resp =  await fetch("http://localhost:3001/messages", { 
        method: 'POST', 
        headers: { 
          'Content-type': 'application/json'
         }, 
        body: JSON.stringify({
          unique: randomNumber
        }) 
        }); 
        const resultsData = await resp.json(); 
        if (resultsData.status === 'success'){
         alert("Message Sent."); 
          this.resetForm()
         }else if(resultsData.status === 'fail'){
           alert("Message failed to send.")
         }
// loop of post requests, to get body of emails, based on the the specific id (passed from the previous post request)
    console.log('resultsData typeof' + typeof resultsData);
    for(var i = 0; i< resultsData.length; i++){
    for(let key in resultsData[i]) {
      console.log(key + ":", resultsData[i][key]);
      if(key=="id"){
        resultsArray.push((resultsData[i][key]))
      };
    }
  }
    console.log('resultsarray' + resultsArray);
    console.log('before the message api post call');
    console.log('resultsArray[1] typeof' + typeof resultsArray[1]);

    for (var m =0; m<resultsArray.length; m++ ){
        const r =  await fetch("http://localhost:3001/message", { 
        method: 'POST', 
        headers: { 
          'Content-type': 'application/json'
         }, 
        body: JSON.stringify({
          message_id: resultsArray[m]
        }) 
        }); 
        const rData = await r.json(); 
        console.log('rData typeOf' + rData)
        if (rData.status === 'success'){
         consol.log("Message Sent."); 
          this.resetForm()
         }else if(rData.status === 'fail'){
           console.log("Message failed to send.")
         }
        if(rData.id){
        snippets.push(rData.snippet);
        console.log('snippet: ' + snippets);
        }
        await timeout(10000);
        }
        console.log('snippets all: ' + snippets);
   }
    catch{
      console.log('error somewhere in the try block');
    }
  };


  return (
    <div>
      <div className="flex flex-col items-center justify-around bg-gray-200"></div>
      <div className="w-full max-w-sm m-auto flex flex-col my-32">

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-gray-200 border"
          onSubmit={submitRequest}
        >
          <h2 className="text-2xl pt-6 pb-10 text-center font-medium text-gray-800">
            Admin Console
          </h2>
          <div className="mb-4">
          <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
              Gift recipient's first and last name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Full name of gift recipient "
              onChange={e => setName(e.target.value)}
              value={name}
              required
            />
            <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
              Gift contributors' email addresses:
            </label>
            {emails.map(obj => (
            <input
              key={obj.id}
              className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="email"
              placeholder="Email address of contributor"
              onChange={e => handleChangeInput(obj.id, e)}
              value={emails.email}
              required
            />
            ))}
            
            

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-6 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send Emails
            </button>
          </div>
          </div>
        </form>

        <div className="inline-flex">
        <button  onClick={handleAddFields} className="bg-gray-300 hover:bg-gray-400 text-gray-800 border-4 py-1 px-6 rounded-l">
             <span className='font-bold'> + </span> (add email)
              </button>
            <button disabled={emails.length === 1} onClick={() => handleRemoveFields(emails.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 border-4 py-1 px-2 rounded-r">
             <span className='font-bold'> - </span> (remove email)
            </button>
           </div>
      </div>
      
      
    </div>
  );
};

export default Input;
  