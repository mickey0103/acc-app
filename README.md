# Accommodation & Real-Estate Mobile App

A modern, premium React Native mobile application for accommodation and real estate management, supporting multiple user roles (Guest, Owner, Housekeeping, Maintenance).

## 🎨 Design System

### Design Philosophy
- **Premium Hospitality Aesthetic**: Warm, inviting tones with luxury feel
- **2025 Design Standards**: Clean minimalism, large elegant typography
- **Material 3 & Apple HIG**: Consistent with platform guidelines
- **Dark Mode Support**: Full light/dark theme support
- **High Contrast**: WCAG AA+ accessibility standards

### Color Palette

#### Primary Colors (Warm Gold/Amber)
- Primary 500: `#F7A63E` - Main brand color
- Range: 50 (lightest) to 900 (darkest)

#### Secondary Colors (Sky Blue)
- Secondary 500: `#0EA5E9` - Trust and reliability

#### Semantic Colors
- Success: Green (`#22C55E`)
- Warning: Amber (`#F59E0B`)
- Error: Red (`#EF4444`)
- Info: Blue (`#3B82F6`)

### Typography

- **Font Family**: System fonts (SF Pro on iOS, Roboto on Android)
- **Font Sizes**: 12px (xs) to 60px (6xl)
- **Line Heights**: 1.2 (tight) to 1.75 (relaxed)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing System

- **Base Unit**: 8px grid system
- **Premium Spacing**: 12-24px for cards and sections
- **Screen Padding**: 16-24px
- **Component Padding**: 12-24px

### Component Library

#### Core Components
- `Button`: Multiple variants (primary, secondary, outline, ghost, danger)
- `Card`: Elevated surfaces with customizable padding
- `Input`: Form inputs with labels, errors, and icons
- `Badge`: Status indicators with semantic colors

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── common/         # Common components (Button, Card, Input, Badge)
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── guest/         # Guest flow screens
│   ├── owner/         # Owner flow screens
│   ├── maintenance/   # Maintenance flow screens
│   └── housekeeping/   # Housekeeping flow screens
├── navigation/         # Navigation configuration
├── store/             # Zustand state management
├── theme/             # Design system (colors, typography, spacing)
├── types/             # TypeScript type definitions
└── data/              # Mock data for development
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- React Native development environment set up
- iOS: Xcode and CocoaPods
- Android: Android Studio and SDK

### Installation

```bash
# Install dependencies
npm install

# iOS only - Install pods
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 🏗️ Architecture

### State Management
- **Zustand**: Lightweight state management
- **Persistent Storage**: AsyncStorage for auth state
- **Store Structure**:
  - `authStore`: User authentication and profile
  - `bookingStore`: Bookings, keys, service requests
  - `investmentStore`: Investments and ROI data
  - `maintenanceStore`: Maintenance tickets and jobs
  - `housekeepingStore`: Housekeeping tasks and requests

### Navigation
- **React Navigation v6**: Native stack and bottom tabs
- **Type-Safe Navigation**: Full TypeScript support
- **Role-Based Routing**: Automatic navigation based on user role

### Theme System
- **Dynamic Theming**: Light/dark mode support
- **System Preference**: Auto-detects system theme
- **Persistent**: Saves user theme preference

## 👥 User Flows

### Guest Flow
1. **Home/Dashboard**: Overview of upcoming stays, quick actions
2. **Bookings**: Current, upcoming, and past bookings
3. **Keys**: Digital door keys for active stays
4. **Services**: Housekeeping, maintenance, upgrades, concierge
5. **Profile**: Account settings and preferences
6. **Subscriptions**: Subscription-based stays (optional)

### Owner Flow
1. **Dashboard**: KPIs (Revenue, Occupancy, Expenses, ROI)
2. **Investments**: List of owned units with performance metrics
3. **Approvals**: Maintenance request approvals
4. **Marketplace**: Browse and invest in new properties
5. **Profile**: Account management

### Maintenance Flow
1. **Tickets**: Maintenance requests with quote workflow
2. **Jobs In Progress**: Active maintenance jobs
3. **Rooms**: Room status management
4. **Profile**: Account settings

### Housekeeping Flow
1. **Rooms**: Cleaning tasks and room status
2. **Maintenance Requests**: Report issues discovered during cleaning
3. **History**: Room cleaning history
4. **Profile**: Account settings

## 🎯 Key Features

### Authentication
- Sign In / Sign Up
- Role Selection (Guest, Owner, Housekeeping, Maintenance)
- Forgot Password / Reset Password
- Magic Link / One-time Code (planned)

### Digital Keys
- NFC-enabled door access
- Apple Wallet / Google Wallet integration
- Real-time key status
- Multi-room support

### Service Requests
- Housekeeping requests
- Maintenance reporting
- Stay upgrades (early check-in, late checkout)
- AI Concierge chat

### Investment Management (Owner)
- ROI tracking
- Investment marketplace
- Approval workflows
- Balance and payout management

## 🔧 Development Guidelines

### Component Development
1. Use theme hooks: `useTheme()` for all styling
2. Follow spacing system: Use `theme.spacingSemantic` values
3. Support dark mode: Test in both light and dark themes
4. Type safety: Use TypeScript for all components

### Screen Development
1. Use navigation types: Import from `navigation/types`
2. Access stores: Use Zustand hooks from `store/`
3. Mock data: Use `data/mockData.ts` for development
4. Responsive: Test on multiple screen sizes

### Styling Best Practices
- Use theme colors, never hardcode colors
- Follow 8px spacing grid
- Use semantic spacing names
- Support both light and dark modes
- Test accessibility (contrast ratios)

## 📱 Platform-Specific Considerations

### iOS
- SF Pro font family
- Apple Wallet integration
- Haptic feedback
- Native calendar sync

### Android
- Roboto font family
- Google Wallet integration
- Material Design 3
- Native calendar sync

## 🧪 Testing

```bash
# Run tests
npm test

# Lint code
npm run lint
```

## 📦 Dependencies

### Core
- React Native 0.73
- React Navigation 6
- Zustand 4
- React Native Gesture Handler
- React Native Reanimated

### UI/UX
- React Native Vector Icons
- React Native Linear Gradient
- React Native Calendars

### Utilities
- AsyncStorage
- React Native Image Picker
- React Native Maps

## 🚧 Roadmap

### Phase 1 (Current)
- ✅ Design system implementation
- ✅ Core component library
- ✅ Authentication flow
- ✅ Guest flow screens
- ✅ Navigation structure

### Phase 2
- [ ] Owner flow completion
- [ ] Maintenance flow completion
- [ ] Housekeeping flow completion
- [ ] Digital key NFC integration
- [ ] Wallet pass generation

### Phase 3
- [ ] Real-time notifications
- [ ] Chat/Support integration
- [ ] Calendar sync
- [ ] Payment integration
- [ ] AI Concierge implementation

## 📄 License

Proprietary - All rights reserved

## 👨‍💻 Development Team

Built with ❤️ using React Native and modern design principles.

---

**Note**: This is a comprehensive starter template. Replace mock data with actual API integrations and implement missing features according to your requirements.

