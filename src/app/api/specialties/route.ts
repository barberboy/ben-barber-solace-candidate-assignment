// TODO fetch this from the database
import specialtiesList from "@/app/utils/specialties-list";

export async function GET() {
  return Response.json({ data: specialtiesList });
}
