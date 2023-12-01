import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length , setLength] = useState(8)
  const [numallowed , setNumallowed] = useState(false)
  const [charallowed , setCharallowed] = useState(false)
  const [password , setPassword] = useState()
  const [btn , setBtn] = useState(false)
  const passwordRef = useRef(null)
  const imgurl = '/assets/copied.png'
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed){
      str += "0123456789"
    }
    if(charallowed){
      str += "~!@#$%^&*(){}[]<>?=+-_/"
    }

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  },[length,numallowed,charallowed,setPassword])

  useEffect(()=>{passwordGenerator()
  setBtn(false)},[length,numallowed,charallowed,passwordGenerator])

  const passcopytoclipboard = ()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    setBtn(true)
  }

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg
      px-4 py-4 my-8 text-black bg-gray-300'>
        <h1 className='text-black text-center'>Password Generator</h1>
        <div className='flex rounded-lg shadow overflow-hidden mb-4'>
          <input
          type='text'
          value={password}
          className='outline-none w-full px-4 py-2'
          readOnly
          ref={passwordRef}
           />
           <div className='duration-200'>{btn?(<button
           onClick={passcopytoclipboard } 
          className='outline-none text-white bg-black px-7 py-0.5 h-full'><img className='h-7 w-11' src='https://cdn.icon-icons.com/icons2/2483/PNG/96/process_events_icon_149896.png'/></button>):(<button
            onClick={passcopytoclipboard } 
           className='outline-none text-white bg-black px-5 py-0.5 h-full shrink-0'>Copy</button>)}
           
           </div>
           
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            /><label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={numallowed}
            onChange={()=>{
              setNumallowed((prev)=> !prev) 
            }}
            /><label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={charallowed}
            onChange={()=>{
              setCharallowed((prev)=> !prev) 
            }}
            /><label>Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
