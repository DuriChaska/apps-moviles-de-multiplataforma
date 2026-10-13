import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter }  from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { createCard, updateCard } from '../../services/cards';
import { CardItem } from '../../types/CardItem';

export default function FormScreen() {
    const { card } = useLocalSearchParams<{ card?: string }>();
    const editing: CardItem | null = card ? JSON.parse(card) : null;
    const router = useRouter();

    const [title, setTitle] = useState(editing?.title ?? '');
    const [description, setDescription] = useState(editing?.description ?? '');
    const [imageUri, setImageUri] = useState<string | null>(editing?.image ?? null);
    const [saving, setSaving] = useState(false);

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería de fotos.');
                return;
            }
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });
        if (!result.cancelled && result.assets[0]) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!title.trim() || !description.trim() || !imageUri) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);

            const isNewImage = imageUri !== editing?.image;
            if (isNewImage) {
                if (Platform.OS === 'web') {
                    const response = await fetch(imageUri);
                    const blob = await response.blob();
                    formData.append('image', blob, 'photo.jpg');
                } else {