import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import { MemberSubscription } from "./MemberSubscription";
  
  @Entity("subscription_plans")
  export class SubscriptionPlan {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    name!: string;
  
    @Column({ type: "integer", nullable: false })
    duration_months!: number; // e.g., 1 for monthly, 3 for quarterly, 12 for annual
  
    @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
    price!: number;
  
    @Column({ type: "varchar", length: 3, default: "USD", nullable: false })
    currency!: string;
  
    @Column({ type: "text", nullable: true })
    description!: string | null;
  
    @Column("text", { array: true, nullable: true })
    features!: string[] | null; // e.g., ['Access to all classes', 'Personal trainer session']
  
    @Column({ type: "boolean", default: true, nullable: false })
    is_active!: boolean;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
  
    // Relationships
    @OneToMany(
      () => MemberSubscription,
      (memberSubscription) => memberSubscription.plan,
    )
    memberSubscriptions!: MemberSubscription[];
  }