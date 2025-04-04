 import {mutation } from "./_generated/server";
 import {v} from "convex/values";


 export const UserData=mutation({
            args:{
                 name:v.string(),
                 email:v.string(),
                 credits:v.optional(v.number()),
            },

            handler: async (ctx,args)=>{

                try {

                const user=await ctx.db.query("users")
                .filter(q => q.eq(q.field("email"),args.email))
                .collect();

                if(user?.length == 0){
                    const data={
                        name:args.name,
                        email:args.email,
                        credits:args.credits ?? 50000
                    };
                    await ctx.db.insert("users",data);


                    console.log("User Created data:",data);
                    return data;
                }
                
                return user[0];    
                   
                    
                
              
                    
                } catch (error) {
                    console.error("Error inserting user:", error);
                    throw new Error("Impossible de créer l'utilisateur.");
                }

            }

 });

