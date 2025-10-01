import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, ClipboardList, Calendar, FileText, Plus } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const TeachersSpace = () => {
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

  // Données mockup
  const classes = [
    { name: '6ème A', students: 28, subject: 'Mathématiques' },
    { name: '6ème B', students: 25, subject: 'Mathématiques' },
    { name: '5ème A', students: 30, subject: 'Mathématiques' },
  ];

  const assignments = [
    { title: 'Devoir sur les fractions', class: '6ème A', dueDate: '2025-02-10', submitted: 20, total: 28 },
    { title: 'Contrôle géométrie', class: '6ème B', dueDate: '2025-02-12', submitted: 15, total: 25 },
    { title: 'Exercices équations', class: '5ème A', dueDate: '2025-02-15', submitted: 25, total: 30 },
  ];

  const schedule = [
    { day: 'Lundi', time: '08:00-09:00', class: '6ème A', subject: 'Mathématiques' },
    { day: 'Lundi', time: '10:00-11:00', class: '6ème B', subject: 'Mathématiques' },
    { day: 'Mardi', time: '09:00-10:00', class: '5ème A', subject: 'Mathématiques' },
  ];

  return (
    <AdminLayout requiredRole="teacher">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Bonjour {profile?.full_name || 'Enseignant'}
          </h2>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace enseignant. Gérez vos classes et suivez vos élèves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
              <p className="text-xs text-muted-foreground">83 élèves au total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devoirs</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignments.length}</div>
              <p className="text-xs text-muted-foreground">En cours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">À corriger</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Copies en attente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cours cette semaine</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Heures de cours</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="classes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="classes">Mes classes</TabsTrigger>
            <TabsTrigger value="devoirs">Devoirs</TabsTrigger>
            <TabsTrigger value="emploi">Emploi du temps</TabsTrigger>
            <TabsTrigger value="ressources">Ressources</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Mes classes</h3>
                <p className="text-sm text-muted-foreground">Gérez vos classes et suivez vos élèves</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((cls, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {cls.name}
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                    <CardDescription>{cls.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Élèves:</span>
                        <span className="font-medium">{cls.students}</span>
                      </div>
                      <Button className="w-full mt-4" size="sm">
                        Voir les détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="devoirs" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Devoirs et évaluations</h3>
                <p className="text-sm text-muted-foreground">Gérez les devoirs et suivez les rendus</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau devoir
              </Button>
            </div>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription>{assignment.class}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir les rendus
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Date limite</p>
                          <p className="font-medium">{assignment.dueDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rendus</p>
                          <p className="font-medium">
                            {assignment.submitted}/{assignment.total}
                          </p>
                        </div>
                      </div>
                      <div className="w-32 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emploi" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Emploi du temps</CardTitle>
                <CardDescription>Votre emploi du temps de la semaine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedule.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-center min-w-[80px]">
                          <p className="font-medium text-sm">{slot.day}</p>
                          <p className="text-xs text-muted-foreground">{slot.time}</p>
                        </div>
                        <div>
                          <p className="font-medium">{slot.class}</p>
                          <p className="text-sm text-muted-foreground">{slot.subject}</p>
                        </div>
                      </div>
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ressources" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Ressources pédagogiques</CardTitle>
                    <CardDescription>Vos documents et supports de cours</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une ressource
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Aucune ressource pour le moment
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default TeachersSpace;
