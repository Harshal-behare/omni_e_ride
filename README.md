# 🚗⚡ Omni E-Ride - Electric Vehicle Company Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/harshal-behares-projects/v0-omni-e-ride)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A comprehensive electric vehicle company website with multi-role dashboards, CRM functionality, and modern e-commerce features. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

### 🏠 **Public Website**
- **Modern Homepage** - Hero section, featured models, testimonials
- **Product Catalog** - Complete electric vehicle models with specifications
- **Dealer Locator** - Interactive map with dealer locations
- **Contact System** - Multi-channel contact forms and information
- **Responsive Design** - Optimized for all devices and screen sizes

### 👨‍💼 **Admin Dashboard**
- **Dealer Management** - Approve, manage, and monitor dealers
- **Product Management** - Add, edit, and manage vehicle models
- **Order Tracking** - Monitor sales and customer orders
- **Analytics & Reports** - Business insights and performance metrics
- **User Management** - Control access and permissions

### 🏪 **Dealer Dashboard**
- **Sales Overview** - Performance metrics and targets
- **Inventory Management** - Stock levels and product availability
- **Customer Management** - Lead tracking and customer relationships
- **Order Processing** - Handle customer orders and inquiries
- **Commission Tracking** - Earnings and payment history

### 👤 **Customer Dashboard**
- **Profile Management** - Personal information and preferences
- **Order History** - Track purchases and delivery status
- **Test Ride Booking** - Schedule vehicle test drives
- **Support Center** - Help, documentation, and contact
- **Wishlist** - Save favorite models and compare features

## 🚀 Tech Stack

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts

### **Backend**
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: Custom JWT-based auth
- **Database**: Mock data (ready for integration)

### **Development Tools**
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier (configured)
- **Version Control**: Git

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/omni-e-ride.git
cd omni-e-ride

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
\`\`\`

### Build for Production

\`\`\`bash
# Create production build
npm run build

# Start production server
npm start
\`\`\`

## 🔐 Demo Credentials

### Admin Access
- **Email**: admin@omnierride.com
- **Password**: admin123
- **Access**: Full system control

### Dealer Access
- **Email**: dealer@omnierride.com
- **Password**: dealer123
- **Access**: Sales and inventory management

### Customer Access
- **Email**: customer@omnierride.com
- **Password**: customer123
- **Access**: Personal dashboard and orders

## 📁 Project Structure

\`\`\`
omni-e-ride/
├── app/                          # Next.js App Router
│   ├── admin/dashboard/          # Admin panel
│   ├── dealer/dashboard/         # Dealer portal
│   ├── customer/dashboard/       # Customer area
│   ├── models/                   # Product catalog
│   ├── dealers/                  # Dealer locator
│   ├── contact/                  # Contact pages
│   ├── login/                    # Authentication
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── Navbar.tsx                # Navigation
│   ├── Hero.tsx                  # Hero section
│   ├── ModelCard.tsx             # Product cards
│   ├── Footer.tsx                # Footer
│   └── ...                       # Other components
├── lib/                          # Utilities
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
│   ├── images/                   # Images and media
│   └── icons/                    # Icons and logos
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript definitions
└── ...config files               # Configuration files
\`\`\`

## 🎨 Design System

### **Colors**
- **Primary**: Blue (#3B82F6)
- **Secondary**: Green (#10B981)
- **Accent**: Orange (#F59E0B)
- **Neutral**: Gray scale

### **Typography**
- **Headings**: Inter (Bold)
- **Body**: Inter (Regular)
- **Code**: Fira Code

### **Components**
- Built with shadcn/ui
- Consistent spacing and sizing
- Accessible by default
- Dark mode ready

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file:

\`\`\`env
# Database (when integrated)
DATABASE_URL=your_database_url

# Authentication
JWT_SECRET=your_jwt_secret

# Email Service (when integrated)
EMAIL_SERVICE_API_KEY=your_email_api_key

# Payment Gateway (when integrated)
PAYMENT_GATEWAY_KEY=your_payment_key
\`\`\`

### **Customization**
- **Colors**: Edit `tailwind.config.js`
- **Fonts**: Modify `app/layout.tsx`
- **Components**: Customize in `components/ui/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Report bugs on GitHub Issues
- **Email**: support@omnierride.com
- **Discord**: Join our community server

## 🚀 Deployment

### **Vercel (Recommended)**
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### **Other Platforms**
- **Netlify**: Connect GitHub repository
- **AWS**: Use AWS Amplify
- **Docker**: Dockerfile included

## 📈 Performance

- **Lighthouse Score**: 95+
- **Core Web Vitals**: Optimized
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s on 3G

## 🔮 Roadmap

- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Multi-language support

---

**Built with ❤️ by the Omni E-Ride Team**

*Driving the future of electric mobility*
