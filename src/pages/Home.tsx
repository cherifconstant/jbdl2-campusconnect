import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Award, 
  BookOpen, 
  Calendar,
  User,
  Shield,
  ArrowRight,
  Star
} from 'lucide-react';
import heroImage from '@/assets/hero-college.jpg';
import Layout from '@/components/Layout';

const Home = () => {
  const quickAccess = [
    {
      title: 'Espace Élèves',
      description: 'Emploi du temps, cours et devoirs',
      icon: GraduationCap,
      href: '/students',
      color: 'bg-primary',
    },
    {
      title: 'Espace Parents',
      description: 'Suivi scolaire et communication',
      icon: Users,
      href: '/parents',
      color: 'bg-accent',
    },
    {
      title: 'Espace Enseignants',
      description: 'Gestion pédagogique',
      icon: User,
      href: '/teachers',
      color: 'bg-primary',
    },
    {
      title: 'Administration',
      description: 'Gestion de l\'établissement',
      icon: Shield,
      href: '/admin',
      color: 'bg-muted-foreground',
    },
  ];

  const highlights = [
    {
      title: 'Excellence académique',
      description: '95% de réussite au Brevet',
      icon: Award,
    },
    {
      title: 'Pédagogie innovante',
      description: 'Classes numériques et projets collaboratifs',
      icon: BookOpen,
    },
    {
      title: 'Accompagnement personnalisé',
      description: 'Suivi individuel de chaque élève',
      icon: Star,
    },
  ];

  const recentNews = [
    {
      title: 'Journée Portes Ouvertes - 15 Mars 2024',
      date: '10 Mars 2024',
      category: 'Événement',
    },
    {
      title: 'Félicitations aux élèves lauréats du concours de mathématiques',
      date: '8 Mars 2024',
      category: 'Actualité',
    },
    {
      title: 'Nouvelle option théâtre dès la rentrée 2024',
      date: '5 Mars 2024',
      category: 'Pédagogie',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Campus du collège" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Collège Jean Baptiste
              <span className="block text-accent">de la Salle 2</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90 animate-slide-up">
              Excellence académique, valeurs humaines et innovation pédagogique 
              au service de la réussite de chaque élève.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Button size="lg" variant="secondary" asChild className="group">
                <Link to="/about">
                  Découvrir notre projet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Espaces personnalisés</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Accédez rapidement à votre espace dédié pour une expérience personnalisée
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccess.map((space, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-0 shadow-card">
                <Link to={space.href}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full ${space.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <space.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{space.title}</CardTitle>
                    <CardDescription>{space.description}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Nos atouts</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <highlight.icon className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Dernières actualités</h2>
              <p className="text-muted-foreground">Restez informé de la vie de notre établissement</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/news">
                Voir toutes les actualités
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNews.map((news, index) => (
              <Card key={index} className="shadow-card border-0 hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {news.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {news.date}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;