import { ArmyRank, BodyDamageInfo, DischargeReason, EvacuationTransport, EvacuationType, Forms, Gender, RecordType, SanitaryTreatmentStatus } from '../../api';

import { briefsTbl, conclusionsTbl, dischargesTbl, forms100Tbl, personsTbl, referralsTbl } from '../../constants';

import { db } from './knex';

const handleCheckError = (tableName: string) => (e: unknown) => console.log(`Could not check if "${tableName}" table exists`, e);
const handleCreateError = (tableName: string) => (e: unknown) => console.log(`Error creating table "${tableName}"`, e);

const handleCreateSuccess = (tableName: string) => () => console.log(`Created table "${tableName}"`);

Promise.all([
    db.schema.hasTable(personsTbl)
        .then(res => {
            if (res) {
                return;
            }
            db.schema.createTable(personsTbl, table => {
                table.increments('id').primary();
                table.string('fullName').notNullable().defaultTo('');
                table.string('personalId').notNullable().defaultTo('');
                table.date('birthDate');
                table.string('tokenNumber');
                table.enum('rank', Object.values(ArmyRank));
                table.enum('gender', Object.values(Gender));
                table.string('militaryBase').notNullable().defaultTo('');
                table.string('phoneNumber');
                table.string('oblast').notNullable().defaultTo('');
                table.string('region').notNullable().defaultTo('');
                table.string('settlement').notNullable().defaultTo('');
                table.string('street').notNullable().defaultTo('');
                table.string('building').notNullable().defaultTo('');
                table.string('appartments');
                table.string('profession');
                table.datetime('updatedAt');
                table.json('lastRecords');
            })
            .then(handleCreateSuccess('persons'))
            .catch(handleCreateError('persons'))
        })
        .catch(handleCheckError('persons')),

    db.schema.hasTable(forms100Tbl)
        .then(res => {
            if (res) {
                return;
            }
            db.schema.createTable(forms100Tbl, table => {
                table.increments('id').primary();
                table.string('clinic').notNullable().defaultTo('');
                table.string('author').notNullable().defaultTo('');
                table.integer('personId').notNullable();
                table.datetime('date').notNullable().defaultTo(new Date().toISOString());
                table.enum('reason', Object.values(RecordType)).notNullable().defaultTo('');
                Object.keys(BodyDamageInfo).forEach(key => {
                    table.boolean(BodyDamageInfo[key]);
                })
                table.boolean('firearm');
                table.boolean('nuclear');
                table.boolean('chemical');
                table.boolean('biological');
                table.boolean('other');
                table.boolean('hypothermia');
                table.boolean('illness');
                table.boolean('infection');
                table.boolean('mechanical');
                table.boolean('reactive');
                table.string('antibiotic');
                table.string('serum');
                table.string('toxoid');
                table.string('antidote');
                table.string('painReliever');
                table.boolean('bloodTransfusion');
                table.boolean('bloodSubstitute');
                table.boolean('immobilization');
                table.boolean('dressing');
                table.boolean('bandage');
                table.boolean('sanitary');
                table.boolean('additionalInfo');
                table.datetime('plait');
                table.enum('sanitaryTreatment', Object.values(SanitaryTreatmentStatus));
                table.enum('evacuationTransport', Object.values(EvacuationTransport));
                table.enum('evacuationType', Object.values(EvacuationType));
                table.json('evacuationClinics').notNullable().defaultTo(JSON.stringify({}));
                table.enum('evacuationPriority', ['I', 'II', 'III']);
                table.string('diagnosis').notNullable().defaultTo('');
                table.string('stage').notNullable().defaultTo('');
                // TODO think about signature saving
                table.string('signature');
                table.string('fullDiagnosis').notNullable().defaultTo('');
                table.string('treatmentInfo').notNullable().defaultTo('');
                table.jsonb('damageCoords');
                table.string('fullEvacuationInfo').notNullable().defaultTo('');
                table.string('result').notNullable().defaultTo('');
                table.boolean('selfLeave');
                table.string('carriedBy');
                table.timestamp('timeAfterAccident');
                table.string('firstAidInfo').notNullable().defaultTo('');
            })
            .then(handleCreateSuccess('forms100'))
            .catch(handleCreateError('forms100'))
        })
        .catch(handleCheckError('forms100')),

    db.schema.hasTable(briefsTbl)
        .then(res => {
            if (res) {
                return;
            }
            db.schema.createTable(briefsTbl, table => {
                table.increments('id').primary();
                table.datetime('date').notNullable();
                table.string('fullDiagnosis').notNullable().defaultTo('');
                table.enum('type', Object.values(Forms));
                table.integer('personId').notNullable();
                table.integer('formId').notNullable();
            })
            .then(handleCreateSuccess('briefs'))
            .catch(handleCreateError('briefs'))
        })
        .catch(handleCheckError('briefs')),

    db.schema.hasTable(dischargesTbl)
        .then(res => {
            if (res) {
                return;
            }
            db.schema.createTable(dischargesTbl, table => {
                table.increments('id').primary();
                table.integer('personId').notNullable();
                table.string('receiver').notNullable().defaultTo('');
                table.enum('reason', Object.values(DischargeReason)).notNullable();
                table.datetime('sickDate').notNullable();
                table.datetime('referralDate').notNullable();
                table.datetime('arrivalDate').notNullable();
                table.datetime('leavingDate').notNullable();
                table.string('fullDiagnosis').notNullable().defaultTo('');
                table.string('info').notNullable().defaultTo('');
                table.string('recommendations').notNullable().defaultTo('');
                table.datetime('date').notNullable().defaultTo(new Date().toISOString());
                table.string('doctor').notNullable().defaultTo('');
            })
            .then(handleCreateSuccess('discharges'))
            .catch(handleCreateError('discharges'))
        })
        .catch(handleCheckError('discharges')),   

    db.schema.hasTable(referralsTbl)
        .then(res => {
            if (res) {
                return;
            }
            db.schema.createTable(referralsTbl, table => {
                table.increments('id').primary();
                table.integer('personId').notNullable();
                table.string('militaryBase').notNullable().defaultTo('');
                table.string('code').notNullable().defaultTo('');
                table.datetime('date').notNullable().defaultTo(new Date().toISOString());
                table.string('militaryBaseAddress').notNullable().defaultTo('');
                table.string('number').notNullable().defaultTo('');
                table.string('receiver').notNullable().defaultTo('');
                table.string('patient').notNullable().defaultTo('');
                table.string('diagnosis').notNullable().defaultTo('');
                table.string('commander').notNullable().defaultTo('');
                table.string('medicalCommander').notNullable().defaultTo('');
            })
            .then(handleCreateSuccess('referrals'))
            .catch(handleCreateError('referrals'))
        })
        .catch(handleCheckError('referrals')),
    
    db.schema.hasTable(conclusionsTbl)
        .then(res => {
            if (res) {
                return;
            }
            db.schema.createTable(conclusionsTbl, table => {
                table.increments('id').primary();
                table.integer('personId').notNullable();
                table.string('sender').notNullable().defaultTo('');
                table.string('doctor').notNullable().defaultTo('');
                table.string('labResults');
                table.string('researchResults');
                table.string('diagnosis').notNullable().defaultTo('');
                table.string('recommendations');
                table.datetime('date').notNullable().defaultTo(new Date().toISOString());
                table.string('headOfTheClinic').notNullable().defaultTo('');
            })
            .then(handleCreateSuccess('conclusions'))
            .catch(handleCreateError('conclusions'))
        })
        .catch(handleCheckError('conclusions')),
]);
