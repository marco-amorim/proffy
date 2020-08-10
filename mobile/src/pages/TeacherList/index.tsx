import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

function TeacherList() {
	const [areFiltersVisible, setAreFiltersVisible] = useState(false);
	const [teachers, setTeachers] = useState([]);
	const [subject, setSubject] = useState('');
	const [week_day, setWeekDay] = useState('');
	const [time, setTime] = useState('');

	function handleToggleFiltersVisible() {
		setAreFiltersVisible(!areFiltersVisible);
	}

	async function handleFiltersSubmit() {
		const response = await api.get('classes', {
			params: {
				subject,
				week_day,
				time,
			},
		});
		setAreFiltersVisible(false);
		setTeachers(response.data);
	}

	return (
		<View style={styles.container}>
			<PageHeader
				title="Proffys disponíveis"
				headerRight={
					<BorderlessButton onPress={handleToggleFiltersVisible}>
						<Feather name="filter" size={20} color="#FFF" />
					</BorderlessButton>
				}
			>
				{areFiltersVisible && (
					<View style={styles.searchform}>
						<Text style={styles.label}>Matéria</Text>
						<TextInput
							placeholderTextColor="#c1bccc"
							style={styles.input}
							placeholder="Qual a matéria?"
							value={subject}
							onChangeText={(text) => setSubject(text)}
						/>

						<View style={styles.inputGroup}>
							<View style={styles.inputBlock}>
								<Text style={styles.label}>Dia da semana</Text>
								<TextInput
									placeholderTextColor="#c1bccc"
									style={styles.input}
									placeholder="Qual o dia?"
									value={week_day}
									onChangeText={(text) => setWeekDay(text)}
								/>
							</View>

							<View style={styles.inputBlock}>
								<Text style={styles.label}>Horário</Text>
								<TextInput
									placeholderTextColor="#c1bccc"
									style={styles.input}
									placeholder="Qual horário?"
									value={time}
									onChangeText={(text) => setTime(text)}
								/>
							</View>
						</View>

						<RectButton
							onPress={handleFiltersSubmit}
							style={styles.submitButton}
						>
							<Text style={styles.submitButtonText}>Filtrar</Text>
						</RectButton>
					</View>
				)}
			</PageHeader>

			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
				}}
			>
				{teachers.map((teacher: Teacher) => (
					<TeacherItem key={teacher.id} teacher={teacher} />
				))}
			</ScrollView>
		</View>
	);
}

export default TeacherList;
