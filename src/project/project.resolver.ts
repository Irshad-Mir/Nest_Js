import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Project } from "./project.entity"
import { CreateProjectDto, UpdateProjectDto } from "./project.model"
import { ProjectService } from "./project.service"




@Resolver(of=>Project)
export class ProjectResolver{



    constructor(private readonly projectService:ProjectService){}


    @Query(returns=>[Project], {name:'findAllProject'})
    findAll(){
        return this.projectService.findAll()
    }

    @Query(returns=>Project, {name:'updateProject'})
    findOne(@Args('id', {type:()=>Int})id:number){
        return this.projectService.findOne(id)
    }

    @Mutation(returns=>Project, {name:'deleteProject'})
    deleteProject(@Args('id', { type:()=>Int})id:number){
        return this.projectService.delete(id)
    }
    @Mutation(returns=>Project, {name:'createProject'})
    createProject(@Args("createProjectDto")createProjectDto:CreateProjectDto){
        return this.projectService.create(createProjectDto)
    }
    @Mutation(returns=>Project, {name:'findOneProject'})
    updateProject(@Args("updateProjectDto")updateProjectDto:UpdateProjectDto){
        return this.projectService.update(updateProjectDto.id, updateProjectDto)
    }
}