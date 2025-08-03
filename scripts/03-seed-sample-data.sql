-- Insert sample models
INSERT INTO models (name, price, range, top_speed, charging_time, battery, acceleration, colors, features, specifications, description, is_active) VALUES
('EcoRide City', 85000, '120 km', '45 km/h', '4-6 hours', '48V 20Ah Lithium', '0-25 km/h in 8s', 
 ARRAY['Red', 'Blue', 'White', 'Black'], 
 ARRAY['LED Headlights', 'Digital Display', 'USB Charging', 'Anti-theft Alarm'],
 '{"motor_power": "1000W", "weight": "65kg", "load_capacity": "150kg", "brakes": "Disc Brakes"}',
 'Perfect for city commuting with excellent range and modern features.', true),

('PowerMax Pro', 125000, '180 km', '65 km/h', '6-8 hours', '60V 32Ah Lithium', '0-25 km/h in 6s',
 ARRAY['Silver', 'Black', 'Red', 'Blue'],
 ARRAY['Smart Dashboard', 'GPS Tracking', 'Mobile App', 'Fast Charging', 'Regenerative Braking'],
 '{"motor_power": "1500W", "weight": "75kg", "load_capacity": "180kg", "brakes": "Hydraulic Disc"}',
 'High-performance e-bike for long-distance travel and professional use.', true),

('UrbanGlide Lite', 65000, '80 km', '35 km/h', '3-4 hours', '36V 15Ah Lithium', '0-25 km/h in 10s',
 ARRAY['White', 'Green', 'Orange', 'Purple'],
 ARRAY['Lightweight Frame', 'Foldable Design', 'LED Indicators', 'Phone Holder'],
 '{"motor_power": "750W", "weight": "45kg", "load_capacity": "120kg", "brakes": "V-Brakes"}',
 'Lightweight and affordable option for daily commuting.', true),

('SportMax Elite', 155000, '200 km', '80 km/h', '8-10 hours', '72V 40Ah Lithium', '0-25 km/h in 4s',
 ARRAY['Matte Black', 'Racing Red', 'Electric Blue'],
 ARRAY['Sport Mode', 'Cruise Control', 'Premium Suspension', 'Racing Dashboard', 'Quick Charge'],
 '{"motor_power": "2000W", "weight": "85kg", "load_capacity": "200kg", "brakes": "ABS Disc Brakes"}',
 'Premium sports e-bike with maximum performance and luxury features.', true);

-- Insert sample contact inquiries
INSERT INTO contact_inquiries (name, email, phone, message, subject, status) VALUES
('Rajesh Kumar', 'rajesh@example.com', '+91-9876543210', 'I am interested in the EcoRide City model. Can you provide more details about financing options?', 'Product Inquiry', 'new'),
('Priya Sharma', 'priya@example.com', '+91-9876543211', 'What is the warranty period for the PowerMax Pro? Also, do you have service centers in Bangalore?', 'Warranty Query', 'new'),
('Amit Patel', 'amit@example.com', '+91-9876543212', 'I want to become a dealer in Gujarat. What are the requirements and investment needed?', 'Dealer Inquiry', 'in_progress');

-- Insert sample dealer applications
INSERT INTO dealer_applications (
    full_name, email, phone, business_name, business_address, city, state, pincode, 
    business_type, experience_years, investment_capacity, expected_sales, 
    territory_preference, additional_info, status
) VALUES
('Suresh Gupta', 'suresh.dealer@example.com', '+91-9876543213', 'Gupta Auto Sales', 
 '123 Main Street, Commercial Complex', 'Mumbai', 'Maharashtra', '400001',
 'Automotive Retail', 5, '10-15 Lakhs', 50, 
 ARRAY['Mumbai', 'Thane', 'Navi Mumbai'], 
 'Experienced in two-wheeler sales with established customer base.', 'pending'),

('Kavita Singh', 'kavita.dealer@example.com', '+91-9876543214', 'Singh Motors', 
 '456 Market Road, Business District', 'Delhi', 'Delhi', '110001',
 'Vehicle Dealership', 8, '15-20 Lakhs', 75,
 ARRAY['Delhi', 'Gurgaon', 'Noida'],
 'Running successful dealership for 8 years with good market reputation.', 'pending');
