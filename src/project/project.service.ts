import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./project.entity";
import {Repository} from 'typeorm'
import { CreateProjectDto, UpdateProjectDto } from "./project.model";


@Injectable()

export class ProjectService{
   
constructor( @InjectRepository(Project) public readonly projectRepo:Repository<Project>){}

async findAll():Promise<Project[]>{
    return await this.projectRepo.find({
        relations:["employees", "employees.categories"]
    })
   
}

async findOne(id:number):Promise<Project>{
   return await this.projectRepo.findOne({where:{id},
relations:["employees"]});
  
}

async delete(id:number):Promise<any>{
   return await this.projectRepo.delete(id);
    
 }
 async create(createProjectDto:CreateProjectDto){
   let project=this.projectRepo.create(createProjectDto)
   return await this.projectRepo.save(project)
 }
 async update(id:number, updateProjectDto:UpdateProjectDto):Promise<Project>{
    let project =await this.projectRepo.findOne({where:{id }})
   
    project.code=updateProjectDto.code;
    project.name=updateProjectDto.name;
    
    return await this.projectRepo.save(project)
   
 }

}