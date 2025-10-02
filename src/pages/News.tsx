import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  published_at: string | null;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredNews = news[0];

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
      {loading ? (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          </div>
        </section>
      ) : featuredNews ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="shadow-elegant border-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredNews.image_url || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop'} 
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      À la une
                    </Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(featuredNews.published_at || featuredNews.created_at).toLocaleDateString('fr-FR')}
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-4">{featuredNews.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{featuredNews.excerpt}</p>
                  <Link to={`/news/${featuredNews.slug}`}>
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
      ) : null}

      {/* News Grid */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Toutes nos actualités</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.slice(1).map((article) => (
                <Card key={article.id} className="shadow-card border-0 hover:shadow-elegant transition-shadow cursor-pointer group">
                  {article.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR')}
                    </div>
                    
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex justify-end">
                      <Link to={`/news/${article.slug}`}>
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
          ) : (
            <p className="text-center text-muted-foreground py-8">Aucune actualité disponible</p>
          )}
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