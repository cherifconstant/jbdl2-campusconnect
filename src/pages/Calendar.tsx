import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CalendarIcon className="h-8 w-8" />
              Calendrier & Événements
            </h1>
            <p className="text-muted-foreground mt-2">
              Consultez les événements, examens et activités du collège
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Le calendrier complet sera disponible prochainement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;