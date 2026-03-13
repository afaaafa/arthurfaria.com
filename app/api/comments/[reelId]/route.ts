import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ reelId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { reelId } = await params;

  const { data, error } = await supabase
    .from("reel_comments")
    .select("id, username, content, created_at")
    .eq("reel_id", reelId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ comments: data });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { reelId } = await params;
  const body = await req.json();
  const content = (body.content ?? "").trim();
  const username = (body.username ?? "").trim() || null;

  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reel_comments")
    .insert({ reel_id: reelId, username, content })
    .select("id, username, content, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ comment: data }, { status: 201 });
}
