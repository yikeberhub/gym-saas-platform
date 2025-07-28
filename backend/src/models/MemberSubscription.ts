import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from "typeorm";
  import { User } from "./User";
  import { SubscriptionPlan } from "./SubscriptionPlan";
  import { Payment } from "./Payment";
  
  export enum MemberSubscriptionStatus {
    PENDING = "pending",
    ACTIVE = "active",
    EXPIRED = "expired",
    CANCELLED = "cancelled",
    GRACE_PERIOD = "grace_period",
  }
  
  @Entity("member_subscriptions")
  export class MemberSubscription {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "date", nullable: false })
    start_date!: Date;
  
    @Column({ type: "date", nullable: false })
    end_date!: Date;
  
    @Column({
      type: "enum",
      enum: MemberSubscriptionStatus,
      default: MemberSubscriptionStatus.PENDING,
      nullable: false,
    })
    status!: MemberSubscriptionStatus;
  
    @Column({ type: "boolean", default: false, nullable: false })
    auto_renew!: boolean;
  
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
  
    // Relationships
    @ManyToOne(() => User, (user) => user.memberSubscriptions)
    @JoinColumn({ name: "user_id" }) // Specify the foreign key column name
    user!: User;
  
    @Column({ type: "uuid", nullable: false }) // Explicitly define the foreign key column
    user_id!: string;
  
    @ManyToOne(
      () => SubscriptionPlan,
      (subscriptionPlan) => subscriptionPlan.memberSubscriptions,
    )
    @JoinColumn({ name: "plan_id" }) // Specify the foreign key column name
    plan!: SubscriptionPlan;
  
    @Column({ type: "uuid", nullable: false }) // Explicitly define the foreign key column
    plan_id!: string;
  
    @OneToMany(() => Payment, (payment) => payment.memberSubscription)
    payments!: Payment[];
  }