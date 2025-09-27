import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, BookOpen, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const OptionTheatre = () => {
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
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop" 
                  alt="Théâtre au collège"
                  className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-elegant"
                />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-secondary text-secondary-foreground">
                  Pédagogie
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  5 Mars 2024
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  2 min de lecture
                </div>
              </div>

              <h1 className="text-4xl font-bold text-primary mb-6">
                Nouvelle option théâtre dès la rentrée 2024
              </h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  L'établissement propose une nouvelle option théâtre pour développer la créativité et l'expression orale des élèves.
                </p>

                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg mb-8 border border-primary/20">
                  <div className="flex items-center mb-3">
                    <Star className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-xl font-bold text-primary">Une nouvelle aventure créative</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Dès septembre 2024, les élèves de 4ème et 3ème pourront choisir l'option théâtre, 
                    une opportunité unique de développer leur expression artistique et leur confiance en soi.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Objectifs pédagogiques</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-l-4 border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Expression orale
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Développer l'art de la prise de parole en public, 
                        améliorer la diction et l'articulation.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-secondary">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Users className="h-5 w-5 mr-2 text-secondary" />
                        Travail d'équipe
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Apprendre à collaborer, à écouter les autres 
                        et à construire ensemble un projet artistique.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-accent">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Star className="h-5 w-5 mr-2 text-accent" />
                        Créativité
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Stimuler l'imagination, développer la créativité 
                        et l'expression personnelle.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-muted">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
                        Culture générale
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Découvrir les grands textes du théâtre classique 
                        et contemporain, enrichir sa culture littéraire.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Programme de l'option</h2>
                
                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Horaires et organisation</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li><strong>2 heures par semaine</strong> en groupe réduit (maximum 15 élèves)</li>
                  <li><strong>Créneaux :</strong> Mardi 16h-18h ou Jeudi 16h-18h</li>
                  <li><strong>Lieu :</strong> Salle polyvalente aménagée en espace théâtral</li>
                  <li><strong>Durée :</strong> Engagement sur l'année scolaire complète</li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Activités prévues</h3>
                <div className="bg-secondary/50 p-6 rounded-lg mb-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Exercices de diction et d'expression corporelle</strong> : échauffements vocaux, travail du souffle, posture</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Étude de textes classiques et contemporains</strong> : Molière, Corneille, auteurs contemporains</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Improvisation et jeux théâtraux</strong> : développement de la spontanéité et de la créativité</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Mise en scène collective</strong> : création d'un spectacle de fin d'année</span>
                    </li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Encadrement</h2>
                <div className="bg-primary/5 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-primary mb-3">Mme Sophie Durand</h3>
                  <p className="text-muted-foreground mb-3">
                    Professeure de français et de théâtre, diplômée du Conservatoire National Supérieur d'Art Dramatique. 
                    15 ans d'expérience dans l'enseignement artistique.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    "Le théâtre permet aux jeunes de gagner en confiance, de développer leur expressivité et 
                    de découvrir les richesses de notre patrimoine littéraire de manière vivante et ludique."
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Inscriptions</h2>
                <div className="bg-accent/10 p-6 rounded-lg border border-accent/30">
                  <h3 className="text-lg font-semibold text-primary mb-3">Modalités pratiques</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Ouvert aux élèves :</strong> 4ème et 3ème</li>
                    <li><strong>Effectif maximum :</strong> 15 élèves par groupe</li>
                    <li><strong>Période d'inscription :</strong> du 15 mai au 15 juin 2024</li>
                    <li><strong>Coût :</strong> 50€ par trimestre (matériel et sorties inclus)</li>
                    <li><strong>Contact :</strong> Vie scolaire - 01 23 45 67 89</li>
                  </ul>
                  <p className="mt-4 text-sm text-primary font-medium">
                    Une réunion d'information aura lieu le jeudi 25 avril à 18h30 en salle polyvalente.
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
                      S'inscrire / Nous contacter
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

export default OptionTheatre;