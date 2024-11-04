import React, { useRef, useState } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const HelpScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '¿Cómo puedo solicitar un préstamo a través de la app?',
      description:
        "Toque 'Quiero mi préstamo', elija la oferta que más le guste, toque 'Lo quiero ahora', y en el instante un Asesor estará con vos para verificar sus datos, firmar y proseguir con la liquidación. ¡Así de fácil!",
      active: false,
    },
    {
      id: 2,
      question: '¿Cuánto tiempo tarda en aprobarse un préstamo?',
      description:
        'Su solicitud será revisada y aprobada en un plazo de un día hábil. Recibirá una notificación en la app y un Whatsapp con el resultado.',
      active: false,
    },
    {
      id: 3,
      question: '¿Cómo puedo ver el estado de mi solicitud de préstamo?',
      description:
        "Puede ver el estado de su solicitud en la sección 'Mis Préstamos' de la app (la Casa Celeste de Argenpesos en el centro de la barra de abajo). También recibirá notificaciones en tiempo real sobre el avance de su solicitud.",
      active: false,
    },
    {
      id: 4,
      question: '¿Cómo puedo pagar mi préstamo?',
      description:
        "Puede pagar su préstamo a través de la app tocando el botón 'Pagar cuota' en la sección 'Mis Préstamos' (la Casa Celeste de Argenpesos en el centro de la barra de abajo). También puede realizar el pago en cualquiera de nuestras sucursales o medios de pago.",
      active: false,
    },
    {
      id: 5,
      question: '¿Qué sucede si no puedo pagar mi préstamo a tiempo?',
      description: 'Si no puede pagar su préstamo a tiempo, se generarán cargos por mora.',
      active: false,
    },
  ]);

  const handleChangeStatus = (id: number) => {
    const updateActive = questions.find(question => question.id === id);
    if (updateActive) {
      updateActive.active = !updateActive.active;
      setQuestions([...questions]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Image source={images.help_icon} style={styles.helpIcon} />
        <Text style={styles.title}>Preguntas frecuentes</Text>
        <View style={styles.containerQuestions}>
          {questions.map(question => {
            return (
              <Pressable key={question.id} onPress={() => handleChangeStatus(question.id)}>
              <View style={styles.containerQuestion} >
                <View style={styles.containerHeaderQuestion}>
                  <Text style={styles.titleQuestion}>{question.question}</Text>
                  
                    <Image
                      source={question.active ? images.arrow_top_blue : images.arrow_bottom_blue}
                      style={styles.arrowIcon}
                    />
                </View>

                {question.active && (
                  <Text style={styles.descriptionQuestion}>{question.description}</Text>
                )}
              </View>
              </Pressable>

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
    backgroundColor: colors.white,
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
  helpIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: colors.green2,
    borderRadius: 30,
  },
  title: {
    color: colors.blue,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    marginTop: 14,
  },
  containerQuestions: {
    marginTop: 37,
    paddingHorizontal: 20,
    marginBottom: 50,
    gap: 17,
  },
  containerQuestion: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 18,
    gap: 10,
  },
  containerHeaderQuestion: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  titleQuestion: {
    color: colors.blue,
    fontSize: 19,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 23,
    flex: 1,
  },
  arrowIcon: {
    width: 24,
    height: 14,
  },
  descriptionQuestion: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 20,
  },
});

export default HelpScreen;
