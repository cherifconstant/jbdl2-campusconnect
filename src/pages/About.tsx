import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Users, 
  BookOpen, 
  Award,
  History,
  Target,
  Eye
} from 'lucide-react';
import Layout from '@/components/Layout';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Respect et bienveillance',
      description: 'Nous cultivons un environnement respectueux où chaque personne est valorisée pour sa singularité.'
    },
    {
      icon: BookOpen,
      title: 'Excellence pédagogique',
      description: 'Nous nous engageons à offrir un enseignement de qualité, adapté aux besoins de chaque élève.'
    },
    {
      icon: Users,
      title: 'Esprit de communauté',
      description: 'Nous favorisons la collaboration et l\'entraide au sein de notre communauté éducative.'
    },
    {
      icon: Award,
      title: 'Innovation et créativité',
      description: 'Nous encourageons l\'innovation pédagogique et la créativité pour préparer l\'avenir.'
    }
  ];

  const team = [
    {
      name: 'Mme. Marie DUPONT',
      role: 'Directrice',
      description: 'Ancienne inspectrice académique, spécialisée en pédagogie innovante'
    },
    {
      name: 'M. Pierre MARTIN',
      role: 'Directeur Adjoint',
      description: 'Expert en technologies éducatives et développement numérique'
    },
    {
      name: 'Mme. Sophie BERNARD',
      role: 'Conseillère Principale d\'Éducation',
      description: 'Accompagnement personnalisé et vie scolaire'
    },
    {
      name: 'M. Jean DURAND',
      role: 'Coordinateur Pédagogique',
      description: 'Coordination des équipes enseignantes et projets éducatifs'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">À propos de notre collège</h1>
            <p className="text-xl text-primary-foreground/90">
              Découvrez l'histoire, la mission et les valeurs qui font de notre établissement 
              un lieu d'excellence éducative depuis plus de 50 ans.
            </p>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <History className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Notre Histoire</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Fondé en 1972, le Collège Jean Baptiste de la Salle 2 s'inscrit dans la tradition 
                  éducative lasallienne, héritière de Saint Jean-Baptiste de La Salle, pionnier de 
                  l'école moderne au XVIIe siècle.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Depuis plus de 50 ans, notre établissement forme des générations d'élèves en 
                  alliant excellence académique et développement humain. Nous avons constamment 
                  évolué pour intégrer les innovations pédagogiques tout en préservant nos valeurs fondamentales.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Aujourd'hui, nous accueillons plus de 800 élèves de la 6ème à la 3ème dans un 
                  cadre moderne et bienveillant, avec un taux de réussite au Brevet National qui 
                  dépasse régulièrement les 95%.
                </p>
              </div>
              
              <Card className="shadow-elegant border-0">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">1972</div>
                      <div className="text-sm text-muted-foreground">Année de fondation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">800+</div>
                      <div className="text-sm text-muted-foreground">Élèves accueillis</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">95%</div>
                      <div className="text-sm text-muted-foreground">Taux de réussite</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">60+</div>
                      <div className="text-sm text-muted-foreground">Enseignants</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="shadow-card border-0 bg-gradient-subtle">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-2xl text-primary">Notre Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Accompagner chaque élève dans sa réussite scolaire et son épanouissement personnel, 
                    en développant ses compétences académiques, sa confiance en soi et ses valeurs citoyennes. 
                    Nous nous engageons à former des jeunes autonomes, responsables et ouverts sur le monde.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0 bg-gradient-subtle">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Eye className="h-6 w-6 text-primary mr-3" />
                    <CardTitle className="text-2xl text-primary">Notre Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Être un établissement de référence qui allie tradition et innovation, où chaque élève 
                    peut révéler son potentiel dans un environnement bienveillant et stimulant. 
                    Nous aspirons à former les citoyens éclairés et engagés de demain.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Nos Valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les principes fondamentaux qui guident notre action éducative au quotidien
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="shadow-card border-0 hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                        <value.icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Équipe de direction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Équipe de Direction</h2>
              <p className="text-muted-foreground">
                Une équipe expérimentée et dévouée à la réussite de nos élèves
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="shadow-card border-0 text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-accent font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;