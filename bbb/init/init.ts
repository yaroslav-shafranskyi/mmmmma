import {
  ArmyRank,
  BodyDamageInfo,
  DischargeReason,
  EvacuationTransport,
  EvacuationType,
  Forms,
  Gender,
  RecordType,
  SanitaryTreatmentStatus,
  UserType,
} from "../../api";

import {
  briefsTbl,
  conclusionsTbl,
  dischargesTbl,
  forms100Tbl,
  personsTbl,
  referralsTbl,
  usersTbl,
} from "../../constants";

import { db } from "./knex";

const handleCheckError = (tableName: string) => (e: unknown) =>
  console.log(`Could not check if "${tableName}" table exists`, e);
const handleCreateError = (tableName: string) => (e: unknown) =>
  console.log(`Error creating table "${tableName}"`, e);

const handleCreateSuccess = (tableName: string) => () =>
  console.log(`Created table "${tableName}"`);

Promise.all([
  // db.schema.dropTableIfExists(personsTbl)
  //     .then(res => {
  //         // if (res) {
  //         //     return;
  //         // }
  //         db.schema.createTable(personsTbl, table => {
  //             table.increments('id').primary();
  //             table.string('fullName').notNullable().defaultTo('');
  //             table.string('personalId').notNullable().defaultTo('');
  //             table.bigint('birthDate');
  //             table.string('tokenNumber');
  //             table.enum('rank', [...Object.values(ArmyRank), null]);
  //             table.enum('gender', [...Object.values(Gender), null]);
  //             table.string('militaryBase').notNullable().defaultTo('');
  //             table.string('phoneNumber');
  //             table.string('oblast').notNullable().defaultTo('');
  //             table.string('region').notNullable().defaultTo('');
  //             table.string('settlement').notNullable().defaultTo('');
  //             table.string('street').notNullable().defaultTo('');
  //             table.string('building').notNullable().defaultTo('');
  //             table.string('appartments');
  //             table.string('profession');
  //             table.bigint('updatedAt');
  //             table.smallint('lastForm100Id');
  //             table.smallint('lastConclusionId');
  //             table.smallint('lastDischargeId');
  //             table.smallint('lastReferralId');
  //             table.smallint('recordsQuantity').notNullable().defaultTo(0);
  //             table.string('lastRecordDiagnosis');
  //         })
  //         .then(handleCreateSuccess('persons'))
  //         .catch(handleCreateError('persons'))
  //     })
  //     .catch(handleCheckError('persons')),

  // db.schema
  //   .dropTableIfExists(forms100Tbl)
  //   .then((res) => {
  //     // if (res) {
  //     //     return;
  //     // }
  //     db.schema
  //       .createTable(forms100Tbl, (table) => {
  //         table.increments("id").primary();
  //         table.string("clinic").notNullable().defaultTo("");
  //         table.string("author").notNullable().defaultTo("");
  //         table.smallint("personId").notNullable();
  //         table.smallint("doctorId").notNullable();
  //         table.bigint("date").notNullable().defaultTo(Date.now());
  //         table.bigint("accidentTime").notNullable();
  //         table
  //           .enum("reason", Object.values(RecordType))
  //           .notNullable()
  //           .defaultTo("");
  //         Object.keys(BodyDamageInfo).forEach((key) => {
  //           table.boolean(key);
  //         });
  //         table.boolean("firearm");
  //         table.boolean("nuclear");
  //         table.boolean("chemical");
  //         table.boolean("biological");
  //         table.boolean("other");
  //         table.boolean("hypothermia");
  //         table.boolean("illness");
  //         table.boolean("infection");
  //         table.boolean("mechanical");
  //         table.boolean("reactive");
  //         table.string("antibiotic");
  //         table.string("serum");
  //         table.string("toxoid");
  //         table.string("antidote");
  //         table.string("painReliever");
  //         table.boolean("bloodTransfusion");
  //         table.boolean("bloodSubstitute");
  //         table.boolean("immobilization");
  //         table.boolean("dressing");
  //         table.boolean("bandage");
  //         table.boolean("sanitary");
  //         table.boolean("additionalInfo");
  //         table.bigint("plait");
  //         table.enum(
  //           "sanitaryTreatment",
  //           Object.values(SanitaryTreatmentStatus)
  //         );
  //         table.enum("evacuationTransport", Object.values(EvacuationTransport));
  //         table.enum("evacuationType", Object.values(EvacuationType));
  //         table
  //           .json("evacuationClinics")
  //           .notNullable()
  //           .defaultTo(JSON.stringify({}));
  //         table.enum("evacuationPriority", ["I", "II", "III"]);
  //         table.string("diagnosis").notNullable().defaultTo("");
  //         table.string("stage").notNullable().defaultTo("");
  //         table.string("signature", 1000000);
  //         table.string("fullDiagnosis").notNullable().defaultTo("");
  //         table.string("treatmentInfo").notNullable().defaultTo("");
  //         table.jsonb("damageCoords");
  //         table.string("fullEvacuationInfo").notNullable().defaultTo("");
  //         table.string("result").notNullable().defaultTo("");
  //         table.boolean("selfLeave");
  //         table.string("carriedBy");
  //         table.integer("timeAfterAccident");
  //         table.string("firstAidInfo").notNullable().defaultTo("");
  //       })
  //       .then(handleCreateSuccess("forms100"))
  //       .catch(handleCreateError("forms100"));
  //   })
  //   .catch(handleCheckError("forms100")),

  // db.schema
  //   .dropTableIfExists(briefsTbl)
  //   .then((res) => {
  //     // if (res) {
  //     //     return;
  //     // }
  //     db.schema
  //       .createTable(briefsTbl, (table) => {
  //         table.increments("id").primary();
  //         table.bigint("date").notNullable();
  //         table.string("fullDiagnosis").notNullable().defaultTo("");
  //         table.enum("type", Object.values(Forms));
  //         table.smallint("personId").notNullable();
  //         table.smallint("formId").notNullable();
  //         table.smallint("doctorId").notNullable();
  //       })
  //       .then(handleCreateSuccess("briefs"))
  //       .catch(handleCreateError("briefs"));
  //   })
  //   .catch(handleCheckError("briefs")),

  // db.schema
  //   .dropTableIfExists(dischargesTbl)
  //   .then((res) => {
  //     // if (res) {
  //     //     return;
  //     // }
  //     db.schema
  //       .createTable(dischargesTbl, (table) => {
  //         table.increments("id").primary();
  //         table.smallint("personId").notNullable();
  //         table.smallint("doctorId").notNullable();
  //         table.string("clinic").notNullable().defaultTo("");
  //         table.string("code").notNullable().defaultTo(""),
  //           table.string("department").notNullable().defaultTo(""),
  //           table.string("orderNumber").notNullable().defaultTo(""),
  //           table.bigint("orderDate").notNullable();
  //         table.string("receiver").notNullable().defaultTo("");
  //         table.enum("reason", Object.values(DischargeReason)).notNullable();
  //         table.bigint("sickDate").notNullable();
  //         table.bigint("referralDate").notNullable();
  //         table.bigint("arrivalDate").notNullable();
  //         table.bigint("leavingDate").notNullable();
  //         table.string("fullDiagnosis").notNullable().defaultTo("");
  //         table.string("info").notNullable().defaultTo("");
  //         table.string("recommendations").notNullable().defaultTo("");
  //         table.bigint("date").notNullable().defaultTo(Date.now());
  //         table.string("doctor").notNullable().defaultTo("");
  //         table.string("signature", 1000000);
  //       })
  //       .then(handleCreateSuccess("discharges"))
  //       .catch(handleCreateError("discharges"));
  //   })
  //   .catch(handleCheckError("discharges")),

  // db.schema
  //   .dropTableIfExists(referralsTbl)
  //   .then((res) => {
  //     // if (res) {
  //     //     return;
  //     // }
  //     db.schema
  //       .createTable(referralsTbl, (table) => {
  //         table.increments("id").primary();
  //         table.smallint("personId").notNullable();
  //         table.smallint("doctorId").notNullable();
  //         table.string("militaryBase").notNullable().defaultTo("");
  //         table.string("code").notNullable().defaultTo("");
  //         table.bigint("date").notNullable().defaultTo(Date.now());
  //         table.string("militaryBaseAddress").notNullable().defaultTo("");
  //         table.string("number").notNullable().defaultTo("");
  //         table.string("receiver").notNullable().defaultTo("");
  //         table.string("patient").notNullable().defaultTo("");
  //         table.string("diagnosis").notNullable().defaultTo("");
  //         table.string("commanderName").notNullable().defaultTo("");
  //         table.string("commanderPosition").notNullable();
  //         table.string("medicalCommanderName").notNullable().defaultTo("");
  //         table.string("medicalCommanderPosition").notNullable().defaultTo("");
  //       })
  //       .then(handleCreateSuccess("referrals"))
  //       .catch(handleCreateError("referrals"));
  //   })
  //   .catch(handleCheckError("referrals")),

  // db.schema
  //   .dropTableIfExists(conclusionsTbl)
  //   .then((res) => {
  //     // if (res) {
  //     //     return;
  //     // }
  //     db.schema
  //       .createTable(conclusionsTbl, (table) => {
  //         table.increments("id").primary();
  //         table.smallint("personId").notNullable();
  //         table.smallint("doctorId").notNullable();
  //         table.string("clinic").notNullable().defaultTo("");
  //         table.string("code").notNullable().defaultTo(""),
  //           table.string("department").notNullable().defaultTo(""),
  //           table.string("orderNumber").notNullable().defaultTo(""),
  //           table.bigint("orderDate").notNullable();
  //         table.string("sender").notNullable().defaultTo("");
  //         table.string("doctor").notNullable().defaultTo("");
  //         table.string("labResults");
  //         table.string("researchResults");
  //         table.string("diagnosis").notNullable().defaultTo("");
  //         table.string("recommendations");
  //         table.bigint("date").notNullable().defaultTo(Date.now());
  //         table.string("headOfTheClinic").notNullable().defaultTo("");
  //         table.string("signature", 1000000);
  //       })
  //       .then(handleCreateSuccess("conclusions"))
  //       .catch(handleCreateError("conclusions"));
  //   })
  //   .catch(handleCheckError("conclusions")),

  // db.schema
  //   .dropTableIfExists(usersTbl)
  //   .then(async () =>
  //     db.schema
  //       .createTable(usersTbl, (table) => {
  //         table.increments("id").primary();
  //         table.enum("role", Object.values(UserType));
  //         table.string("user").notNullable();
  //         table.string("militaryBase");
  //         table.string("fullName");
  //         table.string("clinic");
  //         table.string("signature", 1000000);
  //         table.string("position");
  //         table
  //           .uuid("password")
  //           .notNullable()
  //           .defaultTo(db.raw("uuid_generate_v4()"));
  //         table.string("phone");
  //         table.string("email");
  //         table.enum("rank", Object.values(ArmyRank));
  //         table.string("subdivision");
  //       })
  //       .then(await db.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`))
  //       .then(handleCreateSuccess("users"))
  //       .catch(handleCreateError)
  //   )
  //   .catch(handleCheckError),

  // db.table(usersTbl).insert({
  //   user: "sslavko",
  //   role: UserType.SUPER_ADMIN,
  // }),

  db(usersTbl)
    .select("password")
    .where({ user: "sslavko" })
    .then((res) => {
      console.log({ res });
    }),
]);
