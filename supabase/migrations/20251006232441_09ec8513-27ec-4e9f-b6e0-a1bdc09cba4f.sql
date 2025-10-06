-- Create storage buckets for gallery images and videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('gallery-images', 'gallery-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif']),
  ('gallery-videos', 'gallery-videos', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/ogg'])
ON CONFLICT (id) DO NOTHING;

-- Create policies for gallery images bucket
CREATE POLICY "Gallery images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update gallery images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gallery-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gallery-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Create policies for gallery videos bucket
CREATE POLICY "Gallery videos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-videos');

CREATE POLICY "Admins can upload gallery videos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery-videos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update gallery videos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gallery-videos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete gallery videos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gallery-videos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);