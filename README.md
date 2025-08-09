# RAHi - AI Travel Planner 🌍✈️

RAHi is an intelligent travel planning application that uses AI to create personalized itineraries based on your preferences. Plan your perfect trip with comprehensive features including hotel recommendations, weather information, budget tracking, and much more!

## 🚀 Features

### Core Features
- **AI-Powered Trip Planning**: Generate customized itineraries using Google's Gemini AI
- **Smart Hotel Recommendations**: Get hotel suggestions with photos, ratings, and pricing
- **Interactive Places to Visit**: Detailed day-by-day itinerary with place descriptions and timings
- **Google Authentication**: Secure login with Google OAuth

### New Enhanced Features ✨

#### 🌤️ Weather Integration
- Real-time weather information for your destination
- Weather forecast to help you pack appropriately
- Visual weather icons and detailed conditions

#### 💰 Budget Tracker
- Track your expenses during the trip
- Categorize expenses (Accommodation, Food, Transportation, etc.)
- Compare actual spending with estimated budget
- Local storage to persist your expense data

#### 🎒 Smart Packing List
- AI-generated packing suggestions based on destination and weather
- Interactive checklist with progress tracking
- Add custom items to your packing list
- Categorized items (Documents, Clothing, Electronics, etc.)

#### 🚗 Transportation Guide
- Local transportation options and costs
- Booking links for rideshare and car rental services
- Public transit information
- Transportation tips and emergency contacts

#### 🌍 Local Information Hub
- Emergency contact numbers
- Cultural tips and etiquette
- Practical information (power outlets, internet, etc.)
- Currency and language information

#### 💱 Currency Converter
- Real-time currency conversion
- Quick reference conversion table
- Support for major world currencies
- Destination currency auto-detection

#### 📤 Trip Sharing & Export
- Generate shareable links for your itinerary
- Export trip data as PDF or JSON
- Share on social media (WhatsApp, Twitter, Email)
- Offline access capabilities

#### 📱 Enhanced My Trips
- Advanced search and filtering
- Trip statistics and analytics
- Duplicate trips for similar destinations
- Improved trip cards with detailed information

#### 🧭 Smart Navigation
- Floating navigation menu for easy section jumping
- Smooth scrolling between trip sections
- Active section highlighting

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Radix UI Components
- **AI**: Google Gemini API
- **Maps**: Google Places API
- **Authentication**: Google OAuth
- **Database**: Firebase Firestore
- **Weather**: OpenWeatherMap API
- **PDF Generation**: jsPDF, html2canvas
- **Icons**: Lucide React, React Icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rahi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
   VITE_GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
   VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 API Keys Setup

### Required APIs:
1. **Google Places API** - For location search and place photos
2. **Google Gemini API** - For AI-powered trip generation
3. **Google OAuth** - For user authentication

### Optional APIs:
1. **OpenWeatherMap API** - For weather information (free tier available)

## 🎯 Usage

1. **Sign in** with your Google account
2. **Create a new trip** by providing:
   - Destination
   - Number of days
   - Budget preference
   - Travel companions
3. **Generate your itinerary** using AI
4. **Explore enhanced features**:
   - Check weather conditions
   - Track your budget
   - Use the packing checklist
   - Get local information
   - Convert currencies
5. **Share your trip** with friends and family
6. **Manage your trips** in the My Trips section

## 🔄 Recent Updates

### Hotel Recommendation Fix
- ✅ Fixed data structure compatibility issues
- ✅ Added error handling for API calls
- ✅ Improved fallback image handling
- ✅ Enhanced hotel card design with amenities

### New Feature Additions
- ✅ Weather integration with real-time data
- ✅ Comprehensive budget tracking system
- ✅ AI-powered packing list generator
- ✅ Local transportation guide
- ✅ Cultural and practical information hub
- ✅ Currency converter with live rates
- ✅ Advanced trip sharing capabilities
- ✅ Enhanced My Trips with search and filters
- ✅ Smart navigation system

## 🚀 Deployment

The app is configured for deployment on Vercel with the included `vercel.json` configuration.

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google AI for Gemini API
- Google Maps Platform for Places API
- OpenWeatherMap for weather data
- Firebase for backend services
- All the amazing open-source libraries used in this project

## Contact 📧

For questions or suggestions, reach out at [annifind010@gmail.com](mailto:annifind010@gmail.com).

---

**Happy Traveling with RAHi! 🌟**