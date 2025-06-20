import { sql } from 'drizzle-orm'

import db from "../../../db";
import { advocates } from "../../../db/schema";


export async function GET() {
  const data = await db.execute(
    sql`SELECT distinct(unnest(${advocates.specialties})) as name FROM ${advocates} order by name asc`
  )
  const specialties = data.map(({ name }) => name)
  return Response.json({ data: specialties });
}
