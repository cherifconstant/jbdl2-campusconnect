import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const PortesOuvertes = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/news" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux actualités
            </Link>
            
            <article>
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop" 
                  alt="Journée Portes Ouvertes"
                  className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-elegant"
                />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-primary text-primary-foreground">
                  Événement
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  10 Mars 2024
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  5 min de lecture
                </div>
              </div>

              <h1 className="text-4xl font-bold text-primary mb-6">
                Journée Portes Ouvertes - 15 Mars 2024
              </h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Venez découvrir notre établissement, rencontrer l'équipe pédagogique et visiter nos installations modernes. Une occasion unique de découvrir notre projet éducatif.
                </p>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Programme de la journée</h2>
                <ul className="space-y-2 mb-6">
                  <li><strong>9h00 - 10h00 :</strong> Accueil et présentation générale du collège</li>
                  <li><strong>10h00 - 11h30 :</strong> Visite guidée des installations</li>
                  <li><strong>11h30 - 12h00 :</strong> Rencontre avec l'équipe pédagogique</li>
                  <li><strong>14h00 - 15h30 :</strong> Présentation des options et projets pédagogiques</li>
                  <li><strong>15h30 - 16h30 :</strong> Questions-réponses avec la direction</li>
                </ul>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Nos atouts</h2>
                <p>
                  Le Collège Jean Baptiste de la Salle 2 vous accueille dans un cadre moderne et bienveillant. 
                  Nos équipes pédagogiques expérimentées accompagnent chaque élève dans sa réussite scolaire 
                  et son épanouissement personnel.
                </p>

                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Nos installations</h3>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  <li>Salles de classe équipées de tableaux interactifs</li>
                  <li>Laboratoires de sciences modernes</li>
                  <li>CDI avec espace numérique</li>
                  <li>Salle informatique avec 30 postes</li>
                  <li>Gymnase et terrain de sport</li>
                  <li>Cantine avec cuisine sur place</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Projet pédagogique</h3>
                <p>
                  Notre projet éducatif s'articule autour de trois axes principaux : l'excellence académique, 
                  l'ouverture culturelle et l'accompagnement personnalisé. Nous proposons également de nombreuses 
                  activités extrascolaires pour développer les talents de chacun.
                </p>

                <div className="bg-secondary p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-semibold text-primary mb-3">Informations pratiques</h3>
                  <p><strong>Date :</strong> Samedi 15 mars 2024</p>
                  <p><strong>Horaires :</strong> 9h00 - 16h30</p>
                  <p><strong>Adresse :</strong> 123 Rue de l'Éducation, 75000 Paris</p>
                  <p><strong>Contact :</strong> 01 23 45 67 89</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Inscription conseillée par téléphone ou via notre formulaire de contact.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link to="/news">
                    <Button variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour aux actualités
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button>
                      Nous contacter
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortesOuvertes;