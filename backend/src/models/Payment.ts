import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { MemberSubscription } from "./MemberSubscription";
  
  export enum PaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    REFUNDED = "refunded",
  }
  
  export enum PaymentGateway {
    STRIPE = "stripe",
    PAYPAL = "paypal",
    OTHER = "other",
  }
  
  @Entity("payments")
  export class Payment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    transaction_id!: string; // From payment gateway
  
    @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
    amount!: number;
  
    @Column({ type: "varchar", length: 3, nullable: false })
    currency!: string;
  
    @Column({
      type: "enum",
      enum: PaymentGateway,
      nullable: true, // Allow null if not all payments have a specific gateway recorded
    })
    payment_gateway!: PaymentGateway | null;
  
    @Column({
      type: "enum",
      enum: PaymentStatus,
      nullable: false,
      default: PaymentStatus.PENDING,
    })
    status!: PaymentStatus;
  
    @Column({ type: "timestamp", nullable: false })
    payment_date!: Date;
  
    @Column({ type: "jsonb", nullable: true })
    raw_gateway_response!: object | null; // Stores raw JSON response from gateway
  
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
  
    // Relationships
    @ManyToOne(
      () => MemberSubscription,
      (memberSubscription) => memberSubscription.payments,
    )
    @JoinColumn({ name: "member_subscription_id" })
    memberSubscription!: MemberSubscription;
  
    @Column({ type: "uuid", nullable: false }) // Explicitly define the foreign key column
    member_subscription_id!: string;
  }