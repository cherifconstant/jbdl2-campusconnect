import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

interface ClassItem {
  id: string;
  name: string;
  level: string;
  description: string | null;
}

export default function TeacherSignup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    subject: "",
    qualification: "",
    bio: "",
    selectedClasses: [] as string[],
  });

  useEffect(() => {
    checkUser();
    fetchClasses();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate("/");
    }
  };

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("level", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les classes",
        variant: "destructive",
      });
    } finally {
      setLoadingClasses(false);
    }
  };

  const handleClassToggle = (classId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedClasses: prev.selectedClasses.includes(classId)
        ? prev.selectedClasses.filter(id => id !== classId)
        : [...prev.selectedClasses, classId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!formData.fullName || !formData.subject) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Aucun utilisateur créé");

      const userId = authData.user.id;

      // 2. Create teacher profile
      const { data: teacherProfile, error: profileError } = await supabase
        .from("teacher_profiles")
        .insert({
          user_id: userId,
          full_name: formData.fullName,
          phone: formData.phone,
          subject: formData.subject,
          qualification: formData.qualification,
          bio: formData.bio,
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // 3. Assign teacher role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: userId,
          role: "teacher",
        });

      if (roleError) throw roleError;

      // 4. Associate classes
      if (formData.selectedClasses.length > 0) {
        const classAssignments = formData.selectedClasses.map(classId => ({
          teacher_id: teacherProfile.id,
          class_id: classId,
        }));

        const { error: classError } = await supabase
          .from("teacher_classes")
          .insert(classAssignments);

        if (classError) throw classError;
      }

      toast({
        title: "Inscription réussie !",
        description: "Votre compte enseignant a été créé avec succès. Veuillez vérifier votre email.",
      });

      navigate("/teachers/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur s'est produite lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Link to="/teachers/login">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl">Inscription Enseignant</CardTitle>
          </div>
          <CardDescription>
            Remplissez le formulaire pour créer votre compte enseignant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de connexion */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations de connexion</h3>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Informations personnelles</h3>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet *</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Informations professionnelles */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Informations professionnelles</h3>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Matière enseignée *</Label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Ex: Mathématiques, Français, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualifications</Label>
                <Input
                  id="qualification"
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="Ex: Licence en Mathématiques, Master en Lettres, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biographie / Présentation</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Parlez un peu de vous, votre expérience, vos méthodes d'enseignement..."
                  rows={4}
                />
              </div>
            </div>

            {/* Sélection des classes */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Classes à gérer</h3>
              {loadingClasses ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`class-${classItem.id}`}
                        checked={formData.selectedClasses.includes(classItem.id)}
                        onCheckedChange={() => handleClassToggle(classItem.id)}
                      />
                      <Label
                        htmlFor={`class-${classItem.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {classItem.name}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}