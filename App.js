import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Logo from './images/pokemon-png-logo.png'

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
      <Image
      source={Logo}
      style={styles.logo}
      />
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

  // const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemonNumber+'.png'

  const imageUrl = 'https://pokeres.bastionbot.org/images/pokemon/'+pokemonNumber+'.png'

  // const img = imageUrl.replace("https://pokeapi.co/api/v2/pokemon-form", "").replace("/", "")

  console.log(imageUrl)

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: imageUrl}}/>
      <Text style={styles.pokeName}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    backgroundColor:  '#77dd77',
    margin: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'

  },
  pokeName: {
    fontSize: 20,
    alignItems: 'center',
    position: 'relative',
    fontWeight: 'bold'
  },
  logo:{
    height:100,
    width:280,
    marginLeft: 60,
    marginBottom: 50
  },
  image:{
    height:130,
    width:130,
    marginBottom: 70,
    marginRight:50,
    position: 'relative'
  }
})