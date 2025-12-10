import { createClient } from "@/lib/supabase/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userIds } = await request.json();
    
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: "userIds must be a non-empty array" }, { status: 400 });
    }

    const supabase = createClient();
    
    // Get current user to verify they're authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch profiles for the requested user IDs
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, last_name")
      .in("id", userIds);
    
    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
    }

    // Return the profiles data - this ensures we have the latest data from the database
    const profilesMap: Record<string, { first_name?: string | null; last_name?: string | null }> = {};
    
    if (profiles) {
      for (const profile of profiles) {
        profilesMap[profile.id] = {
          first_name: profile.first_name,
          last_name: profile.last_name
        };
      }
    }

    return NextResponse.json({ profiles: profilesMap });
  } catch (error: unknown) {
    console.error("Error in profiles/sync route:", error);
    return NextResponse.json(
      { error: (error as Error)?.message || "Internal server error" },
      { status: 500 }
    );
  }
}



