import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button } from '../../components/common';

const featuredQuestions = [
  "Where do I park?",
  "Can I get late checkout?",
  "Best things to do nearby?",
  "How do I use the heater?",
  "How do I unlock the cabin?",
];

export const ContactSupportScreen: React.FC = () => {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');

  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@example.com?subject=Support Request');
  };

  const handleChat = () => {
    // TODO: Open chat interface
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Hotline */}
      <Card style={styles.card} elevated>
        <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
          Call Support
        </Text>
        <Text style={[styles.cardDescription, { color: theme.colors.text.secondary }]}>
          Speak directly with our support team
        </Text>
        <Button
          title="Call +1 (234) 567-8900"
          onPress={handleCall}
          fullWidth
          style={styles.actionButton}
        />
      </Card>

      {/* Email Support */}
      <Card style={styles.card} elevated>
        <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
          Email Support
        </Text>
        <Text style={[styles.cardDescription, { color: theme.colors.text.secondary }]}>
          Send us an email and we'll respond within 24 hours
        </Text>
        <Button
          title="Send Email"
          variant="outline"
          onPress={handleEmail}
          fullWidth
          style={styles.actionButton}
        />
      </Card>

      {/* Chat / In-App Messaging */}
      <Card style={styles.card} elevated>
        <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
          Instant Chat
        </Text>
        <Text style={[styles.cardDescription, { color: theme.colors.text.secondary }]}>
          Get instant answers to common questions
        </Text>

        {/* Featured Questions */}
        <View style={styles.questionsSection}>
          <Text style={[styles.questionsTitle, { color: theme.colors.text.primary }]}>
            Quick Questions
          </Text>
          {featuredQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.questionButton, { backgroundColor: theme.colors.surface }]}
              onPress={() => setMessage(question)}
            >
              <Text style={[styles.questionText, { color: theme.colors.text.primary }]}>
                {question}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Message Input */}
        <View style={styles.messageSection}>
          <Text style={[styles.inputLabel, { color: theme.colors.text.secondary }]}>
            Your Message
          </Text>
          <TextInput
            style={[
              styles.messageInput,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border,
              },
            ]}
            placeholder="Type your question here..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />
          <Button
            title="Send Message"
            onPress={handleChat}
            fullWidth
            style={styles.sendButton}
            disabled={!message.trim()}
          />
        </View>
      </Card>

      {/* History / Tickets */}
      <Card style={styles.card} elevated>
        <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
          Support History
        </Text>
        <Text style={[styles.emptyText, { color: theme.colors.text.tertiary }]}>
          No previous support requests
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  card: {
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  actionButton: {
    marginTop: 8,
  },
  questionsSection: {
    marginTop: 16,
    marginBottom: 16,
  },
  questionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  questionButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 14,
  },
  messageSection: {
    marginTop: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  messageInput: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  sendButton: {
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
  },
});

