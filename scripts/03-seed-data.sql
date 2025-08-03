-- Insert sample scooter models
INSERT INTO scooter_models (name, price, range, top_speed, charging_time, battery, description, features, image_url) VALUES
('Omni Swift', 63000, '80 km', '45 km/h', '4-5 hours', '48V 24Ah', 'Perfect for daily commuting with excellent range and performance.', 
 '["LED Headlight", "Digital Display", "Anti-theft Alarm", "USB Charging Port"]', 
 '/placeholder.svg?height=300&width=400&text=Omni+Swift'),
 
('Omni Power', 78000, '100 km', '60 km/h', '5-6 hours', '60V 30Ah', 'Enhanced power and range for longer journeys.', 
 '["LED Headlight", "Digital Display", "Anti-theft Alarm", "USB Charging Port", "Bluetooth Connectivity"]', 
 '/placeholder.svg?height=300&width=400&text=Omni+Power'),
 
('Omni Elite', 95000, '120 km', '70 km/h', '6-7 hours', '72V 35Ah', 'Premium model with advanced features and superior performance.', 
 '["LED Headlight", "Digital Display", "Anti-theft Alarm", "USB Charging Port", "Bluetooth Connectivity", "GPS Tracking"]', 
 '/placeholder.svg?height=300&width=400&text=Omni+Elite'),
 
('Omni Pro', 110000, '150 km', '80 km/h', '7-8 hours', '72V 40Ah', 'Professional grade scooter for heavy usage.', 
 '["LED Headlight", "Digital Display", "Anti-theft Alarm", "USB Charging Port", "Bluetooth Connectivity", "GPS Tracking", "Fast Charging"]', 
 '/placeholder.svg?height=300&width=400&text=Omni+Pro'),
 
('Omni Max', 125000, '180 km', '90 km/h', '8-9 hours', '84V 45Ah', 'Maximum range and performance for ultimate mobility.', 
 '["LED Headlight", "Digital Display", "Anti-theft Alarm", "USB Charging Port", "Bluetooth Connectivity", "GPS Tracking", "Fast Charging", "Regenerative Braking"]', 
 '/placeholder.svg?height=300&width=400&text=Omni+Max');

-- Note: You'll need to create user accounts through Supabase Auth first, then update the user_profiles table
-- Sample data for when you have actual user IDs:

-- INSERT INTO user_profiles (id, email, full_name, phone, user_type, city, state) VALUES
-- ('admin-uuid-here', 'admin@omnierride.com', 'Admin User', '+919876543210', 'admin', 'Patna', 'Bihar'),
-- ('dealer-uuid-here', 'dealer@omnierride.com', 'Sample Dealer', '+919876543211', 'dealer', 'Patna', 'Bihar'),
-- ('customer-uuid-here', 'customer@omnierride.com', 'Sample Customer', '+919876543212', 'customer', 'Patna', 'Bihar');

-- Sample dealers (insert after creating dealer user accounts)
-- INSERT INTO dealers (id, name, email, phone, address, city, state, pincode) VALUES
-- ('dealer-uuid-here', 'Omni E-Ride Patna', 'dealer@omnierride.com', '+919876543211', 'Gandhi Maidan, Patna', 'Patna', 'Bihar', '800001');

-- Sample inventory (insert after creating dealer accounts)
-- INSERT INTO inventory (dealer_id, model_id, stock_quantity) VALUES
-- ('dealer-uuid-here', 1, 10),
-- ('dealer-uuid-here', 2, 8),
-- ('dealer-uuid-here', 3, 5),
-- ('dealer-uuid-here', 4, 3),
-- ('dealer-uuid-here', 5, 2);
