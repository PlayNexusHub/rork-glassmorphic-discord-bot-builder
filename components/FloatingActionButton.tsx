import { LinearGradient } from 'expo-linear-gradient';
import { Plus, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import colors from '@/constants/colors';

interface FABAction {
  icon: React.ReactNode;
  onPress: () => void;
  color: string;
}

interface FloatingActionButtonProps {
  actions: FABAction[];
}

export default function FloatingActionButton({ actions }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const actionAnimations = useRef(
    actions.map(() => ({
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.parallel([
      Animated.spring(rotation, {
        toValue,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      ...actionAnimations.map((anim, index) =>
        Animated.parallel([
          Animated.spring(anim.translateY, {
            toValue: toValue * -(60 * (index + 1)),
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue,
            duration: 200,
            delay: index * 50,
            useNativeDriver: true,
          }),
          Animated.spring(anim.scale, {
            toValue,
            friction: 8,
            tension: 40,
            delay: index * 50,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    setIsOpen(!isOpen);
  };

  const handleActionPress = (action: FABAction) => {
    toggleMenu();
    setTimeout(() => action.onPress(), 300);
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container} pointerEvents="box-none">
      {actionAnimations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.actionButton,
            {
              transform: [
                { translateY: anim.translateY },
                { scale: anim.scale },
              ],
              opacity: anim.opacity,
            },
          ]}
        >
          <Pressable
            onPress={() => handleActionPress(actions[index])}
            style={styles.actionPressable}
          >
            <LinearGradient
              colors={[actions[index].color, actions[index].color + 'CC']}
              style={styles.actionGradient}
            >
              {actions[index].icon}
            </LinearGradient>
          </Pressable>
        </Animated.View>
      ))}

      <Animated.View
        style={[
          styles.mainButton,
          {
            transform: [{ rotate: rotateInterpolate }, { scale }],
          },
        ]}
      >
        <Pressable
          onPress={toggleMenu}
          onPressIn={() => {
            Animated.spring(scale, {
              toValue: 0.9,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(scale, {
              toValue: 1,
              friction: 3,
              tension: 40,
              useNativeDriver: true,
            }).start();
          }}
          style={styles.mainPressable}
        >
          <LinearGradient
            colors={colors.gradient.primary as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mainGradient}
          >
            {isOpen ? (
              <X size={28} color={colors.dark.text} />
            ) : (
              <Plus size={28} color={colors.dark.text} />
            )}
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  mainButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: colors.neon.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  mainPressable: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    overflow: 'hidden',
  },
  mainGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionPressable: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
    overflow: 'hidden',
  },
  actionGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
