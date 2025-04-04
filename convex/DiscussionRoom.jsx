
import {mutation } from "./_generated/server";
import {v} from "convex/values";

export const createNewRoom=mutation({
    args:{
        coachingOption:v.string(),
        topic:v.string(),
        expertName:v.string(),
    },
    handler: async(ctx,args) => {
        const data={
                coachingOption:args.coachingOption,
                topic:args.topic,
                expertName:args.expertName
        };
        const result=await ctx.db.insert("DiscussionRoom",data);        

       return result;
        

    }
})
