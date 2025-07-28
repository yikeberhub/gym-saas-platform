import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("gym_info")
export class GymInfo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  address!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  email!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  website!: string | null;

  @Column({ type: "jsonb", nullable: true })
  hours_of_operation!: object[] | null; // e.g., [{day: 'Mon', open: '06:00', close: '22:00'}]

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "jsonb", nullable: true })
  social_media_links!: object | null; // e.g., {facebook: 'url', instagram: 'url'}

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;
}