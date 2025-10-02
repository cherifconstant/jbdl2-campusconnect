export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      categories_2025_09_27_17_00: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          read: boolean | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          read?: boolean | null
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          read?: boolean | null
          subject?: string
        }
        Relationships: []
      }
      favorite_sentences_2025_09_27_17_05: {
        Row: {
          created_at: string | null
          id: string
          sentence_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          sentence_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          sentence_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorite_sentences_2025_09_27_17_05_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentences_2025_09_27_17_05"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_images: {
        Row: {
          category: string
          created_at: string
          date: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string
          is_main_image: boolean | null
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          date?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_main_image?: boolean | null
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_main_image?: boolean | null
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_2025_09_27_17_00: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      order_items_2025_09_27_17_00: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          order_id: string | null
          price: number
          product_id: string | null
          quantity: number
          size: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          price: number
          product_id?: string | null
          quantity: number
          size?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string | null
          quantity?: number
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_2025_09_27_17_00_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_2025_09_27_17_00"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_2025_09_27_17_00_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_2025_09_27_17_00"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_2025_09_27_17_00: {
        Row: {
          created_at: string | null
          id: string
          payment_intent_id: string | null
          shipping_address: Json | null
          status: string | null
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payment_intent_id?: string | null
          shipping_address?: Json | null
          status?: string | null
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payment_intent_id?: string | null
          shipping_address?: Json | null
          status?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products_2025_09_27_17_00: {
        Row: {
          category_id: string | null
          colors: string[] | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          price: number
          sale_price: number | null
          sizes: string[] | null
          slug: string
          stock_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          colors?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          price: number
          sale_price?: number | null
          sizes?: string[] | null
          slug: string
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          colors?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          price?: number
          sale_price?: number | null
          sizes?: string[] | null
          slug?: string
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_2025_09_27_17_00_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_2025_09_27_17_00"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews_2025_09_27_17_00: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          product_id: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_2025_09_27_17_00_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_2025_09_27_17_00"
            referencedColumns: ["id"]
          },
        ]
      }
      sentences_2025_09_27_17_05: {
        Row: {
          created_at: string | null
          difficulty_level: number | null
          id: number
          language: string
          text: string
        }
        Insert: {
          created_at?: string | null
          difficulty_level?: number | null
          id: number
          language: string
          text: string
        }
        Update: {
          created_at?: string | null
          difficulty_level?: number | null
          id?: number
          language?: string
          text?: string
        }
        Relationships: []
      }
      translations_2025_09_27_17_05: {
        Row: {
          created_at: string | null
          id: string
          sentence_id: number | null
          translation_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          sentence_id?: number | null
          translation_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          sentence_id?: number | null
          translation_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "translations_2025_09_27_17_05_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentences_2025_09_27_17_05"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_2025_09_27_17_05_translation_id_fkey"
            columns: ["translation_id"]
            isOneToOne: false
            referencedRelation: "sentences_2025_09_27_17_05"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles_2025_09_27_17_00: {
        Row: {
          address: Json | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_profiles_2025_09_27_17_05: {
        Row: {
          created_at: string | null
          id: string
          learning_level: string | null
          native_language: string | null
          preferred_languages: string[] | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          learning_level?: string | null
          native_language?: string | null
          preferred_languages?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          learning_level?: string | null
          native_language?: string | null
          preferred_languages?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_progress_2025_09_27_17_05: {
        Row: {
          created_at: string | null
          id: string
          last_reviewed: string | null
          mastery_level: number | null
          next_review: string | null
          review_count: number | null
          sentence_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_reviewed?: string | null
          mastery_level?: number | null
          next_review?: string | null
          review_count?: number | null
          sentence_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_reviewed?: string | null
          mastery_level?: number | null
          next_review?: string | null
          review_count?: number | null
          sentence_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_2025_09_27_17_05_sentence_id_fkey"
            columns: ["sentence_id"]
            isOneToOne: false
            referencedRelation: "sentences_2025_09_27_17_05"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats_2025_09_27_17_05: {
        Row: {
          accuracy_percentage: number | null
          created_at: string | null
          date: string | null
          exercises_completed: number | null
          id: string
          sentences_studied: number | null
          time_spent_minutes: number | null
          user_id: string | null
        }
        Insert: {
          accuracy_percentage?: number | null
          created_at?: string | null
          date?: string | null
          exercises_completed?: number | null
          id?: string
          sentences_studied?: number | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Update: {
          accuracy_percentage?: number | null
          created_at?: string | null
          date?: string | null
          exercises_completed?: number | null
          id?: string
          sentences_studied?: number | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      wishlist_2025_09_27_17_00: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_2025_09_27_17_00_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_2025_09_27_17_00"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "teacher" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher", "parent"],
    },
  },
} as const
