"use client"

import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../@/components/ui/dialog"

  import { Textarea } from "../../@/components/ui/textarea"
import { Button } from "../../components/ui/button"

import {TeacherTopicList} from "../../services/Options";
import { useState } from "react";
import { useMutation } from "convex/react";
import {api} from "../../convex/_generated/api";
import {LoaderCircle} from "lucide-react";



  

export default function UserInputDialog({children, optionsValue}) {

    const [topic, setTopic]=useState();
    const [selectExpert, setSelectExpert]=useState();
    const [loading, setLoading]=useState(false); 
    const createDiscussionRoom=useMutation(api.DiscussionRoom.createNewRoom);

    const onClickNext=async ()=>{
       const result=await createDiscussionRoom(
          {
          coachingOption:optionsValue?.name,
          topic:topic,
          expertName:selectExpert
          });
          console.log(result);
          setLoading(false);
          
    }


    const handleClearElement=()=>{
        setTopic("");
        setSelectExpert("");
    }

  return (
    <Dialog>
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure? {optionsValue?.name}</DialogTitle>
        <DialogDescription>
          <div>
            <Textarea placeholder="Enter your topic" value={topic} onChange={(e)=>setTopic(e.target.value)}/>
          
          <div className="grid grid-cols-3 md:grid-cols-5  gap-4 mt-4">
            {TeacherTopicList.map((expert,index)=>(
                <div className="" key={index}>
                    <Image 
                    className={`${selectExpert===expert.name && "border-2 p-1 border-primary"} w-[80px] h-[80px] object-cover rounded-2xl hover:scale-125 cursor-pointer transition-all`}
                    alt="" src={expert?.picture} width={100} height={100}
                    onClick={()=>setSelectExpert(expert.name)}
                    />
                     <h2 className="text-center mt-2">{expert?.name}</h2>
                </div>
               
            )
        
        )}

          </div>

          <div className="flex justify-end items-center gap-4 mt-4">
                <Button variant="ghost" onClick={handleClearElement}>Cancel</Button>
                <Button disabled={!topic || !selectExpert || loading} onClick={onClickNext}>
                  {loading && <LoaderCircle className="animate-spin"/>}
                  Next
                  </Button>
          </div>

          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}
