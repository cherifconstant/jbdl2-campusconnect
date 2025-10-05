import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, BookOpen } from 'lucide-react';

const TeachersGrades = () => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    classId: '',
    subject: '',
    grade: '',
    coefficient: '1',
    gradeType: 'devoir',
    comment: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Get current teacher profile
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: teacherProfile } = await supabase
        .from('teacher_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!teacherProfile) throw new Error('Teacher profile not found');

      const { error } = await supabase
        .from('grades')
        .insert([{
          student_id: formData.studentId,
          teacher_id: teacherProfile.id,
          class_id: formData.classId,
          subject: formData.subject,
          grade: parseFloat(formData.grade),
          coefficient: parseFloat(formData.coefficient),
          grade_type: formData.gradeType,
          comment: formData.comment,
          date: formData.date
        }]);

      if (error) throw error;

      toast({
        title: "Note ajoutée",
        description: "La note a été enregistrée avec succès.",
      });

      setIsAdding(false);
      setFormData({
        studentId: '',
        classId: '',
        subject: '',
        grade: '',
        coefficient: '1',
        gradeType: 'devoir',
        comment: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la note.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout requiredRole="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              Gestion des Notes
            </h1>
            <p className="text-muted-foreground mt-2">
              Saisir et gérer les notes de vos élèves
            </p>
          </div>
          <Button onClick={() => setIsAdding(!isAdding)}>
            <Plus className="h-4 w-4 mr-2" />
            {isAdding ? 'Annuler' : 'Nouvelle Note'}
          </Button>
        </div>

        {isAdding && (
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une note</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentId">Élève</Label>
                    <Input
                      id="studentId"
                      placeholder="ID de l'élève"
                      value={formData.studentId}
                      onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="classId">Classe</Label>
                    <Input
                      id="classId"
                      placeholder="ID de la classe"
                      value={formData.classId}
                      onChange={(e) => setFormData({...formData, classId: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Matière</Label>
                    <Input
                      id="subject"
                      placeholder="Mathématiques, Français..."
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gradeType">Type d'évaluation</Label>
                    <Select value={formData.gradeType} onValueChange={(value) => setFormData({...formData, gradeType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="devoir">Devoir</SelectItem>
                        <SelectItem value="controle">Contrôle</SelectItem>
                        <SelectItem value="examen">Examen</SelectItem>
                        <SelectItem value="oral">Oral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="grade">Note (/20)</Label>
                    <Input
                      id="grade"
                      type="number"
                      step="0.5"
                      min="0"
                      max="20"
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="coefficient">Coefficient</Label>
                    <Input
                      id="coefficient"
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.coefficient}
                      onChange={(e) => setFormData({...formData, coefficient: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="comment">Commentaire (optionnel)</Label>
                  <Textarea
                    id="comment"
                    placeholder="Observations..."
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Enregistrer</Button>
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Notes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Les notes s'afficheront ici une fois saisies
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default TeachersGrades;