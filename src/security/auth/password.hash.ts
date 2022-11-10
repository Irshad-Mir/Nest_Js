import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  hashPassword(password: string): string {
    const saltOrRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltOrRounds);
    return passwordHash;
  }
  compareHash(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }
  generateHash(data: string): string {
    const saltOrRounds = 10;
    const passwordHash = bcrypt.hashSync(data, saltOrRounds);
    return passwordHash;
  }
}