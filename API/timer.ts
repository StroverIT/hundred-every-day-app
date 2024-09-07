import { supabase } from "@/lib/supabase";

export const createTimer = async ({ userId, timer }: any) => {
  try {
    let [hour, minute] = timer.split(":");
    if (!minute) minute = "0";

    const { data, error } = await supabase
      .from("timer")
      .insert([
        {
          userId,
          hour: +hour,
          minute: +minute,
        },
      ])
      .select();
    console.log("data", error, data);

    if (data) return data[0];
  } catch (e) {
    console.log("error", e);
  }
};

export const getTimer = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("timer")
      .select("hour, minute")
      .eq("userId", userId);

    if (data) return data[0];
  } catch (e) {
    console.log("error", e);
  }
};

export const updateTimer = async ({ userId, timer }: any) => {
    try {
        let [hour, minute] = timer.split(":");
        if (!minute) minute = "0";
    
        const { data, error } = await supabase
        .from("timer")
        .update({
            hour: +hour,
            minute: +minute,
        })
        .eq("userId", userId)
        .select();
    
        if (data) return data[0];
    } catch (e) {
        console.log("error", e);
    }
    }