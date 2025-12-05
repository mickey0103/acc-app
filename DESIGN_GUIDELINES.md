# Design Guidelines & UI/UX Decisions

## Design Philosophy

### Premium Hospitality Theme
The app follows a **luxury hospitality aesthetic** with:
- **Warm, inviting color palette** (gold/amber primary) evoking premium hotel experiences
- **Generous spacing** (12-24px rule) for breathing room and elegance
- **Large, elegant typography** for clear hierarchy and readability
- **Smooth micro-interactions** for premium feel
- **High contrast** for accessibility and clarity

### 2025 Design Standards
- **Clean Minimalism**: Remove unnecessary elements, focus on content
- **Large Touch Targets**: Minimum 44x44px for all interactive elements
- **Clear Visual Hierarchy**: Use size, weight, and color to guide attention
- **Consistent Patterns**: Reusable components and patterns throughout

## Color System

### Primary Color: Warm Gold (#F7A63E)
**Rationale**: 
- Evokes luxury and warmth (premium hotels, resorts)
- High contrast for accessibility
- Works well in both light and dark modes
- Distinctive brand identity

**Usage**:
- Primary actions (buttons, links)
- Brand elements
- Accent highlights
- Focus states

### Secondary Color: Sky Blue (#0EA5E9)
**Rationale**:
- Conveys trust and reliability
- Complements warm primary
- Good for informational elements
- Professional yet approachable

**Usage**:
- Secondary actions
- Information badges
- Links and navigation
- Trust indicators

### Semantic Colors
- **Success (Green)**: Confirmations, positive states, completed tasks
- **Warning (Amber)**: Cautions, pending states, attention needed
- **Error (Red)**: Errors, destructive actions, critical alerts
- **Info (Blue)**: Informational messages, neutral states

## Typography System

### Font Hierarchy

#### Display Text (Hero)
- **Size**: 48-60px
- **Weight**: Bold (700)
- **Use**: Landing screens, hero sections
- **Rationale**: Creates impact and draws attention

#### Headings
- **H1**: 36px, Bold - Page titles
- **H2**: 30px, Bold - Section titles
- **H3**: 24px, Semibold - Subsection titles
- **H4**: 20px, Semibold - Card titles

#### Body Text
- **Large**: 18px - Emphasized body text
- **Base**: 16px - Standard body text (default)
- **Small**: 14px - Secondary information
- **Caption**: 12px - Labels, metadata

### Typography Decisions

**Large Sizes for Premium Feel**:
- Body text starts at 16px (not 14px) for better readability
- Headings are significantly larger for clear hierarchy
- Generous line heights (1.5-1.75) for comfortable reading

**System Fonts**:
- Uses native system fonts (SF Pro/Roboto) for:
  - Better performance
  - Native feel
  - Automatic font weight support
  - Accessibility compliance

## Spacing System

### 8px Baseline Grid
All spacing follows an 8px grid for consistency:
- 4px (xs): Tight spacing, icon padding
- 8px (sm): Minimal spacing
- 12px (md): Standard component padding (premium minimum)
- 16px (lg): Card padding, button padding
- 24px (xl): Section padding (premium standard)
- 32px (2xl): Large sections
- 48px (3xl): Page sections

### Premium Spacing Rule (12-24px)
- **Minimum**: 12px for any spacing between elements
- **Standard**: 16-24px for cards and sections
- **Rationale**: Creates breathing room and luxury feel

## Component Design Decisions

### Buttons

**Variants**:
- **Primary**: Main actions (gold background)
- **Secondary**: Alternative actions (blue background)
- **Outline**: Secondary actions (transparent with border)
- **Ghost**: Tertiary actions (transparent, no border)
- **Danger**: Destructive actions (red background)

**Sizes**:
- **Small**: Compact spaces, inline actions
- **Medium**: Standard buttons (default)
- **Large**: Prominent CTAs, hero sections

**Rationale**: Clear hierarchy of actions, consistent with Material 3 and Apple HIG

### Cards

**Design**:
- Rounded corners (16-20px) for modern feel
- Elevation shadows for depth
- Generous padding (16-24px)
- Clear content hierarchy

**Usage**:
- Booking cards
- Investment cards
- Service cards
- Information displays

### Inputs

**Design**:
- Clear labels above inputs
- Focus states with primary color border
- Error states with red border and message
- Helper text support
- Icon support (left/right)

**Rationale**: Clear feedback, accessible, follows platform guidelines

### Badges

**Design**:
- Pill shape (full border radius)
- Semantic colors
- Uppercase text with letter spacing
- Small size for status indicators

**Usage**:
- Booking status
- Key status
- Priority levels
- Availability indicators

## Screen Layout Patterns

### Standard Screen Structure

```
┌─────────────────────────┐
│  Header (24px padding)  │
│  - Title (32px)         │
│  - Subtitle (optional)  │
├─────────────────────────┤
│                         │
│  Content (24px padding) │
│  - Cards (16px gap)     │
│  - Lists (12px gap)     │
│                         │
├─────────────────────────┤
│  Actions (24px padding) │
│  - Primary button       │
│  - Secondary actions    │
└─────────────────────────┘
```

