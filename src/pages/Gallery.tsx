import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Calendar, MapPin } from 'lucide-react';
import salleClasse1 from '@/assets/gallery/salle-classe-1.jpg';
import salleClasse2 from '@/assets/gallery/salle-classe-2.jpg';
import laboratoire from '@/assets/gallery/laboratoire.jpg';
import bibliotheque from '@/assets/gallery/bibliotheque.jpg';
import cour from '@/assets/gallery/cour.jpg';
import evenement1 from '@/assets/gallery/evenement-1.jpg';
import evenement2 from '@/assets/gallery/evenement-2.jpg';
import sport from '@/assets/gallery/sport.jpg';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
  date?: string;
  location?: string;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('tous');

  const images: GalleryImage[] = [
    {
      id: 1,
      src: salleClasse1,
      title: "Salle de classe moderne",
      category: "infrastructure",
      description: "Nos salles de classe équipées des dernières technologies éducatives",
      location: "Bâtiment A - 1er étage"
    },
    {
      id: 2,
      src: salleClasse2,
      title: "Salle de mathématiques",
      category: "infrastructure",
      description: "Salle spécialisée pour l'enseignement des mathématiques",
      location: "Bâtiment B - 2ème étage"
    },
    {
      id: 3,
      src: laboratoire,
      title: "Laboratoire de sciences",
      category: "infrastructure",
      description: "Laboratoire moderne pour les expériences de physique et chimie",
      location: "Bâtiment C - Rez-de-chaussée"
    },
    {
      id: 4,
      src: bibliotheque,
      title: "Bibliothèque",
      category: "infrastructure",
      description: "Espace de lecture et de recherche avec plus de 5000 ouvrages",
      location: "Bâtiment principal"
    },
    {
      id: 5,
      src: cour,
      title: "Cour de récréation",
      category: "infrastructure",
      description: "Espace de détente et de récréation pour les élèves",
      location: "Cour centrale"
    },
    {
      id: 6,
      src: evenement1,
      title: "Journée portes ouvertes 2024",
      category: "evenements",
      description: "Moment de partage avec les familles lors de nos portes ouvertes",
      date: "15 mars 2024"
    },
    {
      id: 7,
      src: evenement2,
      title: "Cérémonie de remise des diplômes",
      category: "evenements",
      description: "Félicitations à nos diplômés de la promotion 2024",
      date: "28 juin 2024"
    },
    {
      id: 8,
      src: sport,
      title: "Compétition sportive inter-collèges",
      category: "sport",
      description: "Nos équipes en action lors du championnat régional",
      date: "12 mai 2024",
      location: "Gymnase municipal"
    }
  ];

  const categories = [
    { id: 'tous', name: 'Toutes les photos', count: images.length },
    { id: 'infrastructure', name: 'Infrastructure', count: images.filter(img => img.category === 'infrastructure').length },
    { id: 'evenements', name: 'Événements', count: images.filter(img => img.category === 'evenements').length },
    { id: 'sport', name: 'Sport', count: images.filter(img => img.category === 'sport').length }
  ];

  const filteredImages = selectedCategory === 'tous' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'infrastructure': return 'bg-primary/10 text-primary border-primary/20';
      case 'evenements': return 'bg-secondary text-secondary-foreground border-secondary';
      case 'sport': return 'bg-accent text-accent-foreground border-accent';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Galerie Photos</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez la vie de notre collège à travers nos installations modernes, 
            nos événements marquants et les moments de partage de notre communauté éducative.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Grille de photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge 
                  className={`absolute top-3 right-3 ${getCategoryColor(image.category)}`}
                >
                  {image.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                  {image.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {image.description}
                </p>
                <div className="flex flex-col space-y-2 text-xs text-muted-foreground">
                  {image.date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{image.date}</span>
                    </div>
                  )}
                  {image.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{image.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message si aucune photo */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Aucune photo dans cette catégorie
            </h3>
            <p className="text-muted-foreground">
              Sélectionnez une autre catégorie pour voir plus de photos.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;