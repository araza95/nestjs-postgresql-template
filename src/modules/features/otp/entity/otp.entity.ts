// Type-orm Imports
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { UserEntity } from '../../user/entities/user.entity';

// Enums
import { OTP_REASON_ENUM } from 'src/types/enums/otp/otp-reason.enum';

@Entity('otp')
export class OTPTableEntity {
  // ====================================== Columns ======================================

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'int' })
  otp: number;

  @Column({ type: 'varchar', enum: OTP_REASON_ENUM })
  type: string;

  @Column({ type: 'boolean', default: false })
  is_used: boolean;

  @Column({ type: 'boolean', default: false })
  is_expired: boolean;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
  // ====================================== Relations ======================================

  /**
   * 1. Many-to-one relation with user
   */

  // ================= TEMPORARY ts-ignore added, Because it is a STARTER TEMPLATE =================
  // Many-to-one relation with user
  // @ts-ignore
  @ManyToOne(() => UserEntity, (user) => user.otp)
  user: UserEntity;
}
