import React, { useState, useEffect } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Card, CardItem, Body, Right, Switch } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import {Image} from 'react-native-remote-svg';

export const apiKey = '3cc7bbab15742142fcb29748b4141bad';

export const  Home = ({navigation}) =>  {
const[searchTerm, setSearchTerm] = useState("");
const[countryData, setCountryDetails] = useState([])

getCountryDetails = () => {
  const url = "https://restcountries.eu/rest/v2/name/" + searchTerm
  axios.get(url).then((res)=> {
    setCountryDetails(res.data)
  })
}

    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Enter country"
              onChangeText={e => {
                setSearchTerm(e);
              }}
              />
            </Item>
          <Button
            disabled={searchTerm ? false: true}
            full
            onPress={getCountryDetails}
          >
            <Text>Search</Text>
          </Button>
          </Form>

          {countryData.map(item => 
            <Card>
            <CardItem cardBody>
              <Image
             style={{
               width:500,
               height: 500
             }}
              source={{uri: 'https://restcountries.eu/data/ind.svg'}}
            />
          
            </CardItem>
            <CardItem>
              <Body>
              <Text>capital: {item.capital}</Text>
                      <Text>population: {item.population}</Text>
                      <Text>latlng: {item.latlng}</Text>
              </Body>
              <Right>
              <Button
              onPress={() => navigation.navigate("WeatherDetails", {item: item.capital})}
              >
                <Text>Capital Weather</Text>
              </Button>
              </Right>
            </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
}

export const WeatherDetails = (item) => {
  const[weatherDetails, setWeatherDetails] = useState([]);

  useEffect(() => {
    getWeatherDetails();
  })

  getWeatherDetails = () => {
  const url = 'http://api.weatherstack.com/current?access_key='+ apiKey  +'&query=' + item.route.params.item;
  axios.get(url).then((res)  =>  {
    setWeatherDetails(res.data.current)
  })
  } 

  return (
    <Container>
      <Header />
      {weatherDetails && 
      <Content>
  <Text>temperature: {weatherDetails.temperature}</Text>
  {/* <Text>weather_icons: {weatherDetails.weather_icons[0]}</Text> */}
  <Text>wind_speed: {weatherDetails.wind_speed}</Text>
  <Text>precip: {weatherDetails.precip}</Text>
      </Content>
}
      </Container>
  )
}


const Stack = createStackNavigator();

 export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: 'Search Counrty'}} />
      <Stack.Screen name="WeatherDetails" component={WeatherDetails} options={{title: 'Counrty Details'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}