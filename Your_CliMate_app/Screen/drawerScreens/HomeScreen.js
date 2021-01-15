// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {Component} from 'react';

import {ActivityIndicator, Alert, View} from 'react-native';

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

import DataItem from 'Your_CliMate_app/Screen/Components/dataItem.js'

import {getArticles} from 'Your_CliMate_app/Screen/Components/news.js'

export default class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      data: null
    }
  }

  componentDidMount(){
    getArticles().then(data=>{
      this.setState({
        isLoading:false,
        data: data
      });
    }, error =>{
      Alert.alert('Error','Something went wrong!');
    })
  }

  render(){
    console.log(this.state.data);

    let view = this.state.isLoading ? (
      <View>
        <ActivityIndicator animating={this.state.isLoading}/>
        <Text style = {{marginTop:10}}>Please wait...</Text>
      </View>
    ):(
      <List
        dataArray = {this.state.data}
        renderRow = { (item) =>{
          return <DataItem data = {item} />
        }}
      />

    )

    return(
      <Container>
          <Content>
            {view}
          </Content>
        </Container>
    )  
  }  
}  