### Card Layout Pattern

```
┌─────────────────────────────┐
│  Card (16-24px padding)      │
│  ┌────────────────────────┐ │
│  │ Header                 │ │
│  │ - Title + Badge        │ │
│  ├────────────────────────┤ │
│  │ Content                │ │
│  │ - Details              │ │
│  │ - Metadata             │ │
│  ├────────────────────────┤ │
│  │ Actions                │ │
│  │ - Primary button       │ │
│  │ - Secondary buttons    │ │
│  └────────────────────────┘ │
└─────────────────────────────┘
```

## Dark Mode Considerations

### Color Adjustments
- **Backgrounds**: Dark gray (#0A0A0A) instead of white
- **Surfaces**: Slightly lighter (#1A1A1A) for cards
- **Text**: Light colors (#FAFAFA) for primary text
- **Borders**: Medium gray (#404040) for subtle separation

### Contrast Ratios
- **Primary text**: 15:1 (WCAG AAA)
- **Secondary text**: 7:1 (WCAG AA)
- **Interactive elements**: 4.5:1 minimum (WCAG AA)

## Micro-interactions & Animations

### Principles
- **Subtle**: Enhance UX without distraction
- **Purposeful**: Every animation has a reason
- **Fast**: 200-300ms for most interactions
- **Smooth**: Use easing curves (ease-in-out)

### Common Interactions
- **Button Press**: Scale down (0.95) with opacity change
- **Card Tap**: Slight elevation increase
- **Screen Transitions**: Slide from right (300ms)
- **Loading States**: Skeleton screens or spinners
- **Success States**: Brief scale animation + color change

## Navigation Patterns

### Bottom Tabs (Primary Navigation)
- **5 tabs maximum** for usability
- **Icons + Labels** for clarity
- **Active state**: Primary color
- **Inactive state**: Tertiary text color

### Stack Navigation (Secondary)
- **Slide from right** for forward navigation
- **Slide to right** for back navigation
- **Modal presentation** for important flows (payment, confirmation)

### Navigation Hierarchy
```
Root Navigator
├── Auth Stack (Sign In, Sign Up, etc.)
├── Guest Stack
│   ├── Guest Tabs (Home, Bookings, Keys, Services, Profile)
│   └── Detail Screens (Booking Detail, etc.)
├── Owner Stack
│   ├── Owner Tabs (Dashboard, Investments, etc.)
│   └── Detail Screens
└── [Other role stacks...]
```

## Accessibility

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for text
- **Touch Targets**: Minimum 44x44px
- **Text Scaling**: Support up to 200% zoom
- **Screen Readers**: Proper labels and hints

### Implementation
- Use semantic HTML elements where possible
- Provide alt text for images
- Ensure keyboard navigation
- Test with screen readers

## Platform-Specific Considerations

### iOS (Apple HIG)
- **SF Pro** font family
- **Large titles** in navigation
- **Haptic feedback** for interactions
- **Native modals** for confirmations
- **Apple Wallet** integration

### Android (Material 3)
- **Roboto** font family
- **Material colors** for system UI
- **Ripple effects** on touch
- **Bottom sheets** for actions
- **Google Wallet** integration

## Performance Best Practices

### Rendering
- Use `FlatList` for long lists
- Implement `React.memo` for expensive components
- Lazy load images
- Optimize re-renders with proper state management

### Animations
- Use `react-native-reanimated` for 60fps animations
- Avoid `Animated` API for complex animations
- Use native driver when possible

### Images
- Optimize image sizes
- Use appropriate formats (WebP for Android, HEIC for iOS)
- Implement lazy loading
- Cache images appropriately

## Testing Considerations

### Visual Testing
- Test on multiple screen sizes (iPhone SE to iPad Pro)
- Test in both light and dark modes
- Test with different text sizes (accessibility)
- Test on both iOS and Android

### Interaction Testing
- Test all navigation flows
- Test form validation
- Test error states
- Test loading states
- Test empty states

## Design Tokens Reference

### Spacing
```typescript
spacing: {
  xs: 4,    // Icon padding
  sm: 8,    // Minimal spacing
  md: 12,   // Component padding (premium minimum)
  lg: 16,   // Card padding
  xl: 24,   // Section padding (premium standard)
}
```

### Border Radius
```typescript
borderRadius: {
  sm: 4,    // Small elements
  md: 8,    // Standard elements
  lg: 12,   // Cards, buttons
  xl: 16,   // Large cards
  full: 9999, // Pills, badges
}
```

### Shadows
```typescript
shadows: {
  sm: { elevation: 1 },  // Subtle elevation
  md: { elevation: 2 },  // Standard cards
  lg: { elevation: 4 },   // Prominent cards
  xl: { elevation: 8 },    // Modals, sheets
}
```

## Conclusion

This design system creates a **premium, accessible, and consistent** user experience across all user roles and flows. Every design decision prioritizes:

1. **User Experience**: Intuitive, fast, delightful
2. **Accessibility**: Inclusive for all users
3. **Brand Identity**: Premium hospitality feel
4. **Platform Consistency**: Native feel on iOS and Android
5. **Maintainability**: Scalable, reusable components

