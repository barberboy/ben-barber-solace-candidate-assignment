import { arrayContains } from 'drizzle-orm';
import { NextRequest } from "next/server";

import db from "../../../db";
import { advocates } from "../../../db/schema";

/**
 * GET /api/advocates
 * 
 * Returns advocates, optionally filtered by specialty.
 * params:
 *  - specialties: String | String[]
 *  - limit: Number, default 10
 *  - offset: Number, default 0
 */
export async function GET(request: NextRequest) {
  // Support querying multiple specialties
  const specialties = request.nextUrl.searchParams.getAll('specialty')
  const limit = Number(request.nextUrl.searchParams.get('limit')) || 10
  const offset = Number(request.nextUrl.searchParams.get('offset')) || 0

  const data = await db
    .select()
    .from(advocates)
    .where(
      specialties.length
        ? arrayContains(advocates.specialties, specialties)
        : undefined
    )
    .limit(limit)
    .offset(offset)

  return Response.json({ data });
}
