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

    // Fetch user metadata for the requested user IDs
    // Note: We can only get metadata for users we have access to
    // For security, we'll only return metadata that's safe to share
    const metadataMap: Record<string, { full_name?: string; name?: string }> = {};
    
    // Since we can't directly query auth.users, we'll return what we can from profiles
    // The profiles table should have first_name and last_name
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, last_name")
      .in("id", userIds);
    
    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
    } else if (profiles) {
      // Convert profiles to metadata format
      for (const profile of profiles) {
        if (profile.first_name || profile.last_name) {
          const fullName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
          if (fullName) {
            metadataMap[profile.id] = { full_name: fullName };
          }
        }
      }
    }

    return NextResponse.json({ metadata: metadataMap });
  } catch (error: any) {
    console.error("Error in users/metadata route:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

