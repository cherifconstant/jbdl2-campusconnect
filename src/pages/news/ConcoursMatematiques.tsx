import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const ConcoursMatematiques = () => {
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
                  src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&h=400&fit=crop" 
                  alt="Concours de mathématiques"
                  className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-elegant"
                />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-accent text-accent-foreground">
                  Actualité
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  8 Mars 2024
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  3 min de lecture
                </div>
              </div>

              <h1 className="text-4xl font-bold text-primary mb-6">
                Félicitations aux élèves lauréats du concours de mathématiques
              </h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Nos élèves de 3ème se sont distingués au concours Kangourou des mathématiques avec 3 prix départementaux.
                </p>

                <div className="bg-primary/5 p-6 rounded-lg mb-8 border-l-4 border-primary">
                  <div className="flex items-center mb-3">
                    <Award className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-xl font-bold text-primary">Résultats exceptionnels</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Cette année encore, nos élèves ont brillé par leurs performances au concours Kangourou des mathématiques,
                    confirmant la qualité de notre enseignement scientifique.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Les lauréats</h2>
                
                <div className="grid gap-4 mb-8">
                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-primary">1er Prix Départemental</h3>
                          <p className="text-muted-foreground">Marie Dupont - 3ème A</p>
                        </div>
                        <Award className="h-8 w-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-secondary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-primary">2ème Prix Départemental</h3>
                          <p className="text-muted-foreground">Pierre Martin - 3ème B</p>
                        </div>
                        <Award className="h-8 w-8 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-accent">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-primary">3ème Prix Départemental</h3>
                          <p className="text-muted-foreground">Sarah Leblanc - 3ème A</p>
                        </div>
                        <Award className="h-8 w-8 text-amber-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Le concours Kangourou</h2>
                <p>
                  Le concours Kangourou des mathématiques est un concours de mathématiques ouvert aux élèves 
                  du CE2 à la terminale. Il a lieu tous les ans au mois de mars. C'est un jeu de mathématiques 
                  créé sur le modèle du concours national australien (d'où son nom).
                </p>

                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Participation record</h3>
                <p>
                  Cette année, 45 élèves de notre établissement ont participé au concours, soit une augmentation 
                  de 20% par rapport à l'année dernière. Cette forte participation témoigne de l'intérêt croissant 
                  de nos élèves pour les mathématiques.
                </p>

                <div className="bg-secondary p-6 rounded-lg mt-8">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold text-primary">Encadrement pédagogique</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Nos professeurs de mathématiques, Mme Rousseau et M. Bertrand, ont préparé nos élèves 
                    avec des séances d'entraînement spécifiques. Leur investissement et leur pédagogie 
                    contribuent grandement à ces excellents résultats.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Prochaines échéances</h2>
                <p>
                  Fort de ces résultats encourageants, nous préparons déjà nos élèves aux prochains concours :
                </p>
                <ul className="list-disc list-inside space-y-1 mt-4">
                  <li>Olympiades de mathématiques (avril 2024)</li>
                  <li>Concours Drôles de Maths (mai 2024)</li>
                  <li>Rallye mathématique de l'IREM (juin 2024)</li>
                </ul>
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

export default ConcoursMatematiques;