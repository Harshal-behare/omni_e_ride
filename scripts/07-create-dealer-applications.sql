-- Drop existing table if it exists to reset
DROP TABLE IF EXISTS dealer_applications;

-- Create dealer_applications table
CREATE TABLE dealer_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    business_name TEXT NOT NULL,
    business_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    business_type TEXT NOT NULL,
    experience_years INTEGER,
    investment_capacity TEXT,
    expected_sales INTEGER,
    territory_preference TEXT[],
    additional_info TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by UUID REFERENCES user_profiles(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_dealer_applications_status ON dealer_applications(status);
CREATE INDEX IF NOT EXISTS idx_dealer_applications_created_at ON dealer_applications(created_at);

-- Enable RLS
ALTER TABLE dealer_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for dealer_applications
CREATE POLICY "Anyone can submit dealer application" ON dealer_applications
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can view all applications" ON dealer_applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY "Admins can update applications" ON dealer_applications
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_dealer_applications_updated_at
    BEFORE UPDATE ON dealer_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
