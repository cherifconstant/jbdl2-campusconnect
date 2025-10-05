import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const Schedule = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Clock className="h-8 w-8" />
              Emploi du Temps
            </h1>
            <p className="text-muted-foreground mt-2">
              Consultez votre emploi du temps hebdomadaire
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Emploi du temps de la semaine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                L'emploi du temps sera disponible prochainement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;