import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  Award, 
  BookOpen, 
  Calendar,
  User,
  Shield,
  ArrowRight,
  Star,
  Camera,
  Loader2
} from 'lucide-react';
import heroImage from '@/assets/hero-college.jpg';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  is_main_image: boolean;
  display_order: number;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const Home = () => {
  const [carouselImages, setCarouselImages] = useState<GalleryImage[]>([]);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
    fetchRecentNews();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_main_image', true)
        .order('display_order', { ascending: true })
        .limit(6);

      if (error) throw error;
      setCarouselImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoadingGallery(false);
    }
  };

  const fetchRecentNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('id, title, excerpt, slug, image_url, published_at, created_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRecentNews(data || []);
    } catch (error) {
      console.error('Error fetching recent news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

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

      {/* Photo Carousel Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Camera className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-primary">Notre établissement en images</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos installations modernes et l'atmosphère bienveillante qui caractérise notre collège
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {loadingGallery ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : carouselImages.length > 0 ? (
              <Carousel 
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 4000,
                    stopOnInteraction: true,
                  }),
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {carouselImages.map((image) => (
                    <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                        <div className="relative overflow-hidden">
                          <img
                            src={image.image_url}
                            alt={image.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 text-primary group-hover:text-accent transition-colors">
                            {image.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {image.description}
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            ) : (
              <div className="text-center py-12">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Les images seront bientôt disponibles.</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild className="group">
              <Link to="/gallery">
                Voir toute la galerie
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
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
          
          {loadingNews ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recentNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentNews.map((news) => (
                <Link key={news.id} to={`/news/${news.slug}`}>
                  <Card className="shadow-card border-0 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    {news.image_url && (
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={news.image_url}
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          Actualité
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(news.published_at || news.created_at)}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight line-clamp-2">{news.title}</CardTitle>
                      {news.excerpt && (
                        <CardDescription className="line-clamp-2 mt-2">
                          {news.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                Aucune actualité disponible
              </h3>
              <p className="text-muted-foreground">
                Les actualités seront bientôt ajoutées.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;