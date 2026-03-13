import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ reelId: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { reelId } = await params;

  const { data, error } = await supabase
    .from("reel_likes")
    .select("count")
    .eq("reel_id", reelId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ count: data?.count ?? 0 });
}

export async function POST(_req: NextRequest, { params }: Params) {
  const { reelId } = await params;

  const { error } = await supabase.rpc("increment_like", { p_reel_id: reelId });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { reelId } = await params;

  const { error } = await supabase.rpc("decrement_like", { p_reel_id: reelId });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
