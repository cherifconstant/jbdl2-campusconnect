import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Users, GraduationCap, User, Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

interface PrivateSpaceProps {
  type: 'students' | 'parents' | 'teachers' | 'admin';
}

const PrivateSpace = ({ type }: PrivateSpaceProps) => {
  const spaceConfig = {
    students: {
      title: 'Espace Élèves',
      icon: GraduationCap,
      description: 'Accédez à votre emploi du temps, vos cours et vos devoirs',
      features: [
        'Emploi du temps personnalisé',
        'Cours et documents téléchargeables',
        'Devoirs et révisions en ligne',
        'Résultats scolaires et bulletins',
        'Messagerie avec les professeurs'
      ]
    },
    parents: {
      title: 'Espace Parents',
      icon: Users,
      description: 'Suivez la scolarité de votre enfant en temps réel',
      features: [
        'Suivi des notes et bulletins',
        'Gestion des absences',
        'Communication avec les enseignants',
        'Paiement en ligne des frais',
        'Annonces spécifiques aux parents'
      ]
    },
    teachers: {
      title: 'Espace Enseignants',
      icon: User,
      description: 'Gérez vos classes et communiquez avec vos élèves',
      features: [
        'Gestion des cours et supports',
        'Dépôt de devoirs et corrigés',
        'Saisie des notes et appréciations',
        'Suivi des absences',
        'Communication avec les parents'
      ]
    },
    admin: {
      title: 'Espace Administration',
      icon: Shield,
      description: 'Outils de gestion administrative de l\'établissement',
      features: [
        'Gestion des élèves et dossiers',
        'Gestion du personnel enseignant',
        'Comptabilité et paiements',
        'Génération de bulletins',
        'Statistiques et rapports'
      ]
    }
  };

  const config = spaceConfig[type];
  const IconComponent = config.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <IconComponent className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{config.title}</h1>
            <p className="text-xl text-primary-foreground/90">
              {config.description}
            </p>
          </div>
        </div>
      </section>

      {/* Authentication Required */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Alert className="mb-8 border-accent bg-accent-light/10">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-base">
                <strong>Fonctionnalité en développement :</strong> Les espaces privés nécessitent une authentification sécurisée 
                et une base de données pour gérer les différents rôles utilisateurs. Cette fonctionnalité sera disponible 
                après l'intégration de Supabase.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Login Form */}
              <Card className="shadow-elegant border-0">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl text-primary">Connexion requise</CardTitle>
                  <p className="text-muted-foreground">
                    Veuillez vous connecter pour accéder à votre espace personnel
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block">
                        Identifiant
                      </label>
                      <input 
                        type="text" 
                        placeholder="Votre identifiant"
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary mb-2 block">
                        Mot de passe
                      </label>
                      <input 
                        type="password" 
                        placeholder="Votre mot de passe"
                        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg" disabled>
                    Se connecter
                  </Button>
                  
                  <div className="text-center space-y-2">
                    <a href="#" className="text-sm text-accent hover:underline">
                      Mot de passe oublié ?
                    </a>
                    <p className="text-xs text-muted-foreground">
                      En cas de problème, contactez l'administration
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Features Preview */}
              <Card className="shadow-card border-0 bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Fonctionnalités disponibles</CardTitle>
                  <p className="text-muted-foreground">
                    Une fois connecté, vous aurez accès à :
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {config.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h4 className="font-medium text-primary mb-2">Première connexion ?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Vos identifiants vous ont été communiqués par l'établissement. 
                      En cas de problème, contactez le secrétariat.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/contact">Contacter l'administration</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Sécurité et confidentialité</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nous mettons tout en œuvre pour protéger vos données personnelles et garantir 
              la sécurité de nos plateformes numériques. Toutes les communications sont chiffrées 
              et l'accès aux données est strictement contrôlé selon votre profil utilisateur.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                'Connexion sécurisée SSL',
                'Données chiffrées',
                'Accès contrôlé par rôle'
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivateSpace;