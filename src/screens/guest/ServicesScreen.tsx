// This file is replaced by ServicesScreenEnhanced.tsx
// Keeping for backward compatibility
export { ServicesScreenEnhanced as ServicesScreen } from './ServicesScreenEnhanced';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    width: '47%',
    padding: 20,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  requestCard: {
    padding: 20,
  },
  requestTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  requestButton: {
    marginTop: 8,
  },
});

