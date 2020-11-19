import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Logo from './images/pokemon-png-logo.png'



export default function App() {
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {
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
      <View style={{backgroundColor: '#77dd77',}}>
        <StatusBar backgroundColor="#77dd77" barStyle='light-content' />
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
      </View>
 
   );

}


function PokemonShow(item){

  const {name, url} = item.item

  const pokemonNumber = url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/","") 

  console.log(pokemonNumber)

  // const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemonNumber+'.png'

  const imageUrl = 'https://pokeres.bastionbot.org/images/pokemon/'+pokemonNumber+'.png'

  // const img = imageUrl.replace("https://pokeapi.co/api/v2/pokemon-form", "").replace("/", "")

  // console.log(imageUrl)

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
    fontSize: 30,
    alignItems: 'center',
    marginRight: 30,
    color:  '#000' ,
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
    height:120,
    width:120,
    marginBottom: 30,
    marginRight:10,
    marginLeft: 20,
    position: 'relative',

  },
  list:{
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 80
  },
  safeview: {
    backgroundColor:'#000', 
    marginBottom: 150
  },
})