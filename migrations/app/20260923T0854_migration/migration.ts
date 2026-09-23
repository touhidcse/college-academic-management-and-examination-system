#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1e8412e162dbbe69f4bb3bf8d07f0280ae67eaab15c34dcf201e67468315428d/contract';
import startContract from '../../snapshots/1e8412e162dbbe69f4bb3bf8d07f0280ae67eaab15c34dcf201e67468315428d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/21228f4251f2f315dd9568aec79658833fb40ac3acf5b8ca020c05e0e0dc2733/contract';
import endContract from '../../snapshots/21228f4251f2f315dd9568aec79658833fb40ac3acf5b8ca020c05e0e0dc2733/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'post' }),
      this.dropTable({ schema: 'public', table: 'user' }),
      this.createTable({
        schema: 'public',
        table: 'academic_groups',
        columns: [
          col('academicLevelId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'academic_groups_code_check_1b92f360',
            "\"code\" IN ('SCIENCE', 'BUSINESS_STUDIES', 'HUMANITIES', 'BA', 'BSS', 'BBS', 'ACCOUNTING', 'MANAGEMENT')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'academic_levels',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('programId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('yearNumber', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'academic_programs',
        columns: [
          col('code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'academic_programs_type_check_d1fbf7b3',
            "\"type\" IN ('HIGHER_SECONDARY', 'DEGREE', 'HONOURS')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'academic_sessions',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('endDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'audit_logs',
        columns: [
          col('action', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('entity', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('entityId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('ipAddress', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('newData', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('oldData', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('userAgent', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'curriculum_subjects',
        columns: [
          col('academicGroupId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('academicLevelId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isRequired', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('paperType', 'text', {
            notNull: true,
            default: lit('SINGLE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('selectionGroup', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('subject', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'curriculum_subjects_category_check_66bdcf5d',
            "\"category\" IN ('COMPULSORY', 'ELECTIVE', 'OPTIONAL')",
          ),
          checkExpression(
            'curriculum_subjects_paperType_check_59d6363a',
            "\"paperType\" IN ('FIRST', 'SECOND', 'SINGLE')",
          ),
          checkExpression(
            'curriculum_subjects_subject_check_5ce16431',
            "\"subject\" IN ('BANGLA_1ST', 'BANGLA_2ND', 'ENGLISH_1ST', 'ENGLISH_2ND', 'ICT', 'PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY', 'ACCOUNTING', 'FINANCE_BANKING_INSURANCE', 'BUSINESS_ORGANIZATION_MANAGEMENT', 'CIVICS', 'ISLAMIC_HISTORY_CULTURE', 'SOCIOLOGY', 'LOGIC', 'ECONOMICS', 'ISLAMIC_STUDIES', 'DEGREE_BANGLA', 'DEGREE_ENGLISH', 'DEGREE_ICT', 'DEGREE_HISTORY', 'DEGREE_POLITICAL_SCIENCE', 'DEGREE_SOCIOLOGY', 'HONOURS_BANGLA', 'HONOURS_ENGLISH', 'HONOURS_ICT', 'HONOURS_ACCOUNTING', 'HONOURS_MANAGEMENT', 'HONOURS_ECONOMICS')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'exam_fees',
        columns: [
          col('amount', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('dueDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('examId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('paidAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('UNPAID'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'exam_fees_status_check_fabf9e11',
            "\"status\" IN ('UNPAID', 'PAID', 'WAIVED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'exam_subjects',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('creativeFullMarks', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('creativePassMarks', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('curriculumSubjectId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('examId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('fullMarks', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('mcqFullMarks', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('mcqPassMarks', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('paperType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passMarks', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('practicalFullMarks', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('practicalPassMarks', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('subject', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'exam_subjects_paperType_check_59d6363a',
            "\"paperType\" IN ('FIRST', 'SECOND', 'SINGLE')",
          ),
          checkExpression(
            'exam_subjects_subject_check_5ce16431',
            "\"subject\" IN ('BANGLA_1ST', 'BANGLA_2ND', 'ENGLISH_1ST', 'ENGLISH_2ND', 'ICT', 'PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY', 'ACCOUNTING', 'FINANCE_BANKING_INSURANCE', 'BUSINESS_ORGANIZATION_MANAGEMENT', 'CIVICS', 'ISLAMIC_HISTORY_CULTURE', 'SOCIOLOGY', 'LOGIC', 'ECONOMICS', 'ISLAMIC_STUDIES', 'DEGREE_BANGLA', 'DEGREE_ENGLISH', 'DEGREE_ICT', 'DEGREE_HISTORY', 'DEGREE_POLITICAL_SCIENCE', 'DEGREE_SOCIOLOGY', 'HONOURS_BANGLA', 'HONOURS_ENGLISH', 'HONOURS_ICT', 'HONOURS_ACCOUNTING', 'HONOURS_MANAGEMENT', 'HONOURS_ECONOMICS')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'exams',
        columns: [
          col('academicGroupId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('academicLevelId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('academicSessionId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('endDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('examType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('resultPublished', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('startDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'exams_examType_check_59ab93fd',
            "\"examType\" IN ('HSC_HALF_YEARLY', 'HSC_ANNUAL', 'HSC_PRE_TEST', 'HSC_TEST', 'INCOURSE_1', 'INCOURSE_2')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'marks',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('creativeMark', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('enteredBy', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('examSubjectId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('grade', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('gradePoint', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isPassed', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('mcqMark', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('obtainedMark', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('practicalMark', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'marks_grade_check_9a590f3d',
            "\"grade\" IN ('A_PLUS', 'A', 'A_MINUS', 'B', 'C', 'D', 'F')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'payment_transactions',
        columns: [
          col('amount', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('gateway', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('gatewayTransactionId', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('paymentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('responseData', 'json', { codecRef: { codecId: 'pg/json@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'payment_transactions_gateway_check_bec4b77e',
            "\"gateway\" IN ('BKASH', 'SSLCOMMERZ', 'STRIPE')",
          ),
          checkExpression(
            'payment_transactions_status_check_bdbc8efd',
            "\"status\" IN ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'payments',
        columns: [
          col('amount', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('completedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('examFeeId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('gateway', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('gatewayTransactionId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('initiatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('paymentMethod', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'payments_gateway_check_bec4b77e',
            "\"gateway\" IN ('BKASH', 'SSLCOMMERZ', 'STRIPE')",
          ),
          checkExpression(
            'payments_paymentMethod_check_e8d6247a',
            "\"paymentMethod\" IN ('BKASH', 'CARD', 'MOBILE_BANKING', 'OTHER')",
          ),
          checkExpression(
            'payments_status_check_bdbc8efd',
            "\"status\" IN ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'results',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('examId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('gpa', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('obtainedMarks', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('publishedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('totalMarks', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('results_status_check_1b4a7b6b', "\"status\" IN ('DRAFT', 'PUBLISHED')"),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'sections',
        columns: [
          col('academicGroupId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('academicLevelId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('capacity', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'student_academic_records',
        columns: [
          col('academicGroupId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('academicLevelId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('academicSessionId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('registrationNumber', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('rollNumber', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('sectionId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'student_academic_records_status_check_14da8bf1',
            "\"status\" IN ('ACTIVE', 'COMPLETED', 'TRANSFERRED', 'DROPPED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'student_subjects',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('curriculumSubjectId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('paperType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('studentAcademicRecordId', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('studentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('subject', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'student_subjects_category_check_66bdcf5d',
            "\"category\" IN ('COMPULSORY', 'ELECTIVE', 'OPTIONAL')",
          ),
          checkExpression(
            'student_subjects_paperType_check_59d6363a',
            "\"paperType\" IN ('FIRST', 'SECOND', 'SINGLE')",
          ),
          checkExpression(
            'student_subjects_subject_check_5ce16431',
            "\"subject\" IN ('BANGLA_1ST', 'BANGLA_2ND', 'ENGLISH_1ST', 'ENGLISH_2ND', 'ICT', 'PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY', 'ACCOUNTING', 'FINANCE_BANKING_INSURANCE', 'BUSINESS_ORGANIZATION_MANAGEMENT', 'CIVICS', 'ISLAMIC_HISTORY_CULTURE', 'SOCIOLOGY', 'LOGIC', 'ECONOMICS', 'ISLAMIC_STUDIES', 'DEGREE_BANGLA', 'DEGREE_ENGLISH', 'DEGREE_ICT', 'DEGREE_HISTORY', 'DEGREE_POLITICAL_SCIENCE', 'DEGREE_SOCIOLOGY', 'HONOURS_BANGLA', 'HONOURS_ENGLISH', 'HONOURS_ICT', 'HONOURS_ACCOUNTING', 'HONOURS_MANAGEMENT', 'HONOURS_ECONOMICS')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'students',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('dateOfBirth', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('deletedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('gender', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('guardianName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('guardianPhone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('studentId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'teacher_assignments',
        columns: [
          col('academicSessionId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('curriculumSubjectId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('sectionId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('teacherId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'teachers',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('deletedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('department', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('designation', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('employeeId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('STUDENT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'users_role_check_4fa0da15',
            "\"role\" IN ('ADMIN', 'TEACHER', 'STUDENT')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'academic_groups',
        constraint: 'academic_groups_academicLevelId_code_key',
        columns: ['academicLevelId', 'code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'academic_levels',
        constraint: 'academic_levels_programId_yearNumber_key',
        columns: ['programId', 'yearNumber'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'academic_programs',
        constraint: 'academic_programs_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'academic_sessions',
        constraint: 'academic_sessions_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'curriculum_subjects',
        constraint: 'curriculum_subjects_academicLevelId_academicGroupId_subject_paperType_key',
        columns: ['academicLevelId', 'academicGroupId', 'subject', 'paperType'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'exam_fees',
        constraint: 'exam_fees_examId_studentId_key',
        columns: ['examId', 'studentId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'exam_subjects',
        constraint: 'exam_subjects_examId_curriculumSubjectId_key',
        columns: ['examId', 'curriculumSubjectId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'marks',
        constraint: 'marks_examSubjectId_studentId_key',
        columns: ['examSubjectId', 'studentId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'results',
        constraint: 'results_examId_studentId_key',
        columns: ['examId', 'studentId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'sections',
        constraint: 'sections_academicLevelId_academicGroupId_name_key',
        columns: ['academicLevelId', 'academicGroupId', 'name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'student_academic_records',
        constraint: 'student_academic_records_studentId_academicSessionId_academicLevelId_key',
        columns: ['studentId', 'academicSessionId', 'academicLevelId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'student_subjects',
        constraint: 'student_subjects_studentAcademicRecordId_subject_paperType_key',
        columns: ['studentAcademicRecordId', 'subject', 'paperType'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'students',
        constraint: 'students_userId_key',
        columns: ['userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'students',
        constraint: 'students_studentId_key',
        columns: ['studentId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teacher_assignments',
        constraint:
          'teacher_assignments_teacherId_sectionId_curriculumSubjectId_academicSessionId_key',
        columns: ['teacherId', 'sectionId', 'curriculumSubjectId', 'academicSessionId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teachers',
        constraint: 'teachers_userId_key',
        columns: ['userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'teachers',
        constraint: 'teachers_employeeId_key',
        columns: ['employeeId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'academic_groups',
        index: 'academic_groups_academicLevelId_idx_38e73be7',
        columns: ['academicLevelId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'academic_levels',
        index: 'academic_levels_programId_idx_4e50c706',
        columns: ['programId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'academic_programs',
        index: 'academic_programs_isActive_idx_77fe3ba1',
        columns: ['isActive'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'academic_programs',
        index: 'academic_programs_type_idx_b6b604ea',
        columns: ['type'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'academic_sessions',
        index: 'academic_sessions_isActive_idx_77fe3ba1',
        columns: ['isActive'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_action_idx_cd0d2116',
        columns: ['action'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_createdAt_idx_9575dbd7',
        columns: ['createdAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_entity_entityId_idx_efadd7fc',
        columns: ['entity', 'entityId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'audit_logs',
        index: 'audit_logs_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'curriculum_subjects',
        index: 'curriculum_subjects_academicGroupId_idx_be9f60f5',
        columns: ['academicGroupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'curriculum_subjects',
        index: 'curriculum_subjects_academicLevelId_idx_38e73be7',
        columns: ['academicLevelId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'curriculum_subjects',
        index: 'curriculum_subjects_category_idx_f2600f8e',
        columns: ['category'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'curriculum_subjects',
        index: 'curriculum_subjects_subject_idx_4ed0a268',
        columns: ['subject'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exam_fees',
        index: 'exam_fees_examId_idx_a57bdadd',
        columns: ['examId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exam_fees',
        index: 'exam_fees_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exam_fees',
        index: 'exam_fees_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exam_subjects',
        index: 'exam_subjects_curriculumSubjectId_idx_cb86968f',
        columns: ['curriculumSubjectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exam_subjects',
        index: 'exam_subjects_examId_idx_a57bdadd',
        columns: ['examId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exam_subjects',
        index: 'exam_subjects_subject_idx_4ed0a268',
        columns: ['subject'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exams',
        index: 'exams_academicGroupId_idx_be9f60f5',
        columns: ['academicGroupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exams',
        index: 'exams_academicLevelId_idx_38e73be7',
        columns: ['academicLevelId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exams',
        index: 'exams_academicSessionId_idx_54f76507',
        columns: ['academicSessionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exams',
        index: 'exams_examType_idx_2dd5bbd5',
        columns: ['examType'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'exams',
        index: 'exams_resultPublished_idx_64ae4b16',
        columns: ['resultPublished'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'marks',
        index: 'marks_enteredBy_idx_38515340',
        columns: ['enteredBy'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'marks',
        index: 'marks_examSubjectId_idx_1db5019a',
        columns: ['examSubjectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'marks',
        index: 'marks_isPassed_idx_72411184',
        columns: ['isPassed'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'marks',
        index: 'marks_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_transactions',
        index: 'payment_transactions_gatewayTransactionId_idx_d57f7d12',
        columns: ['gatewayTransactionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_transactions',
        index: 'payment_transactions_paymentId_idx_b2fe9a10',
        columns: ['paymentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment_transactions',
        index: 'payment_transactions_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payments',
        index: 'payments_examFeeId_idx_50bf0705',
        columns: ['examFeeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payments',
        index: 'payments_gatewayTransactionId_idx_d57f7d12',
        columns: ['gatewayTransactionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payments',
        index: 'payments_gateway_idx_d24c9a9f',
        columns: ['gateway'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payments',
        index: 'payments_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payments',
        index: 'payments_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'results',
        index: 'results_examId_idx_a57bdadd',
        columns: ['examId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'results',
        index: 'results_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'results',
        index: 'results_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sections',
        index: 'sections_academicGroupId_idx_be9f60f5',
        columns: ['academicGroupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sections',
        index: 'sections_academicLevelId_idx_38e73be7',
        columns: ['academicLevelId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'sections',
        index: 'sections_isActive_idx_77fe3ba1',
        columns: ['isActive'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_academic_records',
        index: 'student_academic_records_academicGroupId_idx_be9f60f5',
        columns: ['academicGroupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_academic_records',
        index: 'student_academic_records_academicLevelId_idx_38e73be7',
        columns: ['academicLevelId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_academic_records',
        index: 'student_academic_records_academicSessionId_idx_54f76507',
        columns: ['academicSessionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_academic_records',
        index: 'student_academic_records_sectionId_idx_5d1ea56b',
        columns: ['sectionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_academic_records',
        index: 'student_academic_records_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_academic_records',
        index: 'student_academic_records_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_subjects',
        index: 'student_subjects_category_idx_f2600f8e',
        columns: ['category'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_subjects',
        index: 'student_subjects_curriculumSubjectId_idx_cb86968f',
        columns: ['curriculumSubjectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_subjects',
        index: 'student_subjects_studentAcademicRecordId_idx_64e61bf8',
        columns: ['studentAcademicRecordId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_subjects',
        index: 'student_subjects_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'student_subjects',
        index: 'student_subjects_subject_idx_4ed0a268',
        columns: ['subject'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'students',
        index: 'students_deletedAt_idx_a39f721c',
        columns: ['deletedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'students',
        index: 'students_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teacher_assignments',
        index: 'teacher_assignments_academicSessionId_idx_54f76507',
        columns: ['academicSessionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teacher_assignments',
        index: 'teacher_assignments_curriculumSubjectId_idx_cb86968f',
        columns: ['curriculumSubjectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teacher_assignments',
        index: 'teacher_assignments_isActive_idx_77fe3ba1',
        columns: ['isActive'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teacher_assignments',
        index: 'teacher_assignments_sectionId_idx_5d1ea56b',
        columns: ['sectionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teacher_assignments',
        index: 'teacher_assignments_teacherId_idx_bc266660',
        columns: ['teacherId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teachers',
        index: 'teachers_deletedAt_idx_a39f721c',
        columns: ['deletedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'teachers',
        index: 'teachers_employeeId_idx_087dd4a6',
        columns: ['employeeId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'users',
        index: 'users_isActive_idx_77fe3ba1',
        columns: ['isActive'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'users',
        index: 'users_role_idx_2c1ddf83',
        columns: ['role'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'academic_groups',
        foreignKey: {
          name: 'academic_groups_academicLevelId_fkey',
          columns: ['academicLevelId'],
          references: { schema: 'public', table: 'academic_levels', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'academic_levels',
        foreignKey: {
          name: 'academic_levels_programId_fkey',
          columns: ['programId'],
          references: { schema: 'public', table: 'academic_programs', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'audit_logs',
        foreignKey: {
          name: 'audit_logs_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'curriculum_subjects',
        foreignKey: {
          name: 'curriculum_subjects_academicLevelId_fkey',
          columns: ['academicLevelId'],
          references: { schema: 'public', table: 'academic_levels', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'curriculum_subjects',
        foreignKey: {
          name: 'curriculum_subjects_academicGroupId_fkey',
          columns: ['academicGroupId'],
          references: { schema: 'public', table: 'academic_groups', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'exam_fees',
        foreignKey: {
          name: 'exam_fees_examId_fkey',
          columns: ['examId'],
          references: { schema: 'public', table: 'exams', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'exam_fees',
        foreignKey: {
          name: 'exam_fees_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'students', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'exam_subjects',
        foreignKey: {
          name: 'exam_subjects_examId_fkey',
          columns: ['examId'],
          references: { schema: 'public', table: 'exams', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'exam_subjects',
        foreignKey: {
          name: 'exam_subjects_curriculumSubjectId_fkey',
          columns: ['curriculumSubjectId'],
          references: { schema: 'public', table: 'curriculum_subjects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'exams',
        foreignKey: {
          name: 'exams_academicSessionId_fkey',
          columns: ['academicSessionId'],
          references: { schema: 'public', table: 'academic_sessions', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'exams',
        foreignKey: {
          name: 'exams_academicLevelId_fkey',
          columns: ['academicLevelId'],
          references: { schema: 'public', table: 'academic_levels', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'exams',
        foreignKey: {
          name: 'exams_academicGroupId_fkey',
          columns: ['academicGroupId'],
          references: { schema: 'public', table: 'academic_groups', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'marks',
        foreignKey: {
          name: 'marks_examSubjectId_fkey',
          columns: ['examSubjectId'],
          references: { schema: 'public', table: 'exam_subjects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'marks',
        foreignKey: {
          name: 'marks_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'students', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'marks',
        foreignKey: {
          name: 'marks_enteredBy_fkey',
          columns: ['enteredBy'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payment_transactions',
        foreignKey: {
          name: 'payment_transactions_paymentId_fkey',
          columns: ['paymentId'],
          references: { schema: 'public', table: 'payments', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payments',
        foreignKey: {
          name: 'payments_examFeeId_fkey',
          columns: ['examFeeId'],
          references: { schema: 'public', table: 'exam_fees', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payments',
        foreignKey: {
          name: 'payments_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'students', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'results',
        foreignKey: {
          name: 'results_examId_fkey',
          columns: ['examId'],
          references: { schema: 'public', table: 'exams', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'results',
        foreignKey: {
          name: 'results_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'students', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'sections',
        foreignKey: {
          name: 'sections_academicLevelId_fkey',
          columns: ['academicLevelId'],
          references: { schema: 'public', table: 'academic_levels', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'sections',
        foreignKey: {
          name: 'sections_academicGroupId_fkey',
          columns: ['academicGroupId'],
          references: { schema: 'public', table: 'academic_groups', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_academic_records',
        foreignKey: {
          name: 'student_academic_records_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'students', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_academic_records',
        foreignKey: {
          name: 'student_academic_records_academicSessionId_fkey',
          columns: ['academicSessionId'],
          references: { schema: 'public', table: 'academic_sessions', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_academic_records',
        foreignKey: {
          name: 'student_academic_records_academicLevelId_fkey',
          columns: ['academicLevelId'],
          references: { schema: 'public', table: 'academic_levels', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_academic_records',
        foreignKey: {
          name: 'student_academic_records_academicGroupId_fkey',
          columns: ['academicGroupId'],
          references: { schema: 'public', table: 'academic_groups', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_academic_records',
        foreignKey: {
          name: 'student_academic_records_sectionId_fkey',
          columns: ['sectionId'],
          references: { schema: 'public', table: 'sections', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_subjects',
        foreignKey: {
          name: 'student_subjects_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'students', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_subjects',
        foreignKey: {
          name: 'student_subjects_studentAcademicRecordId_fkey',
          columns: ['studentAcademicRecordId'],
          references: { schema: 'public', table: 'student_academic_records', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'student_subjects',
        foreignKey: {
          name: 'student_subjects_curriculumSubjectId_fkey',
          columns: ['curriculumSubjectId'],
          references: { schema: 'public', table: 'curriculum_subjects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'students',
        foreignKey: {
          name: 'students_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teacher_assignments',
        foreignKey: {
          name: 'teacher_assignments_teacherId_fkey',
          columns: ['teacherId'],
          references: { schema: 'public', table: 'teachers', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teacher_assignments',
        foreignKey: {
          name: 'teacher_assignments_sectionId_fkey',
          columns: ['sectionId'],
          references: { schema: 'public', table: 'sections', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teacher_assignments',
        foreignKey: {
          name: 'teacher_assignments_curriculumSubjectId_fkey',
          columns: ['curriculumSubjectId'],
          references: { schema: 'public', table: 'curriculum_subjects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teacher_assignments',
        foreignKey: {
          name: 'teacher_assignments_academicSessionId_fkey',
          columns: ['academicSessionId'],
          references: { schema: 'public', table: 'academic_sessions', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'teachers',
        foreignKey: {
          name: 'teachers_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
