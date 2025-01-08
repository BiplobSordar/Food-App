

import { Loader2, Vault } from "lucide-react"
import { FormEvent, useRef, useState } from "react";

const VerifyEmail = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef=useRef<any>([])


    const handleChange=(index:number,value:string)=>{
      if(/^[a-zA-Z0-9]$/.test(value) || value===''){
        const newOtp=[...otp]
        newOtp[index]=value
        setOtp(newOtp)
      }
       
      // Move to the next input field id a digit is entered

      if(value!=='' && index<5){
        inputRef.current[index+1].focus()
      }


    }

    const handleKeyDown=(index:number,e:React.KeyboardEvent<HTMLInputElement>)=>{
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
    
  return (
    <div className="flex items-center justify-center h-screen w-full">
    <div className="p-8 rounded-md w-[50%] max-w-md flex flex-col gap-10 border border-gray-200">
      <div className="text-center">
        <h1 className="font-extrabold text-center text-2xl">Verify your email</h1>
        <p className="text-sm text-gray-600">
          Enter the 6 digit code sent to your email address
        </p>
      </div>
      <form >
        <div className="flex justify-between">
          {otp.map((letter:string,inx:number)=>(
            <input
             key={inx}
              type="text"
               maxLength={1}
                 className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal border border-gray-600 md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 ref={(element)=>(inputRef.current[inx]=element)}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleChange(inx,e.target.value)}}
                 onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(inx, e)
                  
                }
                value={letter}
                 />
          ))}
          {/* {otp.map((letter: string, idx: number) => (
            <input
              key={idx}
              ref={(element) => (inputRef.current[idx] = element)}
              type="text"
              maxLength={1}
              value={letter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(idx, e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(idx, e)
              }
              className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal border border-gray-600 md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))} */}
        </div>
        {/* {loading ? (
          <Button
            disabled
            className="bg-orange hover:bg-hoverOrange mt-6 w-full"
          >
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="bg-orange hover:bg-hoverOrange mt-6 w-full">
            Verify
          </Button>
        )} */}
        <button
            
            className="w-full my-3 bg-orange text-white py-2 px-4 rounded-lg hover:bg-hoverOrange"
          >
             Verify
          </button>
      </form>
    </div>
  </div>
  )
}

export default VerifyEmail