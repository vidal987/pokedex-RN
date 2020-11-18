import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Logo from './images/pokemon-png-logo.png'
import * as Font from 'expo-font';


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
    <SafeAreaView  style={styles.safeview}>
       <StatusBar backgroundColor="#77dd77" barStyke="dark-content" />
      <Image
      source={Logo}
      style={styles.logo}
      />
      <FlatList 
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.name}
        renderItem={PokemonShow}
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
      <View style={styles.container2}>
      <Image style={styles.image} source={{uri: imageUrl}}/>
      <Text style={styles.pokeName}>{name}</Text>
      </View>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    
  },
  container2: {
    flexDirection: 'row',
    height: 100,
    backgroundColor:  '#77dd77',
    margin: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeName: {
    fontSize: 20,
    alignItems: 'center',
    position: 'relative',
    fontWeight: 'bold'
  },
  logo:{
    marginTop: 50,
    height:90,
    width:280,
    marginLeft: 60,
    marginBottom: 20
  },
  image:{
    height:130,
    width:130,
    marginBottom: 70,
    marginRight:50,
    position: 'relative',

  },
  list:{
    
  },
  safeview: {
    backgroundColor:'#77dd77', 
    marginBottom: 150
  },
})