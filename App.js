import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import url from './Services/api'

export default function App() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon', {
      method: 'GET',
      headers: {
        'Accept' : 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setPokemons(data.results)
      })
  }, [])
  return (
    <SafeAreaView  style={{marginTop: 50}}>
      <FlatList 
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.name}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={PokemonShow}
        style={{padding:10}}

      />
    </SafeAreaView>
  );
}


function PokemonShow(item){

  const {name, url} = item.item

  const pokemonNumber = url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/","") 

  console.log(pokemonNumber)

  const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemonNumber+'.png'

  // const img = imageUrl.replace("https://pokeapi.co/api/v2/pokemon-form", "").replace("/", "")

  console.log(imageUrl)

  return (
    <View style={styles.container}>
      <Image style={{width:100, height:100}} source={{uri: imageUrl}}/>
      <Text style={{fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex
  }
})