import React, { useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  FlatList
} from 'react-native'

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface ISkill {
  id: string;
  name: string;
}

export function Home() {
  const [ newSkill, setNewSkill ] = useState('');
  const [ mySkills, setMySkills ] = useState<ISkill[]>([]);
  const [ gretting, setGredding ] = useState('');

  const handleAddNewSkill = () => {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(prevState => [...prevState, data])
  }

  const handleRemoveSkill = (id: string) => {
    setMySkills(prevState => prevState.filter(skill => skill.id !== id))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    setGredding(currentHour < 12 ? 'Good Morning!' : 'Good Night!')
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, Jhonatan
      </Text>

      <Text style={styles.gretting}>
        {gretting}
      </Text>

      <TextInput 
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button 
        onPress={handleAddNewSkill}
        activeOpacity={0.7}
        title="Add"
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList 
        data={mySkills} 
        keyExtractor={item => item.id} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SkillCard  
            skill={item.name} 
            activeOpacity={0.7}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  gretting: {
    color: '#fff'
  }
})