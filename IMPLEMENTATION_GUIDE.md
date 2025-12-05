# Implementation Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. iOS Setup

```bash
cd ios && pod install && cd ..
```

### 3. Run the App

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
accommendation/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── common/         # Button, Card, Input, Badge
│   ├── screens/            # Screen components organized by role
│   │   ├── auth/          # Authentication screens
│   │   ├── guest/         # Guest flow screens
│   │   ├── owner/         # Owner flow screens
│   │   ├── maintenance/   # Maintenance flow screens
│   │   └── housekeeping/   # Housekeeping flow screens
│   ├── navigation/         # Navigation configuration
│   │   ├── types.ts       # Type-safe navigation types
│   │   ├── RootNavigator.tsx
│   │   └── [Role]Navigator.tsx
│   ├── store/             # Zustand state management
│   │   ├── authStore.ts
│   │   ├── bookingStore.ts
│   │   ├── investmentStore.ts
│   │   ├── maintenanceStore.ts
│   │   └── housekeepingStore.ts
│   ├── theme/             # Design system
│   │   ├── colors.ts      # Color palette
│   │   ├── typography.ts  # Typography system
│   │   ├── spacing.ts     # Spacing system
│   │   ├── theme.ts       # Theme configuration
│   │   └── ThemeProvider.tsx
│   ├── types/             # TypeScript definitions
│   │   └── index.ts
│   └── data/              # Mock data
│       └── mockData.ts
├── App.tsx                # Root component
├── index.js               # Entry point
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

## Component Usage Examples

### Button Component

```tsx
import { Button } from '@components/common';

// Primary button
<Button
  title="Sign In"
  onPress={handleSignIn}
  variant="primary"
  size="medium"
  fullWidth
/>

// Outline button
<Button
  title="Cancel"
  onPress={handleCancel}
  variant="outline"
/>

// With loading state
<Button
  title="Submit"
  onPress={handleSubmit}
  loading={isLoading}
/>
```

### Card Component

```tsx
import { Card } from '@components/common';

<Card elevated padding="large">
  <Text>Card content</Text>
</Card>
```

### Input Component

```tsx
import { Input } from '@components/common';

<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  error={errors.email}
/>
```

### Badge Component

```tsx
import { Badge } from '@components/common';

<Badge
  label="ACTIVE"
  variant="success"
  size="medium"
/>
```

## Theme Usage

### Using Theme in Components

```tsx
import { useTheme } from '@theme/ThemeProvider';

const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: theme.spacingSemantic.screenHorizontal,
      }}
    >
      <Text
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.textStyles.h1.fontSize,
          fontWeight: theme.textStyles.h1.fontWeight,
        }}
      >
        Hello World
      </Text>
    </View>
  );
};
```

### Theme-Aware Styling

```tsx
const styles = StyleSheet.create({
  container: {
    // Use theme in component
  },
});

const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacingSemantic.cardPadding,
        },
      ]}
    >
      {/* Content */}
    </View>
  );
};
```

## State Management

### Using Zustand Stores

```tsx
import { useAuthStore } from '@store';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const handleLogin = async () => {
    await login('email@example.com', 'password');
  };

  return (
    <View>
      {isAuthenticated ? (
        <Text>Welcome, {user?.firstName}</Text>
      ) : (
        <Button title="Sign In" onPress={handleLogin} />
      )}
    </View>
  );
};
```

### Creating New Stores

```tsx
import { create } from 'zustand';

interface MyStore {
  data: string[];
  setData: (data: string[]) => void;
}

export const useMyStore = create<MyStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
```

## Navigation

### Type-Safe Navigation

```tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GuestStackParamList } from '@navigation/types';

type NavigationProp = NativeStackNavigationProp<GuestStackParamList, 'Tabs'>;

const MyScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigate = () => {
    navigation.navigate('BookingDetail', { bookingId: '123' });
  };

  return <Button title="View Booking" onPress={handleNavigate} />;
};
```

