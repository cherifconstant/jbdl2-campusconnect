import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, MessageSquare, DollarSign, Bell } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const ParentsSpace = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }
  };

  // Données mockup pour démonstration
  const grades = [
    { subject: 'Mathématiques', grade: '15/20', date: '2025-01-15', teacher: 'M. Dupont' },
    { subject: 'Français', grade: '17/20', date: '2025-01-14', teacher: 'Mme Martin' },
    { subject: 'Histoire-Géo', grade: '14/20', date: '2025-01-13', teacher: 'M. Bernard' },
  ];

  const absences = [
    { date: '2025-01-10', reason: 'Maladie', justified: true },
    { date: '2025-01-05', reason: 'Rendez-vous médical', justified: true },
  ];

  const announcements = [
    { title: 'Réunion parents-professeurs', date: '2025-02-15', type: 'important' },
    { title: 'Sortie scolaire au musée', date: '2025-02-20', type: 'info' },
  ];

  return (
    <AdminLayout requiredRole="parent">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Bonjour {profile?.full_name || 'Parent'}
          </h2>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace parent. Suivez la scolarité de votre enfant en temps réel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.3/20</div>
              <p className="text-xs text-muted-foreground">+0.5 ce trimestre</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absences</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{absences.length}</div>
              <p className="text-xs text-muted-foreground">Toutes justifiées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Non lus</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paiements</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">À jour</div>
              <p className="text-xs text-muted-foreground">Prochain: 01/02/2025</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="absences">Absences</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="annonces">Annonces</TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dernières notes</CardTitle>
                <CardDescription>Notes récentes de votre enfant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {grades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{grade.subject}</p>
                        <p className="text-sm text-muted-foreground">{grade.teacher}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{grade.grade}</p>
                        <p className="text-xs text-muted-foreground">{grade.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="absences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Absences et retards</CardTitle>
                <CardDescription>Historique des absences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {absences.map((absence, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{absence.date}</p>
                        <p className="text-sm text-muted-foreground">{absence.reason}</p>
                      </div>
                      <Badge variant={absence.justified ? "default" : "destructive"}>
                        {absence.justified ? 'Justifiée' : 'Non justifiée'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Messagerie</CardTitle>
                <CardDescription>Communication avec les enseignants</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Aucun message pour le moment
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="annonces" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Annonces</CardTitle>
                <CardDescription>Informations importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <Bell className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{announcement.title}</p>
                          <Badge variant={announcement.type === 'important' ? 'destructive' : 'default'}>
                            {announcement.type === 'important' ? 'Important' : 'Info'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{announcement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ParentsSpace;
