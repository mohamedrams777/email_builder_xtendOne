-- Create templates table
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'invoice')),
  thumbnail TEXT,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_public BOOLEAN NOT NULL DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for templates
CREATE POLICY "Public templates are viewable by everyone"
  ON public.templates FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own templates"
  ON public.templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
  ON public.templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
  ON public.templates FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_templates_user_id ON public.templates(user_id);
CREATE INDEX idx_templates_type ON public.templates(type);
CREATE INDEX idx_templates_is_public ON public.templates(is_public);

-- Insert default email templates
INSERT INTO public.templates (name, type, thumbnail, blocks, is_public) VALUES
(
  'Welcome Email',
  'email',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
  '[
    {
      "id": "welcome-heading",
      "type": "heading",
      "content": {"text": "Welcome to Our Platform!"},
      "styles": {"fontSize": "32px", "textAlign": "center", "color": "#1a202c", "fontWeight": "bold"}
    },
    {
      "id": "welcome-text",
      "type": "text",
      "content": {"text": "We are excited to have you on board. Get started with our platform today."},
      "styles": {"fontSize": "16px", "textAlign": "center", "color": "#4a5568"}
    },
    {
      "id": "welcome-button",
      "type": "button",
      "content": {"text": "Get Started", "href": "https://example.com"},
      "styles": {"backgroundColor": "#3b82f6", "color": "#ffffff", "padding": "12px 24px", "textAlign": "center"}
    }
  ]'::jsonb,
  true
),
(
  'Newsletter',
  'email',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
  '[
    {
      "id": "newsletter-heading",
      "type": "heading",
      "content": {"text": "Monthly Newsletter"},
      "styles": {"fontSize": "28px", "textAlign": "left", "color": "#2d3748", "fontWeight": "bold"}
    },
    {
      "id": "newsletter-text",
      "type": "text",
      "content": {"text": "Stay updated with the latest news and updates from our team."},
      "styles": {"fontSize": "16px", "textAlign": "left", "color": "#4a5568"}
    },
    {
      "id": "newsletter-divider",
      "type": "divider",
      "content": {},
      "styles": {"borderColor": "#e2e8f0", "margin": "20px 0"}
    }
  ]'::jsonb,
  true
),
(
  'Promotional Email',
  'email',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
  '[
    {
      "id": "promo-heading",
      "type": "heading",
      "content": {"text": "Special Offer Just For You!"},
      "styles": {"fontSize": "30px", "textAlign": "center", "color": "#dc2626", "fontWeight": "bold"}
    },
    {
      "id": "promo-text",
      "type": "text",
      "content": {"text": "Get 50% off on all products. Limited time offer!"},
      "styles": {"fontSize": "18px", "textAlign": "center", "color": "#1f2937"}
    },
    {
      "id": "promo-button",
      "type": "button",
      "content": {"text": "Shop Now", "href": "https://example.com/shop"},
      "styles": {"backgroundColor": "#dc2626", "color": "#ffffff", "padding": "14px 28px", "textAlign": "center"}
    }
  ]'::jsonb,
  true
);

-- Insert default invoice templates
INSERT INTO public.templates (name, type, thumbnail, blocks, is_public) VALUES
(
  'Simple Invoice',
  'invoice',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
  '[
    {
      "id": "invoice-heading",
      "type": "heading",
      "content": {"text": "INVOICE"},
      "styles": {"fontSize": "36px", "textAlign": "right", "color": "#1a202c", "fontWeight": "bold"}
    },
    {
      "id": "invoice-text",
      "type": "text",
      "content": {"text": "Invoice #: INV-001\\nDate: [Date]\\nDue Date: [Due Date]"},
      "styles": {"fontSize": "14px", "textAlign": "left", "color": "#4a5568"}
    },
    {
      "id": "invoice-divider",
      "type": "divider",
      "content": {},
      "styles": {"borderColor": "#cbd5e0", "margin": "16px 0"}
    }
  ]'::jsonb,
  true
),
(
  'Professional Invoice',
  'invoice',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
  '[
    {
      "id": "prof-invoice-heading",
      "type": "heading",
      "content": {"text": "PROFESSIONAL INVOICE"},
      "styles": {"fontSize": "32px", "textAlign": "center", "color": "#2563eb", "fontWeight": "bold"}
    },
    {
      "id": "prof-invoice-columns",
      "type": "columns",
      "content": {"columns": 2},
      "styles": {"gap": "20px"}
    },
    {
      "id": "prof-invoice-text",
      "type": "text",
      "content": {"text": "Thank you for your business!"},
      "styles": {"fontSize": "16px", "textAlign": "center", "color": "#6b7280"}
    }
  ]'::jsonb,
  true
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for templates
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();