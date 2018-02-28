import React from "react";
import { Statusbar, Alert, View, Image, StyleSheet, ActivityIndicator, ListView } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem,
 Form, Item, Input } from 'native-base';
import { trySearch } from '../Login/Startup';
import Search from './searchid.js';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";

export default class HomeScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
		data: [],
	  	searchTextBox : '',
		isLoading: true,
		contentLoaded: false
	  }
  }	
  
GetItem(restaurant_name) {
  Alert.alert(restaurant_name);
}
  
  handleSearchPressed = async () => {
    let resp = await trySearch(this.state.searchTextBox);
    if(resp.status !== 200){
      if (resp.status === 504) {
        Alert.alert("Network Error", "Check your internet connection" )
      } else {
        Alert.alert("Error", "Unauthorized, Invalid username or password")      
      }
    } else {
      this.setState({isLoggedIn:true})  
    }
  }
  
  handleSearchChange = searchTextBox => {
  	this.setState({
  		...this.state,
  		searchTextBox: searchTextBox
  	})
  }
  
  ListViewItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

componentDidMount() {
  fetch('https://app.butane33.hasura-app.io/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
	  "searchInput": this.state.searchTextBox
	  })
  })
   .then((response) => response.json())
   .then((responseJson) => {
     let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson.restaurantList),
     }, function() {
          // do something with new state
     });
    })
    .catch((error) => {
      console.error(error);
    });
}

componentWillReceiveProps(nextProps) {
	if(parseInt(nextProps.restaurantList, 4) !== parseInt(this.props.restaurantList, 4)) {
		this.setState({ isLoading: false })
		this.contentLoaded = 0
	}
}
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
	
  return (
        <Container>
		    <Form>
		      <Item>
		        <Input value={this.state.searchTextbox} onChangeText={this.handleSearchChange} placeholder="Search Here" />
			    <Button transparent onPress={this.handleSearchPressed}>
			      <Icon name="ios-search" />
			    </Button>
		      </Item>
		    </Form>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) =>
          <Card style={{flex:1, flexDirection: 'column'}}>
		    <CardItem body>
              <Image source = {{ uri: rowData.restaurant_image_url }} style={{width: 200, height: 200}} />
			</CardItem>
			<CardItem>
              <Text bold>{rowData.restaurant_id}</Text>
			</CardItem>
			<CardItem>
			  <Text note>{rowData.restaurant_name}</Text>
			</CardItem>
			  <Text note>State: {rowData.state}</Text>
          </Card>
          }
        />
	  </Container>
    );
  }
}

module.export = HomeScreen;