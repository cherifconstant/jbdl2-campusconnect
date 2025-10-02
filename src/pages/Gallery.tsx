import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, Calendar, MapPin, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
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
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  date: string | null;
  location: string | null;
  is_main_image: boolean;
  display_order: number;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Images principales affichées dans la grille
  const mainImages = images.filter(img => img.is_main_image);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    const categoryImages = images.filter(img => img.category === image.category);
    setCurrentImageIndex(categoryImages.findIndex(img => img.id === image.id));
    setIsModalOpen(true);
  };

  const getCategoryImages = (category: string) => {
    return images.filter(img => img.category === category);
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
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <Card 
                key={image.id} 
                className="group overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.image_url}
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
        ) : (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Aucune image disponible
            </h3>
            <p className="text-muted-foreground">
              Les images seront bientôt ajoutées.
            </p>
          </div>
        )}

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
                      src={selectedImage.image_url}
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
                            src={img.image_url}
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
      </div>
    </Layout>
  );
};

export default Gallery;