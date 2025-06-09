import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  const data = await db
    .select()
    .from(advocates)
    // TODO: .where() filter by specialty 
    .limit(50);

  return Response.json({ data });
}
