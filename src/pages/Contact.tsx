import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Bus,
  Car,
  Train
} from 'lucide-react';
import Layout from '@/components/Layout';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: '123 Avenue de l\'Éducation\n75001 Paris, France',
      color: 'text-primary'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '01 23 45 67 89\nFax: 01 23 45 67 90',
      color: 'text-accent'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@collegelasalle2.fr\nadmissions@collegelasalle2.fr',
      color: 'text-primary'
    },
    {
      icon: Clock,
      title: 'Horaires d\'ouverture',
      content: 'Lun - Ven: 7h30 - 18h00\nSam: 8h00 - 12h00',
      color: 'text-accent'
    }
  ];

  const transportInfo = [
    {
      icon: Bus,
      title: 'Bus',
      lines: ['Lignes 21, 27, 39', 'Arrêt: République']
    },
    {
      icon: Train,
      title: 'Métro',
      lines: ['Ligne 3, 5, 8, 9, 11', 'Station: République']
    },
    {
      icon: Car,
      title: 'Voiture',
      lines: ['Parking public à 200m', 'Dépose-minute devant l\'école']
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-xl text-primary-foreground/90">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="shadow-card border-0 text-center hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className={`h-8 w-8 ${info.color}`} />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line text-sm">
                    {info.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Envoyez-nous un message</CardTitle>
                <p className="text-muted-foreground">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input 
                      id="name" 
                      placeholder="Jean Dupont" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="jean@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+33 6 12 34 56 78" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input 
                      id="subject" 
                      placeholder="Inscription, Renseignements..." 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Votre message..." 
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    * Champs obligatoires. Vos données personnelles sont protégées et ne seront utilisées que pour traiter votre demande.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Map & Transport */}
            <div className="space-y-8">
              {/* Map */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Localisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-4" />
                      <p>Carte interactive</p>
                      <p className="text-sm">123 Avenue de l'Éducation, 75001 Paris</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transport */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Comment nous rejoindre</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {transportInfo.map((transport, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <transport.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-primary mb-1">{transport.title}</h4>
                          {transport.lines.map((line, lineIndex) => (
                            <p key={lineIndex} className="text-sm text-muted-foreground">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Une question sur les admissions ?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Notre équipe pédagogique vous accompagne dans vos démarches d'inscription et répond à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Prendre rendez-vous
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Mail className="mr-2 h-4 w-4" />
                Email direct
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
