import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Homework = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Devoirs & Documents
            </h1>
            <p className="text-muted-foreground mt-2">
              Accédez aux devoirs et documents pédagogiques
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Devoirs à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Les devoirs s'afficheront ici
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Homework;