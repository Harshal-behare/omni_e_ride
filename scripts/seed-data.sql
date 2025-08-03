-- Insert sample models
INSERT INTO public.models (name, price, range, top_speed, charging_time, battery, acceleration, colors, features, specifications, description, image_url) VALUES
('Omni Urban', 85000, '80 km', '45 km/h', '4 hours', '2.5 kWh', '0-40 km/h in 8s', 
 ARRAY['Red', 'Blue', 'White', 'Black'], 
 ARRAY['LED Headlights', 'Digital Display', 'USB Charging', 'Anti-theft Alarm'],
 '{"motor_power": "1500W", "weight": "85kg", "load_capacity": "150kg", "brakes": "Disc Brakes", "suspension": "Telescopic Front"}',
 'Perfect for city commuting with excellent range and modern features.',
 '/placeholder.svg?height=400&width=600&text=Omni+Urban'),

('Omni Sport', 125000, '100 km', '65 km/h', '5 hours', '3.2 kWh', '0-50 km/h in 6s',
 ARRAY['Red', 'Black', 'Silver', 'Orange'],
 ARRAY['Sport Mode', 'Regenerative Braking', 'Bluetooth Connectivity', 'GPS Tracking'],
 '{"motor_power": "2500W", "weight": "95kg", "load_capacity": "160kg", "brakes": "Hydraulic Disc", "suspension": "Dual Suspension"}',
 'High-performance scooter for enthusiasts who demand speed and style.',
 '/placeholder.svg?height=400&width=600&text=Omni+Sport'),

('Omni Eco', 65000, '60 km', '35 km/h', '3 hours', '1.8 kWh', '0-30 km/h in 10s',
 ARRAY['Green', 'White', 'Blue'],
 ARRAY['Eco Mode', 'Solar Panel Compatible', 'Lightweight Design', 'Smart Lock'],
 '{"motor_power": "1000W", "weight": "70kg", "load_capacity": "130kg", "brakes": "Drum Brakes", "suspension": "Spring Loaded"}',
 'Eco-friendly and affordable option for daily commuting.',
 '/placeholder.svg?height=400&width=600&text=Omni+Eco'),

('Omni Cargo', 145000, '70 km', '40 km/h', '6 hours', '4.0 kWh', '0-35 km/h in 12s',
 ARRAY['Yellow', 'White', 'Gray'],
 ARRAY['Large Storage Box', 'Heavy Duty Frame', 'Load Indicator', 'Parking Brake'],
 '{"motor_power": "2000W", "weight": "120kg", "load_capacity": "200kg", "brakes": "Hydraulic Disc", "suspension": "Heavy Duty"}',
 'Built for delivery and cargo transport with maximum load capacity.',
 '/placeholder.svg?height=400&width=600&text=Omni+Cargo'),

('Omni Premium', 185000, '120 km', '70 km/h', '6 hours', '4.5 kWh', '0-60 km/h in 5s',
 ARRAY['Pearl White', 'Midnight Black', 'Royal Blue', 'Champagne Gold'],
 ARRAY['Premium Leather Seat', 'Touchscreen Display', 'Keyless Start', 'Premium Sound System'],
 '{"motor_power": "3000W", "weight": "110kg", "load_capacity": "180kg", "brakes": "ABS Disc Brakes", "suspension": "Premium Air Suspension"}',
 'Luxury electric scooter with premium features and exceptional performance.',
 '/placeholder.svg?height=400&width=600&text=Omni+Premium');

-- Insert sample dealers
INSERT INTO public.dealers (name, location, address, phone, email, manager_name, status, monthly_sales, total_sales) VALUES
('Delhi Motors', 'New Delhi', 'Connaught Place, New Delhi - 110001', '+91-9876543210', 'delhi@omnimotors.com', 'Rajesh Kumar', 'active', 45, 320),
('Mumbai Electric', 'Mumbai', 'Bandra West, Mumbai - 400050', '+91-9876543211', 'mumbai@omnimotors.com', 'Priya Sharma', 'active', 52, 410),
('Bangalore Bikes', 'Bangalore', 'Koramangala, Bangalore - 560034', '+91-9876543212', 'bangalore@omnimotors.com', 'Suresh Reddy', 'active', 38, 285),
('Chennai Scooters', 'Chennai', 'T. Nagar, Chennai - 600017', '+91-9876543213', 'chennai@omnimotors.com', 'Lakshmi Iyer', 'active', 41, 295),
('Hyderabad Hub', 'Hyderabad', 'Banjara Hills, Hyderabad - 500034', '+91-9876543214', 'hyderabad@omnimotors.com', 'Venkat Rao', 'active', 35, 240),
('Pune Riders', 'Pune', 'Shivaji Nagar, Pune - 411005', '+91-9876543215', 'pune@omnimotors.com', 'Amit Patil', 'approved', 28, 180),
('Kolkata Electric', 'Kolkata', 'Park Street, Kolkata - 700016', '+91-9876543216', 'kolkata@omnimotors.com', 'Debashish Sen', 'approved', 22, 145),
('Ahmedabad Motors', 'Ahmedabad', 'Satellite, Ahmedabad - 380015', '+91-9876543217', 'ahmedabad@omnimotors.com', 'Kiran Patel', 'active', 31, 210);

-- Insert sample contact inquiries
INSERT INTO public.contact_inquiries (name, email, phone, message, status) VALUES
('Arjun Singh', 'arjun.singh@email.com', '+91-9876543220', 'I am interested in the Omni Urban model. Can you provide more details about financing options?', 'new'),
('Sneha Gupta', 'sneha.gupta@email.com', '+91-9876543221', 'What is the warranty period for the battery? Also, are there any service centers in Jaipur?', 'in_progress'),
('Rohit Mehta', 'rohit.mehta@email.com', '+91-9876543222', 'I want to become a dealer in Indore. What are the requirements and investment needed?', 'new'),
('Kavya Nair', 'kavya.nair@email.com', '+91-9876543223', 'The charging port on my Omni Sport is not working properly. Need technical support.', 'resolved'),
('Vikram Joshi', 'vikram.joshi@email.com', '+91-9876543224', 'Can I get a test ride for the Omni Premium in Gurgaon? When are you planning to launch there?', 'new');
