-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('scooter-images', 'scooter-images', true),
('avatars', 'avatars', true),
('documents', 'documents', false);

-- Create storage policies
CREATE POLICY "Anyone can view scooter images" ON storage.objects
  FOR SELECT USING (bucket_id = 'scooter-images');

CREATE POLICY "Admins can upload scooter images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'scooter-images' AND
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "Users can view their own avatars" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload their own avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatars" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can manage documents" ON storage.objects
  FOR ALL USING (
    bucket_id = 'documents' AND
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );
