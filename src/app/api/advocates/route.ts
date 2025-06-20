import { arrayContains, asc, desc} from 'drizzle-orm';
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
  const queryParams = request.nextUrl.searchParams;
  const specialties = queryParams.getAll('specialty');
  const limit = Number(queryParams.get('limit')) || 10;
  const offset = Number(queryParams.get('offset')) || 0;
  const sortBy = queryParams.get('sortBy') || 'lastName';

  // Sort by either experience or last name/firstname
  const orderBy = (sortBy === 'experience')
    ? [desc(advocates.yearsOfExperience), asc(advocates.lastName), asc(advocates.firstName)]
    : [asc(advocates.lastName), asc(advocates.firstName)];

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
    .orderBy(...orderBy)

  return Response.json({ data });
}
