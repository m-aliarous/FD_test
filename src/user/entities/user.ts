import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import UserType from '../enums/userType';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "first_name" })
  public firstName: string;

  @Column({ name: "last_name" })
  public lastName: string;

  @Column({
    name: "email",
    unique: true
  })
  public email: string;

  @Column({ name: "password" })
  public password: string;

  @Column({
    name: "user_type",
    type: "enum",
    enum: UserType,
    default: UserType.User
  })
  public userType: UserType;

  @CreateDateColumn({ name: "created_at", })
  createdAt: Date;
}

export default User;