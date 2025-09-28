import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Calendar, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import salleClasse1 from '@/assets/gallery/salle-classe-1.jpg';
import salleClasse2 from '@/assets/gallery/salle-classe-2.jpg';
import laboratoire from '@/assets/gallery/laboratoire.jpg';
import bibliotheque from '@/assets/gallery/bibliotheque.jpg';
import cour from '@/assets/gallery/cour.jpg';
import evenement1 from '@/assets/gallery/evenement-1.jpg';
import evenement2 from '@/assets/gallery/evenement-2.jpg';
import sport from '@/assets/gallery/sport.jpg';
import salleInformatique from '@/assets/gallery/salle-informatique.jpg';
import cafeteria from '@/assets/gallery/cafeteria.jpg';
import salleArt from '@/assets/gallery/salle-art.jpg';
import salleMusique from '@/assets/gallery/salle-musique.jpg';
import theatre1 from '@/assets/gallery/theatre-1.jpg';
import foireSciences from '@/assets/gallery/foire-sciences.jpg';
import festivalCulturel from '@/assets/gallery/festival-culturel.jpg';
import football from '@/assets/gallery/football.jpg';
import piscine from '@/assets/gallery/piscine.jpg';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
  date?: string;
  location?: string;
  isMainImage?: boolean;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages: GalleryImage[] = [
    // Infrastructure
    {
      id: 1,
      src: salleClasse1,
      title: "Salle de classe moderne",
      category: "infrastructure",
      description: "Nos salles de classe équipées des dernières technologies éducatives",
      location: "Bâtiment A - 1er étage",
      isMainImage: true
    },
    {
      id: 2,
      src: salleClasse2,
      title: "Salle de mathématiques",
      category: "infrastructure",
      description: "Salle spécialisée pour l'enseignement des mathématiques",
      location: "Bâtiment B - 2ème étage",
      isMainImage: true
    },
    {
      id: 3,
      src: laboratoire,
      title: "Laboratoire de sciences",
      category: "infrastructure",
      description: "Laboratoire moderne pour les expériences de physique et chimie",
      location: "Bâtiment C - Rez-de-chaussée",
      isMainImage: true
    },
    {
      id: 4,
      src: bibliotheque,
      title: "Bibliothèque",
      category: "infrastructure",
      description: "Espace de lecture et de recherche avec plus de 5000 ouvrages",
      location: "Bâtiment principal",
      isMainImage: true
    },
    {
      id: 5,
      src: cour,
      title: "Cour de récréation",
      category: "infrastructure",
      description: "Espace de détente et de récréation pour les élèves",
      location: "Cour centrale",
      isMainImage: true
    },
    {
      id: 9,
      src: salleInformatique,
      title: "Salle informatique",
      category: "infrastructure",
      description: "Équipement informatique moderne pour l'apprentissage numérique",
      location: "Bâtiment B - 1er étage"
    },
    {
      id: 10,
      src: cafeteria,
      title: "Cafétéria",
      category: "infrastructure",
      description: "Espace de restauration convivial et moderne",
      location: "Bâtiment principal"
    },
    {
      id: 11,
      src: salleArt,
      title: "Salle d'arts plastiques",
      category: "infrastructure",
      description: "Atelier créatif pour l'expression artistique",
      location: "Bâtiment D - Rez-de-chaussée"
    },
    {
      id: 12,
      src: salleMusique,
      title: "Salle de musique",
      category: "infrastructure",
      description: "Espace dédié à l'apprentissage musical",
      location: "Bâtiment D - 1er étage"
    },
    
    // Événements
    {
      id: 6,
      src: evenement1,
      title: "Journée portes ouvertes 2024",
      category: "evenements",
      description: "Moment de partage avec les familles lors de nos portes ouvertes",
      date: "15 mars 2024",
      isMainImage: true
    },
    {
      id: 7,
      src: evenement2,
      title: "Cérémonie de remise des diplômes",
      category: "evenements",
      description: "Félicitations à nos diplômés de la promotion 2024",
      date: "28 juin 2024",
      isMainImage: true
    },
    {
      id: 13,
      src: theatre1,
      title: "Spectacle de fin d'année",
      category: "evenements",
      description: "Représentation théâtrale des élèves de l'option théâtre",
      date: "20 juin 2024"
    },
    {
      id: 14,
      src: foireSciences,
      title: "Foire aux sciences",
      category: "evenements",
      description: "Exposition des projets scientifiques des élèves",
      date: "18 avril 2024"
    },
    {
      id: 15,
      src: festivalCulturel,
      title: "Festival culturel international",
      category: "evenements",
      description: "Célébration de la diversité culturelle de notre établissement",
      date: "12 mai 2024"
    },
    
    // Sport
    {
      id: 8,
      src: sport,
      title: "Compétition sportive inter-collèges",
      category: "sport",
      description: "Nos équipes en action lors du championnat régional",
      date: "12 mai 2024",
      location: "Gymnase municipal",
      isMainImage: true
    },
    {
      id: 16,
      src: football,
      title: "Tournoi de football",
      category: "sport",
      description: "Match amical entre les classes de 4ème",
      date: "25 avril 2024",
      location: "Terrain de sport"
    },
    {
      id: 17,
      src: piscine,
      title: "Cours de natation",
      category: "sport",
      description: "Séance de natation pour les élèves de 6ème",
      date: "Tous les mardis",
      location: "Piscine municipale"
    }
  ];

  // Images principales affichées dans la grille
  const mainImages = allImages.filter(img => img.isMainImage);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    const categoryImages = allImages.filter(img => img.category === image.category);
    setCurrentImageIndex(categoryImages.findIndex(img => img.id === image.id));
    setIsModalOpen(true);
  };

  const getCategoryImages = (category: string) => {
    return allImages.filter(img => img.category === category);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const categoryImages = getCategoryImages(selectedImage.category);
    let newIndex = currentImageIndex;
    
    if (direction === 'prev') {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : categoryImages.length - 1;
    } else {
      newIndex = currentImageIndex < categoryImages.length - 1 ? currentImageIndex + 1 : 0;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(categoryImages[newIndex]);
  };

  const categories = [
    { id: 'tous', name: 'Toutes les photos', count: mainImages.length },
    { id: 'infrastructure', name: 'Infrastructure', count: mainImages.filter(img => img.category === 'infrastructure').length },
    { id: 'evenements', name: 'Événements', count: mainImages.filter(img => img.category === 'evenements').length },
    { id: 'sport', name: 'Sport', count: mainImages.filter(img => img.category === 'sport').length }
  ];

  const filteredImages = selectedCategory === 'tous' 
    ? mainImages 
    : mainImages.filter(img => img.category === selectedCategory);

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
            <Card 
              key={image.id} 
              className="group overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => openModal(image)}
            >
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
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
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

        {/* Modal pour afficher plus de photos */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
            {selectedImage && (
              <>
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-xl font-bold">
                    Photos - {selectedImage.category === 'infrastructure' ? 'Infrastructure' : 
                             selectedImage.category === 'evenements' ? 'Événements' : 'Sport'}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="relative">
                  {/* Image principale */}
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Navigation */}
                    <button
                      onClick={() => navigateImage('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                      onClick={() => navigateImage('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                    
                    {/* Informations sur l'image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                      <p className="text-sm mb-2">{selectedImage.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        {selectedImage.date && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{selectedImage.date}</span>
                          </div>
                        )}
                        {selectedImage.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{selectedImage.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Galerie de miniatures */}
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4">Autres photos de cette catégorie</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {getCategoryImages(selectedImage.category).map((img, index) => (
                        <div
                          key={img.id}
                          className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                            img.id === selectedImage.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => {
                            setSelectedImage(img);
                            setCurrentImageIndex(index);
                          }}
                        >
                          <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-20 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

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