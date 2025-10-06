import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  start_date: string;
  end_date: string;
  location: string;
  event_category: string;
}

interface Registration {
  event_id: string;
  status: string;
}

export default function EnhancedCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [studentName, setStudentName] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, [currentDate]);

  const fetchEvents = async () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', startOfMonth.toISOString())
      .lte('start_date', endOfMonth.toISOString())
      .order('start_date');

    if (error) {
      console.error('Error fetching events:', error);
      return;
    }

    setEvents(data || []);
  };

  const fetchRegistrations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('event_registrations')
      .select('event_id, status')
      .eq('user_id', user.id);

    setRegistrations(data || []);
  };

  const handleRegister = async () => {
    if (!selectedEvent || !studentName.trim()) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Vous devez être connecté');
        return;
      }

      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: selectedEvent.id,
          user_id: user.id,
          student_name: studentName,
          notes: notes || null,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Inscription enregistrée avec succès !');
      setSelectedEvent(null);
      setStudentName('');
      setNotes('');
      fetchRegistrations();
    } catch (error: any) {
      console.error('Error registering:', error);
      if (error.code === '23505') {
        toast.error('Vous êtes déjà inscrit à cet événement');
      } else {
        toast.error('Erreur lors de l\'inscription');
      }
    } finally {
      setLoading(false);
    }
  };

  const isRegistered = (eventId: string) => {
    return registrations.some(r => r.event_id === eventId);
  };

  const getRegistrationStatus = (eventId: string) => {
    return registrations.find(r => r.event_id === eventId)?.status;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDay = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return events.filter(event => event.start_date.startsWith(dateStr));
  };

  const days = getDaysInMonth();
  const monthName = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  const eventTypeColors: Record<string, string> = {
    exam: 'bg-red-100 text-red-800 border-red-200',
    activity: 'bg-blue-100 text-blue-800 border-blue-200',
    meeting: 'bg-green-100 text-green-800 border-green-200',
    holiday: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CalendarIcon className="h-8 w-8" />
              Calendrier & Événements
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold capitalize min-w-[200px] text-center">
                {monthName}
              </span>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-2">
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                  <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => {
                  const dayEvents = day ? getEventsForDay(day) : [];
                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border rounded-lg ${
                        day ? 'bg-background hover:bg-muted/50' : 'bg-muted/20'
                      }`}
                    >
                      {day && (
                        <>
                          <div className="font-semibold text-sm mb-1">{day}</div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <Dialog key={event.id}>
                                <DialogTrigger asChild>
                                  <button
                                    onClick={() => setSelectedEvent(event)}
                                    className={`w-full text-left text-xs p-1 rounded border ${
                                      eventTypeColors[event.event_type] || 'bg-gray-100'
                                    }`}
                                  >
                                    <div className="font-medium truncate">{event.title}</div>
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>{event.title}</DialogTitle>
                                    <DialogDescription>{event.description}</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Clock className="h-4 w-4" />
                                      <span>
                                        {new Date(event.start_date).toLocaleDateString('fr-FR', {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </span>
                                    </div>
                                    {event.location && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4" />
                                        <span>{event.location}</span>
                                      </div>
                                    )}
                                    <Badge>{event.event_type}</Badge>
                                    
                                    {isRegistered(event.id) ? (
                                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <p className="text-sm font-medium text-green-800">
                                          ✓ Vous êtes inscrit à cet événement
                                        </p>
                                        <p className="text-xs text-green-600 mt-1">
                                          Statut: {getRegistrationStatus(event.id) === 'confirmed' ? 'Confirmé' : 'En attente'}
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="space-y-4 pt-4 border-t">
                                        <div className="flex items-center gap-2">
                                          <Users className="h-4 w-4" />
                                          <span className="font-medium">S'inscrire à cet événement</span>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="studentName">Nom de l'élève *</Label>
                                          <Input
                                            id="studentName"
                                            value={studentName}
                                            onChange={(e) => setStudentName(e.target.value)}
                                            placeholder="Prénom et nom"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="notes">Notes (optionnel)</Label>
                                          <Input
                                            id="notes"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Informations complémentaires"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  {!isRegistered(event.id) && (
                                    <DialogFooter>
                                      <Button onClick={handleRegister} disabled={loading}>
                                        {loading ? 'Inscription...' : 'Confirmer l\'inscription'}
                                      </Button>
                                    </DialogFooter>
                                  )}
                                </DialogContent>
                              </Dialog>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-muted-foreground text-center">
                                +{dayEvents.length - 2} plus
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 5).map(event => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(event.start_date).toLocaleDateString('fr-FR')}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                    {isRegistered(event.id) && (
                      <Badge variant="secondary">Inscrit</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
