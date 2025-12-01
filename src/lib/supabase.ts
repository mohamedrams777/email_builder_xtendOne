import { supabase } from "@/integrations/supabase/client";

export interface Template {
  id: string;
  name: string;
  type: "email" | "invoice";
  thumbnail: string | null;
  blocks: any[];
  is_public: boolean;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export const templateService = {
  async getTemplates(type?: "email" | "invoice") {
    let query = supabase.from("templates").select("*");
    
    if (type) {
      query = query.eq("type", type);
    }
    
    const { data, error } = await query.order("created_at", { ascending: false });
    
    if (error) throw error;
    return data as Template[];
  },

  async saveTemplate(template: Partial<Template>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("You must be logged in to save templates");
    }

    const templateData: any = {
      name: template.name,
      type: template.type,
      thumbnail: template.thumbnail,
      blocks: template.blocks,
      is_public: template.is_public,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("templates")
      .insert(templateData)
      .select()
      .single();

    if (error) throw error;
    return data as Template;
  },

  async updateTemplate(id: string, updates: Partial<Template>) {
    const { data, error } = await supabase
      .from("templates")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Template;
  },

  async deleteTemplate(id: string) {
    const { error } = await supabase
      .from("templates")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};
