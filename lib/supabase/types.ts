/**
 * Hand-authored database types matching the migration schema.
 * Run `supabase gen types typescript --local` once the project is linked
 * to replace this with auto-generated types.
 */

export type AccountSegment =
  | "bakery"
  | "restaurant"
  | "manufacturer"
  | "health_food"
  | "distributor";

export type UserRole = "customer_owner" | "customer_member" | "admin";

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "invoiced"
  | "cancelled";

export type LeadStatus = "new" | "contacted" | "converted" | "lost";

export type ProductCategory =
  | "whole_spices"
  | "ground_spices"
  | "herbs"
  | "blends"
  | "organic";

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string;
          business_name: string;
          cvr_number: string | null;
          segment: AccountSegment;
          address: string | null;
          payment_terms_days: number;
          min_order_value_ore: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["accounts"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["accounts"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          account_id: string;
          full_name: string;
          role: UserRole;
          locale: string;
          phone: string | null;
        };
        Insert: Database["public"]["Tables"]["profiles"]["Row"];
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      products: {
        Row: {
          id: string;
          slug: string;
          name_da: string;
          name_en: string;
          category: ProductCategory;
          origin_country: string;
          certifications: Record<string, boolean>;
          description_da: string | null;
          description_en: string | null;
          base_price_ore_per_kg: number;
          min_qty_kg: number;
          qty_step_kg: number;
          lead_time_days: number;
          coa_file_path: string | null;
          image_path: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      account_pricing: {
        Row: {
          account_id: string;
          product_id: string;
          price_ore_per_kg: number;
        };
        Insert: Database["public"]["Tables"]["account_pricing"]["Row"];
        Update: Partial<Database["public"]["Tables"]["account_pricing"]["Row"]>;
      };
      orders: {
        Row: {
          id: string;
          account_id: string;
          placed_by: string;
          status: OrderStatus;
          subtotal_ore: number;
          moms_ore: number;
          total_ore: number;
          requested_delivery_date: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          qty_kg: number;
          unit_price_ore_per_kg: number;
          line_subtotal_ore: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      saved_lists: {
        Row: {
          id: string;
          account_id: string;
          name: string;
          created_by: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["saved_lists"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["saved_lists"]["Insert"]>;
      };
      saved_list_items: {
        Row: {
          id: string;
          list_id: string;
          product_id: string;
          qty_kg: number;
        };
        Insert: Omit<Database["public"]["Tables"]["saved_list_items"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["saved_list_items"]["Insert"]>;
      };
      conversations: {
        Row: {
          id: string;
          account_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["conversations"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_profile_id: string;
          body: string;
          attachment_path: string | null;
          created_at: string;
          read_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["messages"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          business_name: string;
          contact_name: string;
          email: string;
          phone: string | null;
          segment: AccountSegment | null;
          message: string | null;
          created_at: string;
          status: LeadStatus;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      carts: {
        Row: {
          id: string;
          profile_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["carts"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["carts"]["Insert"]>;
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          qty_kg: number;
        };
        Insert: Omit<Database["public"]["Tables"]["cart_items"]["Row"], "id"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["cart_items"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      account_segment: AccountSegment;
      user_role: UserRole;
      order_status: OrderStatus;
      lead_status: LeadStatus;
      product_category: ProductCategory;
    };
  };
}
