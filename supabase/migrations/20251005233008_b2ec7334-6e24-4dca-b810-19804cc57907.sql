-- Table pour les notes
CREATE TABLE public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  teacher_id UUID NOT NULL REFERENCES public.teacher_profiles(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  grade DECIMAL(5,2) NOT NULL CHECK (grade >= 0 AND grade <= 20),
  coefficient DECIMAL(3,1) DEFAULT 1.0,
  grade_type TEXT NOT NULL CHECK (grade_type IN ('devoir', 'controle', 'examen', 'oral')),
  comment TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les bulletins
CREATE TABLE public.report_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  trimester TEXT NOT NULL CHECK (trimester IN ('1', '2', '3')),
  school_year TEXT NOT NULL,
  average DECIMAL(5,2),
  rank INTEGER,
  teacher_comment TEXT,
  principal_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, class_id, trimester, school_year)
);

-- Table pour les événements
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('reunion', 'sortie', 'examen', 'vacances', 'autre')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les absences
CREATE TABLE public.absences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('matin', 'apres-midi', 'journee')),
  reason TEXT,
  justified BOOLEAN DEFAULT false,
  justification_document TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('parent', 'teacher', 'admin')),
  recipient_id UUID NOT NULL,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('parent', 'teacher', 'admin')),
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  parent_message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les devoirs
CREATE TABLE public.homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES public.teacher_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour les documents
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  document_type TEXT NOT NULL CHECK (document_type IN ('cours', 'exercice', 'correction', 'circulaire', 'autre')),
  file_url TEXT NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table pour l'emploi du temps
CREATE TABLE public.schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.teacher_profiles(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 5),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.absences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

-- RLS Policies pour les notes
CREATE POLICY "Teachers can manage grades for their classes" ON public.grades
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.teacher_classes tc
      WHERE tc.teacher_id = teacher_id AND tc.teacher_id IN (
        SELECT id FROM public.teacher_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can manage all grades" ON public.grades
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Parents can view their children's grades" ON public.grades
  FOR SELECT USING (has_role(auth.uid(), 'parent'::app_role));

-- RLS Policies pour les bulletins
CREATE POLICY "Teachers can manage report cards" ON public.report_cards
  FOR ALL USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Parents can view their children's report cards" ON public.report_cards
  FOR SELECT USING (has_role(auth.uid(), 'parent'::app_role));

-- RLS Policies pour les événements
CREATE POLICY "Everyone can view events" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Teachers and admins can manage events" ON public.events
  FOR ALL USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies pour les absences
CREATE POLICY "Teachers can manage absences" ON public.absences
  FOR ALL USING (
    has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Parents can view their children's absences" ON public.absences
  FOR SELECT USING (has_role(auth.uid(), 'parent'::app_role));

-- RLS Policies pour les messages
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (
    sender_id = auth.uid() OR recipient_id = auth.uid()
  );

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their received messages" ON public.messages
  FOR UPDATE USING (recipient_id = auth.uid());

-- RLS Policies pour les devoirs
CREATE POLICY "Everyone can view homework" ON public.homework
  FOR SELECT USING (true);

CREATE POLICY "Teachers can manage homework" ON public.homework
  FOR ALL USING (
    teacher_id IN (
      SELECT id FROM public.teacher_profiles WHERE user_id = auth.uid()
    ) OR has_role(auth.uid(), 'admin'::app_role)
  );

-- RLS Policies pour les documents
CREATE POLICY "Everyone can view documents" ON public.documents
  FOR SELECT USING (true);

CREATE POLICY "Teachers and admins can manage documents" ON public.documents
  FOR ALL USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies pour l'emploi du temps
CREATE POLICY "Everyone can view schedules" ON public.schedules
  FOR SELECT USING (true);

CREATE POLICY "Teachers and admins can manage schedules" ON public.schedules
  FOR ALL USING (has_role(auth.uid(), 'teacher'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Triggers pour updated_at
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON public.grades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_report_cards_updated_at BEFORE UPDATE ON public.report_cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_absences_updated_at BEFORE UPDATE ON public.absences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_homework_updated_at BEFORE UPDATE ON public.homework
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON public.schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();