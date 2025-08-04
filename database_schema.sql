-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.contact_inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  email character varying NOT NULL,
  phone character varying,
  subject character varying NOT NULL,
  message text NOT NULL,
  status USER-DEFINED DEFAULT 'new'::inquiry_status,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_inquiries_pkey PRIMARY KEY (id)
);
CREATE TABLE public.customer_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_id uuid,
  dealer_id uuid,
  order_id uuid,
  model_id uuid,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  is_verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT customer_reviews_pkey PRIMARY KEY (id),
  CONSTRAINT customer_reviews_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id),
  CONSTRAINT customer_reviews_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id),
  CONSTRAINT customer_reviews_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT customer_reviews_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.dealer_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  full_name character varying NOT NULL,
  email character varying NOT NULL,
  phone character varying NOT NULL,
  business_name character varying NOT NULL,
  business_address text NOT NULL,
  city character varying NOT NULL,
  state character varying NOT NULL,
  pincode character varying NOT NULL,
  business_type character varying NOT NULL,
  experience_years integer,
  investment_capacity character varying NOT NULL,
  expected_sales integer,
  territory_preference ARRAY,
  additional_info text,
  status USER-DEFINED DEFAULT 'pending'::dealer_status,
  reviewed_by uuid,
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT dealer_applications_pkey PRIMARY KEY (id),
  CONSTRAINT dealer_applications_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.dealer_commissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  dealer_id uuid,
  order_id uuid,
  commission_amount numeric NOT NULL,
  commission_percentage numeric NOT NULL,
  status character varying DEFAULT 'pending'::character varying,
  paid_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT dealer_commissions_pkey PRIMARY KEY (id),
  CONSTRAINT dealer_commissions_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id),
  CONSTRAINT dealer_commissions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id)
);
CREATE TABLE public.dealer_sales (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  dealer_id uuid,
  order_id uuid,
  commission_amount numeric NOT NULL,
  sale_date date NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT dealer_sales_pkey PRIMARY KEY (id),
  CONSTRAINT dealer_sales_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT dealer_sales_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id)
);
CREATE TABLE public.dealers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  business_name character varying NOT NULL,
  business_address text NOT NULL,
  phone character varying NOT NULL,
  email character varying NOT NULL UNIQUE,
  status USER-DEFINED DEFAULT 'pending'::dealer_status,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT dealers_pkey PRIMARY KEY (id),
  CONSTRAINT dealers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.financial_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid,
  dealer_id uuid,
  customer_id uuid,
  transaction_type character varying NOT NULL,
  amount numeric NOT NULL,
  payment_method character varying,
  transaction_date timestamp with time zone DEFAULT now(),
  status character varying DEFAULT 'completed'::character varying,
  reference_number character varying,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT financial_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT financial_transactions_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.user_profiles(id),
  CONSTRAINT financial_transactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT financial_transactions_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id)
);
CREATE TABLE public.inventory (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  dealer_id uuid,
  model_id uuid,
  quantity integer DEFAULT 0,
  price numeric NOT NULL,
  condition character varying DEFAULT 'new'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT inventory_pkey PRIMARY KEY (id),
  CONSTRAINT inventory_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id),
  CONSTRAINT inventory_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id)
);
CREATE TABLE public.models (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  description text,
  price numeric NOT NULL,
  specifications jsonb,
  main_image text,
  gallery ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT models_pkey PRIMARY KEY (id)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_id uuid,
  dealer_id uuid,
  model_id uuid,
  quantity integer DEFAULT 1,
  total_amount numeric NOT NULL,
  status USER-DEFINED DEFAULT 'pending'::order_status,
  payment_status USER-DEFINED DEFAULT 'pending'::payment_status,
  shipping_address text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id),
  CONSTRAINT orders_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id),
  CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.role_change_history (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  previous_role USER-DEFINED NOT NULL,
  new_role USER-DEFINED NOT NULL,
  changed_by uuid NOT NULL,
  change_reason text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT role_change_history_pkey PRIMARY KEY (id),
  CONSTRAINT role_change_history_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public.user_profiles(id),
  CONSTRAINT role_change_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.service_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_id uuid,
  dealer_id uuid,
  vehicle_model_id uuid,
  vehicle_registration character varying,
  service_type character varying NOT NULL,
  service_description text,
  scheduled_date timestamp with time zone NOT NULL,
  estimated_duration integer,
  status USER-DEFINED DEFAULT 'scheduled'::service_status,
  total_cost numeric,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT service_bookings_pkey PRIMARY KEY (id),
  CONSTRAINT service_bookings_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id),
  CONSTRAINT service_bookings_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.user_profiles(id),
  CONSTRAINT service_bookings_vehicle_model_id_fkey FOREIGN KEY (vehicle_model_id) REFERENCES public.models(id)
);
CREATE TABLE public.test_ride_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_id uuid,
  dealer_id uuid,
  model_id uuid,
  preferred_date date NOT NULL,
  preferred_time character varying NOT NULL,
  status USER-DEFINED DEFAULT 'pending'::booking_status,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT test_ride_bookings_pkey PRIMARY KEY (id),
  CONSTRAINT test_ride_bookings_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.user_profiles(id),
  CONSTRAINT test_ride_bookings_dealer_id_fkey FOREIGN KEY (dealer_id) REFERENCES public.dealers(id),
  CONSTRAINT test_ride_bookings_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.models(id)
);
CREATE TABLE public.user_profiles (
  id uuid NOT NULL,
  email character varying NOT NULL UNIQUE,
  full_name character varying NOT NULL,
  phone character varying,
  user_type USER-DEFINED DEFAULT 'customer'::user_type,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  role_changed_by uuid,
  role_changed_at timestamp with time zone,
  previous_role USER-DEFINED,
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT user_profiles_role_changed_by_fkey FOREIGN KEY (role_changed_by) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.warranties (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid,
  customer_id uuid,
  vehicle_model_id uuid,
  warranty_type character varying NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status USER-DEFINED DEFAULT 'active'::warranty_status,
  terms_conditions text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT warranties_pkey PRIMARY KEY (id),
  CONSTRAINT warranties_vehicle_model_id_fkey FOREIGN KEY (vehicle_model_id) REFERENCES public.models(id),
  CONSTRAINT warranties_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT warranties_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.user_profiles(id)
);