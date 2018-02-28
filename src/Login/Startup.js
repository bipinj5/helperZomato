import React from "react";
import { AppRegistry, View, Image } from "react-native";
import { Container, Content, Header, Left, Right, Icon, Button, Text, Card, Thumbnail } from "native-base";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const clusterName = "butane33"

const loginUrl = "https://app." + clusterName + ".hasura-app.io/login/";
const signupUrl = "https://app." + clusterName + ".hasura-app.io/signup/";
const searchUrl = "https://app." + clusterName + ".hasura-app.io/search/";

import { Alert } from 'react-native';

const networkErrorObj = {
  status: 503
}

export async function trySignup(username, name, password) {
  console.log('Making signup query');
  let requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type":"application/json"
    }
  };

  let body = {
    "username": username,
    "name": name,
    "password": password
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log("Auth Response ---------------------");
  
  try {
    let resp = await fetch(signupUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}

export async function tryLogin(username, name, password) {
  console.log('Making login query');
  let requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type":"application/json"
    }
  };

  let body = {
    "username": username,
	"name": name,
    "password": password
  };

  requestOptions["body"] = JSON.stringify(body);

  console.log("Auth Response ---------------------");
  
  try {
    let resp = await fetch(loginUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}

export default class Startup extends React.Component {
  render() {
	return (
	  <Container>
	    <Header style={{backgroundColor: "white"}} />
	    <Content>
		  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
		    <Left>
		    <Card style={{marginLeft: 14}}>
            <Button light style={{ alignSelf: "flex-start", width: 150, paddingLeft: 20, backgroundColor: "white"}}
			  onPress={() => this.props.navigation.navigate("Signup")}>
		      <Text style={{textAlign: "center"}}>Sign up</Text>
		    </Button>
		    </Card>
		    </Left>
		    <Right>
		    <Card style={{marginRight: 14}}>
		    <Button light style={{ alignSelf: "flex-end", width: 150, paddingLeft: 20, backgroundColor: "white"}}
			  onPress={() => this.props.navigation.navigate("Login")}>
		      <Text style={{textAlign: "center"}}>Log in</Text>
		    </Button>
		    </Card>	
            </Right>	
          </View>	
          <Card style={{marginLeft: 14, marginRight: 14}}>		  
		    <Button block>
			  <MaterialCommunityIcon style={{color: "white", fontSize: 30}} name="facebook-box" />
		      <Text>Login with Facebook</Text>
		    </Button>
		  </Card>
		  <Card style={{marginLeft: 14, marginRight: 14}}>
		    <Button block primary style={{backgroundColor: "white"}}>
			  <Thumbnail small source={require('./gsign.png')} style={{height: 30, width: 30}} />
		      <Text note>Continue with Google</Text>
		    </Button>
		  </Card>
		</Content>
	  </Container>
	)
  }
}