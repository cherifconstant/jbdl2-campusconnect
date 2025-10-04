-- Create classes table
CREATE TABLE IF NOT EXISTS public.classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  level text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on classes
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Classes are viewable by everyone (authenticated)
CREATE POLICY "Classes are viewable by authenticated users"
ON public.classes
FOR SELECT
TO authenticated
USING (true);

-- Only admins can manage classes
CREATE POLICY "Admins can manage classes"
ON public.classes
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create teacher_profiles table
CREATE TABLE IF NOT EXISTS public.teacher_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  subject text,
  qualification text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on teacher_profiles
ALTER TABLE public.teacher_profiles ENABLE ROW LEVEL SECURITY;

-- Teachers can view and update their own profile
CREATE POLICY "Teachers can view own profile"
ON public.teacher_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can update own profile"
ON public.teacher_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can insert own profile"
ON public.teacher_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Admins can view all teacher profiles
CREATE POLICY "Admins can view all teacher profiles"
ON public.teacher_profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create teacher_classes junction table
CREATE TABLE IF NOT EXISTS public.teacher_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL REFERENCES public.teacher_profiles(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(teacher_id, class_id)
);

-- Enable RLS on teacher_classes
ALTER TABLE public.teacher_classes ENABLE ROW LEVEL SECURITY;

-- Teachers can view their own class assignments
CREATE POLICY "Teachers can view own classes"
ON public.teacher_classes
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.teacher_profiles
    WHERE teacher_profiles.id = teacher_classes.teacher_id
    AND teacher_profiles.user_id = auth.uid()
  )
);

-- Teachers can manage their own class assignments
CREATE POLICY "Teachers can manage own classes"
ON public.teacher_classes
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.teacher_profiles
    WHERE teacher_profiles.id = teacher_classes.teacher_id
    AND teacher_profiles.user_id = auth.uid()
  )
);

-- Admins can manage all teacher class assignments
CREATE POLICY "Admins can manage all teacher classes"
ON public.teacher_classes
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert some default classes
INSERT INTO public.classes (name, level, description) VALUES
  ('6ème A', '6ème', 'Classe de 6ème section A'),
  ('6ème B', '6ème', 'Classe de 6ème section B'),
  ('5ème A', '5ème', 'Classe de 5ème section A'),
  ('5ème B', '5ème', 'Classe de 5ème section B'),
  ('4ème A', '4ème', 'Classe de 4ème section A'),
  ('4ème B', '4ème', 'Classe de 4ème section B'),
  ('3ème A', '3ème', 'Classe de 3ème section A'),
  ('3ème B', '3ème', 'Classe de 3ème section B')
ON CONFLICT DO NOTHING;