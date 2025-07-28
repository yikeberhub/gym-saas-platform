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
  
  export enum NotificationType {
    SUBSCRIPTION_EXPIRY = "subscription_expiry",
    PAYMENT_DUE = "payment_due",
    ATTENDANCE_STATUS = "attendance_status",
    ANNOUNCEMENT = "announcement",
    ADMIN_MESSAGE = "admin_message",
    PAYMENT_CONFIRMATION = "payment_confirmation",
    OTHER = "other",
  }
  
  export enum TargetDevice {
    WEB_APP = "web_app",
    NFC_READER = "nfc_reader", // For messages to be displayed on the reader itself
    EMAIL = "email",
    SMS = "sms",
  }
  
  @Entity("notifications")
  export class Notification {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "varchar", length: 255, nullable: false })
    title!: string;
  
    @Column({ type: "text", nullable: false })
    message!: string;
  
    @Column({
      type: "enum",
      enum: NotificationType,
      nullable: false,
    })
    type!: NotificationType;
  
    @Column({ type: "boolean", default: false, nullable: false })
    is_read!: boolean;
  
    @Column({
      type: "enum",
      enum: TargetDevice,
      nullable: true, // Can be null if it's a general notification, or for multiple targets
    })
    target_device!: TargetDevice | null;
  
    @Column({ type: "jsonb", nullable: true })
    payload!: object | null; // e.g., { daysLeft: 5, memberId: 'abc' }
  
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
  
    // Relationships
    @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
    @JoinColumn({ name: "user_id" })
    user!: User | null; // Nullable if notification can be system-wide
  
    @Column({ type: "uuid", nullable: true }) // Explicitly define the foreign key column, also nullable
    user_id!: string | null;
  }