import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import { MemberSubscription } from "./MemberSubscription";
  import { Attendance } from "./Attendance";
  import { Notification } from "./Notification";
  
  export enum UserRole {
    MEMBER = "member",
    ADMIN = "admin",
  }
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "varchar", length: 255, nullable: false })
    name!: string;
  
    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    email!: string;
  
    @Column({ type: "varchar", length: 255, nullable: false, select: false }) // select: false to not return password by default
    password_hash!: string;
  
    @Column({
      type: "enum",
      enum: UserRole,
      default: UserRole.MEMBER,
      nullable: false,
    })
    role!: UserRole;
  
    @Column({ type: "varchar", length: 255, unique: true, nullable: true })
    nfc_card_id!: string | null;
  
    @Column({ type: "varchar", length: 20, nullable: true })
    phone_number!: string | null;
  
    @Column({ type: "timestamp", nullable: true })
    last_login_at!: Date | null;
  
    @Column({ type: "boolean", default: true, nullable: false })
    is_active!: boolean;
  
    @Column({ type: "varchar", length: 255, nullable: true })
    profile_picture_url!: string | null;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
  
    // Relationships
    @OneToMany(() => MemberSubscription, (subscription) => subscription.user)
    memberSubscriptions!: MemberSubscription[];
  
    @OneToMany(() => Attendance, (attendance) => attendance.user)
    attendanceRecords!: Attendance[];
  
    @OneToMany(() => Notification, (notification) => notification.user)
    notifications!: Notification[];
  }