import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Info, AlertTriangle, Megaphone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string;
  target_audience: string;
  created_at: string;
}

const priorityConfig: Record<string, { icon: any; color: string; label: string }> = {
  urgent: { icon: AlertCircle, color: 'destructive', label: 'Urgent' },
  high: { icon: AlertTriangle, color: 'default', label: 'Important' },
  normal: { icon: Info, color: 'secondary', label: 'Info' },
  low: { icon: Megaphone, color: 'outline', label: 'Info' }
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Annonces Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" />
          Annonces Importantes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement) => {
          const config = priorityConfig[announcement.priority];
          const Icon = config.icon;
          
          return (
            <Alert key={announcement.id} variant={config.color as any}>
              <Icon className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-2">
                {announcement.title}
                <Badge variant={config.color as any} className="text-xs">
                  {config.label}
                </Badge>
              </AlertTitle>
              <AlertDescription className="mt-2">
                {announcement.content}
              </AlertDescription>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(announcement.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </Alert>
          );
        })}
      </CardContent>
    </Card>
  );
}
