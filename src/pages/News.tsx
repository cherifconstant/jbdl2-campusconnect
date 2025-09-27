import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Users, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const News = () => {
  const featuredNews = {
    title: 'Journée Portes Ouvertes - 15 Mars 2024',
    date: '10 Mars 2024',
    category: 'Événement',
    excerpt: 'Venez découvrir notre établissement, rencontrer l\'équipe pédagogique et visiter nos installations modernes. Une occasion unique de découvrir notre projet éducatif.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    featured: true
  };

  const newsArticles = [
    {
      title: 'Félicitations aux élèves lauréats du concours de mathématiques',
      date: '8 Mars 2024',
      category: 'Actualité',
      excerpt: 'Nos élèves de 3ème se sont distingués au concours Kangourou des mathématiques avec 3 prix départementaux.',
      readTime: '3 min',
      icon: Award,
      link: '/news/concours-matematiques'
    },
    {
      title: 'Nouvelle option théâtre dès la rentrée 2024',
      date: '5 Mars 2024',
      category: 'Pédagogie',
      excerpt: 'L\'établissement propose une nouvelle option théâtre pour développer la créativité et l\'expression orale des élèves.',
      readTime: '2 min',
      icon: BookOpen,
      link: '/news/option-theatre'
    },
    {
      title: 'Séjour linguistique en Angleterre - Inscriptions ouvertes',
      date: '1 Mars 2024',
      category: 'Voyage',
      excerpt: 'Les inscriptions pour le séjour linguistique en Angleterre sont ouvertes pour les élèves de 4ème et 3ème.',
      readTime: '4 min',
      icon: Users,
      link: '#'
    },
    {
      title: 'Remise des diplômes du Brevet 2023',
      date: '25 Février 2024',
      category: 'Événement',
      excerpt: 'Cérémonie de remise des diplômes du Brevet National des Collèges promotion 2023.',
      readTime: '2 min',
      icon: Award,
      link: '#'
    },
    {
      title: 'Projet environnemental : Création d\'un jardin pédagogique',
      date: '20 Février 2024',
      category: 'Projet',
      excerpt: 'Les élèves de 6ème participent à la création d\'un jardin pédagogique dans la cour de récréation.',
      readTime: '5 min',
      icon: BookOpen,
      link: '#'
    },
    {
      title: 'Conférence sur l\'orientation en classe de 3ème',
      date: '15 Février 2024',
      category: 'Orientation',
      excerpt: 'Soirée d\'information destinée aux parents et élèves de 3ème sur les choix d\'orientation post-collège.',
      readTime: '3 min',
      icon: Users,
      link: '#'
    }
  ];

  const categories = ['Tous', 'Événement', 'Actualité', 'Pédagogie', 'Voyage', 'Projet', 'Orientation'];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Événement': 'bg-primary text-primary-foreground',
      'Actualité': 'bg-accent text-accent-foreground',
      'Pédagogie': 'bg-secondary text-secondary-foreground',
      'Voyage': 'bg-muted text-muted-foreground',
      'Projet': 'bg-primary/10 text-primary',
      'Orientation': 'bg-accent/10 text-accent'
    };
    return colors[category] || 'bg-secondary text-secondary-foreground';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Actualités & Événements</h1>
            <p className="text-xl text-primary-foreground/90">
              Suivez la vie de notre établissement et ne manquez aucun événement important
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="shadow-elegant border-0 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(featuredNews.category)}>
                    {featuredNews.category}
                  </Badge>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {featuredNews.date}
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">{featuredNews.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredNews.excerpt}</p>
                <Link to="/news/portes-ouvertes">
                  <Button className="group">
                    Lire la suite
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Toutes nos actualités</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <Card key={index} className="shadow-card border-0 hover:shadow-elegant transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(article.category)} variant="secondary">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {article.date}
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <article.icon className="h-5 w-5 text-accent" />
                    </div>
                    <Link to={article.link || '#'}>
                      <Button variant="ghost" size="sm" className="group">
                        Lire
                        <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus d'actualités
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="text-primary-foreground/90 mb-8">
              Abonnez-vous à notre newsletter pour recevoir les dernières actualités directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-md text-primary bg-primary-foreground placeholder:text-muted-foreground"
              />
              <Button variant="secondary">
                S'abonner
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;