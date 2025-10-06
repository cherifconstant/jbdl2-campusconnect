import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AdminLayout from '@/components/AdminLayout';

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
  created_at: string;
}

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'infrastructure',
    description: '',
    image_url: '',
    date: '',
    location: '',
    is_main_image: false,
    display_order: 0,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les images.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = fileName;
    
    const bucket = file.type.startsWith('video/') ? 'gallery-videos' : 'gallery-images';

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUploading(true);
      let imageUrl = formData.image_url;

      // Si un nouveau fichier est sélectionné, l'uploader
      if (selectedFile) {
        imageUrl = await uploadFile(selectedFile);
      }

      // Vérifier qu'on a une URL d'image
      if (!imageUrl) {
        throw new Error("Veuillez sélectionner un fichier");
      }

      if (editingId) {
        const { error } = await supabase
          .from('gallery_images')
          .update({
            ...formData,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: "Image mise à jour" });
      } else {
        const { error } = await supabase
          .from('gallery_images')
          .insert({
            ...formData,
            image_url: imageUrl,
          });

        if (error) throw error;
        toast({ title: "Image ajoutée" });
      }

      resetForm();
      fetchImages();
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: GalleryImage) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || '',
      image_url: item.image_url,
      date: item.date || '',
      location: item.location || '',
      is_main_image: item.is_main_image,
      display_order: item.display_order,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchImages();
      toast({ title: "Image supprimée" });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'infrastructure',
      description: '',
      image_url: '',
      date: '',
      location: '',
      is_main_image: false,
      display_order: 0,
    });
    setEditingId(null);
    setSelectedFile(null);
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      infrastructure: 'Infrastructure',
      evenements: 'Événements',
      sport: 'Sport',
    };
    return labels[category] || category;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary">Gestion de la galerie</h2>
            <p className="text-muted-foreground">Gérez les images de la galerie du collège</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Modifier l\'image' : 'Nouvelle image'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations de l'image
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="evenements">Événements</SelectItem>
                      <SelectItem value="sport">Sport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Fichier (Image ou Vidéo)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file"
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                          // Afficher un aperçu du nom du fichier
                          toast({
                            title: "Fichier sélectionné",
                            description: file.name,
                          });
                        }
                      }}
                      required={!editingId && !formData.image_url}
                    />
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  {formData.image_url && !selectedFile && (
                    <p className="text-xs text-muted-foreground">
                      Fichier actuel: {formData.image_url.split('/').pop()}
                    </p>
                  )}
                  {selectedFile && (
                    <p className="text-xs text-green-600">
                      Nouveau fichier: {selectedFile.name}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="15 mars 2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lieu</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Gymnase"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Ordre d'affichage</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_main_image"
                    checked={formData.is_main_image}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_main_image: checked })}
                  />
                  <Label htmlFor="is_main_image">Image principale de la catégorie</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Téléchargement...
                      </>
                    ) : (
                      editingId ? 'Mettre à jour' : 'Ajouter'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Images de la galerie</CardTitle>
            <CardDescription>Gérez toutes les images de la galerie</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : images.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Aucune image</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.is_main_image && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          Principal
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {getCategoryLabel(item.category)}
                      </p>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
