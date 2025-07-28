import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { User } from "./User";
  
  export enum AttendanceStatus {
    SUCCESS = "success",
    DENIED_EXPIRED = "denied_expired",
    DENIED_INVALID_CARD = "denied_invalid_card",
    // Add more as needed, e.g., 'denied_barred'
  }
  
  @Entity("attendance")
  export class Attendance {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "varchar", length: 255, nullable: false })
    nfc_card_id_used!: string; // The NFC card ID that was scanned
  
    @Column({ type: "timestamp", nullable: false })
    check_in_time!: Date;
  
    @Column({ type: "timestamp", nullable: true })
    check_out_time!: Date | null;
  
    @Column({ type: "varchar", length: 255, nullable: true })
    device_id!: string | null; // Identifier for the specific NFC reader device
  
    @Column({
      type: "enum",
      enum: AttendanceStatus,
      default: AttendanceStatus.SUCCESS,
      nullable: false,
    })
    status!: AttendanceStatus;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
  
    // Relationships
    @ManyToOne(() => User, (user) => user.attendanceRecords)
    @JoinColumn({ name: "user_id" })
    user!: User;
  
    @Column({ type: "uuid", nullable: false }) // Explicitly define the foreign key column
    user_id!: string;
  }