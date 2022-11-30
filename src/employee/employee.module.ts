import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./employee.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Employee])],
    
    providers:[],
})
export class EmployeeModule {}

