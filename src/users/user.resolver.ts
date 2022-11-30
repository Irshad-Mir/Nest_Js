import { Args, Int, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { AddUserArgs, UpdateUserArgs } from "./user.dto"
import { User } from "./user.model"
import { UserService } from "./user.service"

@Resolver(of=>User)
export class UserResolver{



    constructor(private readonly userService:UserService){}


    @Query(returns=>[User])
    getAllUsers(){
        return this.userService.findAllUsers()
    }
    

    @Query(returns=>User, {name:'UserById'})
    getUserById(@Args({name:'userId', type:()=>Int})id:number){
        return this.userService.findUserById(id)
    }

    @Mutation(returns=>String, {name:'deleteUser'})
    deleteUserById(@Args({name:'userId', type:()=>Int})id:number){
        return this.userService.deleteUserById(id)
    }
    @Mutation(returns=>String, {name:'addUser'})
    addUser(@Args("addUserArgs")addUserArgs:AddUserArgs){
        return this.userService.adduser(addUserArgs)
    }
    @Mutation(returns=>String, {name:'updateUser'})
    updateUser(@Args("updateUserArgs")updateUserArgs:UpdateUserArgs){
        return this.userService.updateuser(updateUserArgs)
    }
}