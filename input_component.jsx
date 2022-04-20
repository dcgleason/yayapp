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
    const questions = [`What your favorite story about ${name}?`, `What is your favorite memory of you and ${name}?`]
    e.preventDefault(); 

    console.log({ emails, questions });
    console.log("random number.email_id", randomNumber)

        try{
        
         for(var j = 0; j<emails.length; j++){
          if(emails[j]){
        for(var i=0; i<questions.length; i++){
          (async function(i){
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
    })(i);
         await timeout(10000);


        };
     }
      }
    }
      catch{
        console.log('error to post request');
      }

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

    }

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
  