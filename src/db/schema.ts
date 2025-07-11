import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";

export const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    specialties: text("specialties")
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    // specialties: text("specialties").array().notNull().default(sql`ARRAY[]::text[]`),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_specialties").using("gin", table.specialties)]
);

export const specialties = pgTable(
  "specialties",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    color: text("color").notNull().default("#ddd"),
  },
  (table) => [
    index("idx_specialty_name").using(
      "gin",
      sql`to_tsvector('english', ${table.name})`
    ),
  ]
);
