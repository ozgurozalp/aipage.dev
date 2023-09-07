import { NextResponse } from "next/server";
import altogic from "@/utils/altogic";
import { getSessionCookie } from "@/utils/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { type, name, token } = await req.json();

  // @ts-ignore
  altogic.auth.setSession({
    token: getSessionCookie() as string,
  });

  try {
    const { data, errors } = await altogic.endpoint.post(
      "/add-integration",
      {
        type,
        name,
        token,
        parentId: params.id,
      },
      undefined,
      {
        Session: getSessionCookie(),
      },
    );

    if (errors) return NextResponse.json({ errors }, { status: errors.status });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
