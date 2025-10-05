import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const Messaging = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageSquare className="h-8 w-8" />
              Messagerie
            </h1>
            <p className="text-muted-foreground mt-2">
              Communication entre parents et enseignants
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                La messagerie sera disponible prochainement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messaging;