### Adding New Screens

1. Create screen component in appropriate folder
2. Add route to navigation types
3. Add screen to navigator

```tsx
// 1. Create screen
// src/screens/guest/NewScreen.tsx
export const NewScreen: React.FC = () => {
  // Screen implementation
};

// 2. Add to types
// src/navigation/types.ts
export type GuestStackParamList = {
  // ... existing routes
  NewScreen: undefined;
};

// 3. Add to navigator
// src/navigation/GuestNavigator.tsx
<Stack.Screen name="NewScreen" component={NewScreen} />
```

## Screen Development Checklist

- [ ] Use `useTheme()` hook for all styling
- [ ] Support both light and dark modes
- [ ] Use semantic spacing values
- [ ] Implement proper TypeScript types
- [ ] Add loading states
- [ ] Add error states
- [ ] Add empty states
- [ ] Test on multiple screen sizes
- [ ] Test navigation flow
- [ ] Add proper error handling

## Best Practices

### 1. Component Organization
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance

### 2. Styling
- Always use theme values, never hardcode colors
- Use semantic spacing names
- Support dark mode in all components
- Test with different text sizes (accessibility)

### 3. State Management
- Use Zustand for global state
- Use local state for component-specific state
- Keep stores focused and small
- Use TypeScript for type safety

### 4. Performance
- Use `FlatList` for long lists
- Implement `React.memo` for expensive components
- Lazy load images
- Optimize re-renders

### 5. Accessibility
- Add proper labels to inputs
- Ensure minimum touch target sizes (44x44px)
- Test with screen readers
- Maintain proper color contrast

## Common Patterns

### Form Handling

```tsx
const [formData, setFormData] = useState({
  email: '',
  password: '',
});
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
  const newErrors: Record<string, string> = {};
  if (!formData.email) newErrors.email = 'Email is required';
  if (!formData.password) newErrors.password = 'Password is required';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (validate()) {
    // Submit form
  }
};
```

### Loading States

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleAction = async () => {
  setIsLoading(true);
  try {
    await performAction();
  } catch (error) {
    // Handle error
  } finally {
    setIsLoading(false);
  }
};

<Button
  title="Submit"
  onPress={handleAction}
  loading={isLoading}
  disabled={isLoading}
/>
```

### Empty States

```tsx
{data.length === 0 ? (
  <Card style={styles.emptyCard}>
    <Text style={styles.emptyText}>No items found</Text>
  </Card>
) : (
  <FlatList data={data} renderItem={renderItem} />
)}
```

## Testing

### Component Testing

```tsx
import { render } from '@testing-library/react-native';
import { Button } from '@components/common';

test('renders button with title', () => {
  const { getByText } = render(
    <Button title="Test" onPress={() => {}} />
  );
  expect(getByText('Test')).toBeTruthy();
});
```

### Navigation Testing

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

test('navigates to detail screen', () => {
  const { getByText } = render(
    <NavigationContainer>
      <MyScreen />
    </NavigationContainer>
  );
  fireEvent.press(getByText('View Details'));
  // Assert navigation occurred
});
```

## Troubleshooting

### Common Issues

1. **TypeScript errors**: Run `npm install` to ensure all types are installed
2. **Navigation errors**: Check that screen is registered in navigator
3. **Theme not working**: Ensure component is wrapped in ThemeProvider
4. **Store not updating**: Check that you're using the store hook correctly

### Debugging

- Use React Native Debugger
- Check Metro bundler logs
- Use console.log for state debugging
- Use React DevTools for component inspection

## Next Steps

1. Replace mock data with API calls
2. Implement missing screen features
3. Add error boundaries
4. Implement push notifications
5. Add analytics
6. Set up CI/CD pipeline
7. Add E2E tests
8. Optimize performance
9. Add accessibility improvements
10. Prepare for App Store/Play Store submission

