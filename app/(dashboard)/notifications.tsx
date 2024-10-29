import React, { useRef, useState, useEffect } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { axiosInstance } from '@/store/actions/auth';

interface NotificationProps {
  create: string;
  id: number;
  isPush: boolean;
  message: string;
  saveInHistory: boolean;
  scheduledAt: string;
  title: string;
  update: string;
}

const NotificationsScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('/api/notifications/appNotification');
      if (response.data.ok) {
        setNotifications(response.data.notifications);
        console.log(response.data.notifications);
      } else {
        console.error('Error al obtener las notificaciones:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <Text style={styles.title}>Notificaciones</Text>
        <View style={styles.conteinerNotifications}>
          {notifications.map(item => {
            return (
              <View key={item.id} style={styles.notification}>
                <View>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationDate}>{item.scheduledAt}</Text>
                </View>
                <Image source={images.arrow_back_icon} style={styles.arrowBlack} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.gray,
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
  },
  back: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnBack: {
    display: 'flex',
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    gap: 9,
    marginVertical: 24,
  },
  arrow: {
    width: 14,
    height: 24,
  },
  btnBackText: {
    color: colors.blue,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 2,
  },
  title: {
    color: colors.texts,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    marginTop: 14,
    marginBottom: 42,
  },
  conteinerNotifications: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 100,
  },
  notification: {
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 16,
  },
  notificationTitle: {
    color: colors.texts,
    fontFamily: fonts.gotham.semiBold,
    fontSize: 16,
    marginBottom: 5,
  },
  notificationDate: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontSize: 14,
  },
  arrowBlack: {
    width: 14,
    height: 24,
  },
});

export default NotificationsScreen;
